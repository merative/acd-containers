---
title: "Troubleshooting ACD instances"
excerpt: "Troubleshooting IBM ACD Container Edition instances"
categories: troubleshooting
slug: troubleshooting-acd-instances
toc: true
---

## Troubleshooting ACD instances

### ACD Operator Not Starting

To diagnose problems with resources not started as expected follow these steps:

1. Check the logs on the ACD operator pod for errors. For example `ibm-wh-acd-operator-controller-manager-5c58b6b869-q8nwj`

   ```
   oc logs <pod> --namespace <namespace> | grep controller
   ```

   See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.

### ACD Operator or ACD Instance Not Starting

To diagnose problems with resources not started as expected follow these steps:

1. Check for errors or events on the deployments.

   List deployments

   ```
   oc get deployments --namespace <namespace>
   ```

   - `<namespace>` namespace where the operator or instance was installed

   Describe a specific deployment

    ```
   oc describe deployments <deployment> --namespace <namespace>
   ```

   - `<deployment>` ACD deployment name, for example `ibm-wh-acd-acd`
   - `<namespace>` namespace where the operator or instance was installed

1. Check for errors or events on the replicasets.

   List replica sets

   ```
   oc get replicasets --namespace <namespace>
   ```

   - `<namespace>` namespace where the operator or instance was installed

   Describe a specific replicaset

    ```
   oc describe replicasets <replicaset> --namespace <namespace>
   ```

   - `<replicaset>` ACD replica set name, for example `ibm-wh-acd-acd-749c996465`
   - `<namespace>` namespace where the operator or instance was installed

1. Check for errors or events on the pods.

   List pods

   ```
   oc get pods --namespace <namespace>
   ```

   Describe a specific pod

    ```
   oc describe pods <pod> --namespace <namespace>
   ```

   - `<pod>` ACD pod name, for example `ibm-wh-acd-acd-749c996465-bt6zc`
   - `<namespace>` namespace where the operator or instance was installed

1. Check the logs for errors

   ```
   oc logs <pod> --namespace <namespace>
   ```

   - `<pod>` ACD pod name, for example `ibm-wh-acd-acd-749c996465-bt6zc`
   - `<namespace>` namespace where the operator or instance was installed

   See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.
