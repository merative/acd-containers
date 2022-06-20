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
WORKDIR=$(pwd)

# Scale up passive replicas
deployment_name=ibm-wh-acd-${CHART_NAME}
num_replicas=$(grep "replicas:" chart/${CHART_NAME}/values.yaml); num_replicas=${num_replicas//*replicas: /};
kubectl scale deployment --namespace=${CLUSTER_NAMESPACE} ${deployment_name}-deployment --replicas=${num_replicas}
sleep 10s
until [[ -z $(kubectl get deployment --namespace=${CLUSTER_NAMESPACE} ${deployment_name}-deployment -o=jsonpath='{.status.unavailableReplicas}') ]];
do
  echo "waiting for deployment to scale up replicas"
  sleep 60s
done
