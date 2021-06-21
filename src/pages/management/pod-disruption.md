---
title: "Pod Disruption Budgets"
excerpt: "Pod Disruption."
categories: management
slug: pod-disruption
toc: true
---

The pod disruption budget limits the number of pods that are down simultaneously from voluntary disruptions.

### Pod Disruption Budget Setup

Create the disruption budget.

```
oc create -f ibm-wh-acd-pod-disruption-budget.yaml
```

The following is an example configuration specifying that a minimum of 2 pods should be running.

```yaml ibm-wh-acd-pod-disruption-budget.yaml
apiVersion: policy/v1beta1
kind: PodDisruptionBudget
metadata:
  name: ibm-wh-acd-acd-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: ibm-wh-acd-acd-acd-deployment
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
oc delete pdb ibm-wh-acd-acd-pdb
```
