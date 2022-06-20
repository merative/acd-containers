#!/bin/bash
# Licensed Materials - Property of IBM
#
# Copyright IBM Corp. 2012, 2019 All Rights Reserved.
#
# US Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.

#########################################################################
#Global vars
#########################################################################
SCRIPT_NAME="$(basename "$0")"
echo "####################"
echo "Executing $SCRIPT_NAME"
BASE_SCRIPT_DIR="../../whcs-devops"

#########################################################################
#Common functions
#########################################################################
. ${BASE_SCRIPT_DIR}/kubernetes/kubernetes_common_functions.sh

#########################################################################
#Mainline
#########################################################################
# Install missing base image packages
yum install -y procps

testname="$1"
bucket_name="$2"
echo "Start ${testname} for chart ${CHART_NAME}"

deployment_name=ibm-wh-acd-${CHART_NAME}

shopt -u nocasematch

pod_name=$(kubectl get pod -n ${CLUSTER_NAMESPACE} | grep "${deployment_name}" | grep -v "Terminating" | head -n 1 | sed 's/ .*//')
echo "pod_name=${pod_name}"
kubectl cp ${CLUSTER_NAMESPACE}/${pod_name}:/tmp/dvt_results.tar.gz dvt_results.tar.gz
if [ ! -e "dvt_results.tar.gz" ]; then
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 1 "${CHART_NAME} failed. ${testname} for ${deployment_name} failed to retrieve tests"
  exit 1
fi
tar -xzf dvt_results.tar.gz
if grep -q 'failures="0"' Report/junit/TEST-com.ibm.watson.common.service.base.vt.DVTTests.xml  && grep 'errors="0"' Report/junit/TEST-com.ibm.watson.common.service.base.vt.DVTTests.xml ; then
  rc=0
else
  rc=1
fi

echo "Start constructing xunit format output"
testFound=false
echo -e '<?xml version="1.0" encoding="UTF-8" ?>\n<testsuites>' > ${testname}.xml;
for j in `ls Report/junit/TEST-*.xml`; do
  testFound=true
  cat $j | grep -v '<?xml version' >> ${testname}.xml;
  echo >> ${testname}.xml;
done;
echo '</testsuites>' >> ${testname}.xml;
echo "End constructing xunit format output"

if [[ "$testFound" == "false" ]]; then
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 1 "${CHART_NAME} failed. ${testname} for ${deployment_name} failed to run any tests"
  exit 1
fi

if [[ $rc -gt 0 ]]; then
  echo "Non-zero retun from junit, outputting console log for debug"
  cat dvt.log
  echo "$CHART_NAME" >> /tmp/failed_dvt_list
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 1 "${CHART_NAME} failed. ${testname} for ${deployment_name} had test failures"
fi

pkill kubectl
echo "Exit ${testname} for chart ${CHART_NAME}"
exit $rc
