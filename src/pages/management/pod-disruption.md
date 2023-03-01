---
title: "Pod Disruption Budgets"
excerpt: "Pod Disruption."
categories: management
slug: pod-disruption
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


The Pod Disruption Budget (pdb) limits the number of pods that are down simultaneously from voluntary disruptions.  Refer to these links for information on disruptions and Pod Disruption Budgets.
 - [Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)
 - [Pod Disruption Budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/)
 - [OpenShift documentation](https://docs.openshift.com/container-platform/4.9/nodes/pods/nodes-pods-configuring.html#nodes-pods-configuring-pod-distruption-about_nodes-pods-configuring)

A pdb is not required but may be desired if you are running 2 or more replicas of ACD and want to ensure a minimal availability when cluster maintenance (such as node replacement) is done. Be aware that if you have a minimum availability of 1 in a pod disruption budget and a deployment has a replica count of 1, the pod will never be moved by the scheduler and will cause voluntary maintenance such as replacing nodes to hang.    

To use a pdb with ACD, create a Pod Disruption Budget object for each ACD deployment. The examples below can be used to do this.
### Pod Disruption Budget Setup
Download the following example yaml and save it as acd-pdb.yaml locally.  Edit the spec as desired.  
```yaml acd-pdb.yaml
kind: List
apiVersion: v1
items:
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-acd-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-acd
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-aci-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-aci
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-av-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-av
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-cd-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-cd
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-cds-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-cds
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-cv-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-cv
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-hyp-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-hyp
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-mod-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-mod
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-neg-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-neg
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-ont-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-ont
- apiVersion: policy/v1
  kind: PodDisruptionBudget
  metadata:
    name: merative-acd-spl-pdb
  spec:
    minAvailable: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: merative-acd-spl
```

Create the Pod Disruption Budgets.

```
oc project <acd_namespace>
oc create -f acd-pdb.yaml
```


Check the status of the Pod Disruption Budgets.

```
oc get pdb
```

Get details of the Pod Disruption Budgets.

```
oc describe pdb
```

You can patch the Pod Disruption Budgets and change the spec using the file with an override such as this:

```
oc patch -f acd-pdb.yaml -p '{"spec":{"minAvailable":0}}'
```

If you no long want the Pod Disruption Budgets you can remove them using:

```
oc delete pdb -f acd-pdb.yaml
```
