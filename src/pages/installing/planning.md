---
title: "Planning"
excerpt: "Planning for installation."
categories: installing
slug: planning
toc: true
---
### Namespace

IBM® Watson Annotator for Clinical Data Container Edition handles installation and management of the ACD service using an ACD operator. Both the operator and service resources are installed into a dedicated namespace. `ibm-wh-acd-operator-system` is the default namespace used. If a different namespace is desired, it must be created and provided as input to the install process.

All resources created for an ACD installation are namespace-scoped with the except the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are non-namespaced and are available to all namespaces.

### Limitations

* The ACD operator may be deployed into different namespaces, one per namespace. The ACD service may be deployed into the same namespace as its operator or cluster wide (all namespaces).

### Pod Disruption Budget Prerequisites

The pod disruption budget limits the number of pods that are down simultaneously from voluntary disruptions.

### Pod Disruption Budget Setup

Create the disruption budget.

```
oc create -f pod-disruption-budget.yaml
```

The following is an example configuration specifying that a minimum of 2 pods should be running.

```
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: acd-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: whcs-acd-acd-deployment
```

Check the status of the Pod Disruption Budgets.

```
oc get pdb
```

Get details of the Pod Disruption Budgets.

```
oc describe pdb
```

Delete the Pod Disruption Budget (using the name from the example configuration above).

```
oc delete pdb acd-pdb
```
