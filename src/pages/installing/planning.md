---
title: "Planning"
excerpt: "Planning for installation."
categories: installing
slug: planning
toc: true
---

### Limitations

* The Operator may be deployed into different namespaces, one per namespace.

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
