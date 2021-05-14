---
title: "Planning"
excerpt: "Planning for installation."
categories: installing
slug: planning
toc: true
---
### Namespaces

IBM® Watson Annotator for Clinical Data Container Edition handles installation and management of the ACD service using an ACD operator. Both the operator and service resources are installed by default into a dedicated namespace.

`ibm-wh-acd-operator-system` is the default namespace used. The ACD operator may be deployed into a different namespace, one per namespace. The ACD service may be deployed into the same namespace as its operator or cluster wide (all namespaces).

All resources created for an ACD installation are namespace-scoped except for the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are non-namespaced and are available to all namespaces.

### Storage

### Performance and Capacity

### Security

#### Tenancy

#### Security Context Constraints

An ACD installation deploys containers within pods. A security context constraint (SCCs) is used to control permissions for the pods. These permissions include actions that a pod can perform and what resources it can access.

The predefined SecurityContextConstraints resource named `restricted` is used as the default SCC applied to the ACD pods. If a different security policy is desired, a custom SCC may be created and applied.

Here is an example of a custom SecurityContextConstraints definition:

```
apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
metadata:
  annotations:
    kubernetes.io/description: An example of a 'restricted' SCC which denies access to all host features and requires pods to be run with a UID, and SELinux context that are allocated to the namespace. This is the most restrictive SCC.
    release.openshift.io/create-only: "true"
  name: ibm-wh-acd-restricted-scc
allowHostDirVolumePlugin: false
allowHostIPC: false
allowHostNetwork: false
allowHostPID: false
allowHostPorts: false
allowPrivilegeEscalation: false
allowPrivilegedContainer: false
allowedCapabilities: null
defaultAddCapabilities: null
fsGroup:
  type: MustRunAs
groups: []
priority: null
readOnlyRootFilesystem: false
requiredDropCapabilities:
- KILL
- MKNOD
- SETUID
- SETGID
runAsUser:
  type: MustRunAsRange
seLinuxContext:
  type: MustRunAs
supplementalGroups:
  type: RunAsAny
users: []
volumes:
- configMap
- downwardAPI
- emptyDir
- persistentVolumeClaim
- projected
- secret
```

Refer to the Security section for additional details on security.

### Pod Disruption Budgets

The pod disruption budget limits the number of pods that are down simultaneously from voluntary disruptions.

#### Pod Disruption Budget Setup

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
