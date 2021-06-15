---
title: "Diagnosing Problems"
excerpt: "Diagnosing problems in an IBM ACD Container Edition installation"
categories: troubleshooting
slug: diagnosing-problems
toc: true
---

## Diagnosing Problems with the ACD Installation

### Problems with secrets

Before installing the operator, create a secret with your entitlement key for the IBM Container software library. This will enable container images to be pulled from the registry. See [adding a pull secret](https://ibm.github.io/acd-containers/installing/installing/#adding-a-pull-secret-for-ibm-entitled-registry) section of the Installation documentation for more information.

If you do not prepare the required secret, all pods will fail to start with ImagePullBackOff errors. In this case, configure the required secret and allow the pod to restart.

### Resources not starting

To diagnose problems with resources not started as expected follow these steps:

1. Ensure you are working in the correct target project/namespace.
   * `oc project <namespace>` - namespace where the operator or ACD was installed
1. Check for errors or events on the deployments.
   * `oc get deployments -n <namespace>` - list deployments
   * `oc describe deployments <deployment> -n <namespace>` - describe a specific deployment, such as `ibm-wh-acd-acd`
1. Check for errors or events on the replicasets.
   * `oc get replicasets -n <namespace>` - list replicasets
   * `oc describe replicasets <replicaset> -n <namespace>` - describe a specific replicasets, such as `ibm-wh-acd-acd-749c996465`
1. Check for errors or events on the pods.
   * `oc get pods -n <namespace>` - list pods
   * `oc describe pods <pod> -n <namespace>` - describe a specific pods, such as `ibm-wh-acd-acd-749c996465-bt6zc`
1. Check the logs on the ACD operator pod for errors.
   * `oc logs <pod> -n <namespace> | grep controller` - get log for the operator pod, such as `ibm-wh-acd-operator-controller-manager-5c58b6b869-q8nwj`
   * See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.
1. Check the logs on the ACD service pod for errors.
   * `oc logs <pod> -n <namespace> | grep acd` - get log for a specific ACD pod, such as `ibm-wh-acd-acd-749c996465-bt6zc`
   * See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.
