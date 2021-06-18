---
title: "Verifying your installation"
excerpt: "Verifying."
categories: installing
slug: verifying
toc: true
---

## Verifying the ACD Operator

List the pods deployed and look for the operator pod showing it is ready with a status of running.

```
oc get pods --namespace <namespace> | grep controller
```

## Verifying the ACD Service

List the pods deployed and look for the deployment pods showing ACD and all microservices ready with a status of running.

```
oc get pods --namespace <namespace> | grep acd
```

## Calling the ACD Status API

Check the ACD status by getting the Openshift route and calling the status API.

```
kubectl get routes --namespace <namespace>

curl -k 'https://<route_host>/services/clinical_data_annotator/api/v1/status'
```

### Next Steps

* If pods are not starting, see the [Troubleshooting](https://ibm.github.io/acd-containers/troubleshooting/troubleshooting/) section in the Troubleshooting documentation.
* Once pods have started and show a status of running, continue on to [Getting Started](https://ibm.github.io/acd-containers/usage/getting-started/) with ACD.
* For more details on management or configuration of your ACD instance, see [ACD Configuration Management](https://ibm.github.io/acd-containers/management/configuring).
