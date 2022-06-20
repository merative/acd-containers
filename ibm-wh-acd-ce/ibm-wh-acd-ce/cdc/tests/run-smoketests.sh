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

./tests/run-test.sh "smoketests" "DVT"
rc=$?

if [[ $rc -gt 0 ]]; then
  echo "$CHART_NAME" >> /tmp/failed_dvt_list
fi

if [ "${POLICY_NAME}" != "CD" ] && [ $rc == 0 ]; then
  slack_notify "${CHART_NAME}" "${CLUSTER_NAME}" "https://cloud.ibm.com/devops/toolchains?env_id=${IBM_CLOUD_REGION}" 0 "${CHART_NAME} passed"
fi

exit $rc
