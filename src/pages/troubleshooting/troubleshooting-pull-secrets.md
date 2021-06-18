---
title: "Troubleshooting Pull Secrets"
excerpt: "Troubleshooting IBM ACD Container Edition Pull Secrets"
categories: troubleshooting
slug: troubleshooting-pull-secrets
toc: true
---

## Troubleshooting Pull Secrets

If the IBM Entitled Registry pull secret is not configured correctly, ACD operand pods may enter a failed state with one of the following status: ImagePullBackOff, CrashLoopBackOff, ErrImagePull. These failed pods may also contain events with text like "401 Unauthorized". These events are shown using CLI's describe pod ```oc describe pod xxx``` or using the Web Console's Pod details under Events.

1. [Verify](/installing/installing/#verifying-ibm-entitled-registry-access) the pull secret can access and is authorized to the entitled registry.

1. Reboot and/or replace the cluster's nodes. Updating the global pull secret should reboot all the cluster's nodes, however depending on cluster modifications this rebooting may not occur. Manually rebooting or even replacing nodes may be required to pickup the changes.

1. If attempting to use the global pull secret, ensure the distribution supports this. Openshift extends the Kubernetes support to provide a global pull secret.

1. If pull secrets are being configured at the service account level, ensure the ACD operand service account "ibm-wh-acd-operand" is [patched](/installing/installing/#ibm-entitled-registry-pull-secret) to contain the pull secret. This service account is created as part of each ACD instance and namespace scoped.
