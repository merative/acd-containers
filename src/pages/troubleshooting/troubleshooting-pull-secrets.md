---
title: "Troubleshooting Pull Secrets"
excerpt: "Troubleshooting ACD Container Edition Pull Secrets"
categories: troubleshooting
slug: troubleshooting-pull-secrets
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


## Troubleshooting pull secrets

If the ACD image registry pull secret is not configured correctly, ACD operand pods may enter a failed state with one of the following status: ImagePullBackOff, CrashLoopBackOff, ErrImagePull. These failed pods may also contain events with text like "401 Unauthorized". These events can be viewed using the the following `oc` CLI command:

```oc describe pod xxx```

or from the OpenShift web console, view the Pod details under Events.

1. [Verify](/installing/installing/#verifying-acd-registry-access) the pull secret can access and is authorized to the ACD image registry.

1. Reboot and/or replace the cluster's nodes. Updating the global pull secret should reboot all the cluster's nodes, however depending on cluster modifications this rebooting may not occur. Manually rebooting or even replacing nodes may be required to pick up the changes. Ensure the changes are rolled out to every node since other policies, such as a PodDisruptionBudget policy, may prevent a complete rollout and necessitate manual updates.

1. If attempting to use the global pull secret, ensure the distribution supports this. OpenShift extends the Kubernetes support to provide a global pull secret. [Verify](/installing/installing/#acd-registry-pull-secret) the global pull secret includes the `acdcontaineredition.azurecr.io` authorization.

1. If pull secrets are being configured at the service account level, ensure the ACD operand service account "merative-acd-operand" is [patched](/installing/installing/#acd-registry-pull-secret) to contain the pull secret. This service account is created as part of each ACD instance and namespace scoped.
