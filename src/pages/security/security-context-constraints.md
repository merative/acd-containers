---
title: "SecurityContextConstraints Requirements"
excerpt: ""
categories: security
slug: security-context-constraints
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->



## SecurityContextConstraints requirements

Security Context Constraints (or SCCs) set limits on what containers in a pod can do on the cluster.  See [Managing security context constraints](https://docs.openshift.com/container-platform/4.7/authentication/managing-security-context-constraints.html) for more details.

By default, the Annotator for Clinical Data ACD operator uses the `restricted` SecurityContextConstraints resource for its pod security.
If desired, a custom SecurityContextConstraints resource can be created and applied instead. Here is an example:

```yaml
apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
metadata:
  name: ibm-wh-server-operator-scc
  annotations:
    kubernetes.io/description: ibm-wh-server-operator-scc denies access to all
      host features and requires pods to be run with a UID, and SELinux context
      that are allocated to the namespace, enforces readOnlyRootFilesystem, and
      drops all capabilities.
allowHostDirVolumePlugin: false
allowHostIPC: false
allowHostNetwork: false
allowHostPID: false
allowHostPorts: false
allowPrivilegeEscalation: false
allowPrivilegedContainer: false
allowedCapabilities: []
defaultAddCapabilities: []
groups: []
fsGroup:
  type: MustRunAs
priority: null
readOnlyRootFilesystem: true
requiredDropCapabilities:
  - ALL
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

To cause the ACD operator to use the custom SecurityContextConstraints resource:

1. Find the `acd-sa` ServiceAccount resource in the same namespace as the operator.

2. Add the following to the rules in the ClusterRole resource that the ServiceAccount resource is bound to, and apply.

```yaml
- apiGroups:
    - security.openshift.io
  resourceNames:
    - ibm-wh-server-operator-scc
  resources:
    - securitycontextconstraints
  verbs:
    - use
```

* The ACD operator also creates custom ClusterRole, ClusterRoleBinding, Role, RoleBinding, SecurityContextConstraints, and ServiceAccount resources to ensure separation of duties.
