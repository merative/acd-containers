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
set -xe
WORKDIR=$(pwd)

chart_shortname=$(echo "${CHART_NAME}" | sed -e "s/^whcs-//")
slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 0 "${CHART_NAME} is starting"

override_yaml=${WORKDIR}/chart/${CHART_NAME}/overrides/${CLUSTER_NAME}/override.yaml
if [ ! -e ${override_yaml} ]; then
  echo "Environment override.yaml not found, required"
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 1 "${CHART_NAME} failed. Environment override.yaml not found, required."
  exit 1
fi
cat ${override_yaml} > ${WORKDIR}/chart/${CHART_NAME}/override.yaml

deployment_name=ibm-wh-acd-${CHART_NAME}
if ! kubectl get deployment -n ${CLUSTER_NAMESPACE} | grep "${deployment_name}" ; then
  echo "${deployment_name} not yet deployed, skip active check"
  state="passive"
else
  state=$(kubectl get deployment -n ${CLUSTER_NAMESPACE} ${deployment_name} -o=jsonpath='{.metadata.labels.state}')
fi
if [[ "${state}" == "active" ]]; then
  echo "Attempting to update the active deployment, aborting!"
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 1 "${CHART_NAME} failed. Attempting to update the active deployment, aborting!"
  exit 1
fi
