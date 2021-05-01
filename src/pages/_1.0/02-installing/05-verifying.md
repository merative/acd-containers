---
title: "Verifying your installation"
excerpt: "Verifying."
categories: installing
slug: verifying
toc: true
---

## Verifying the Operator

List the pods deployed and look for the operator pod showing it is ready with a status of running.

```
oc get pods --namespace <namespace> | grep controller
```

## Verifying the ACD Service

List the pods deployed and look for the deployment pods showing ACD and all microservices ready with a status of running.

```
oc get pods --namespace <namespace> | grep acd
```

Check the ACD status by getting the Openshift route and calling the status API.

```
kubectl get routes --namespace <namespace>

curl -k 'https://<route_host>/services/clinical_data_annotator/api/v1/status'
```