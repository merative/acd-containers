---
title: "MustGather data for ACD"
excerpt: "."
categories: troubleshooting
slug: mustgather
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


_Note:  The IBM Cloud Pak MustGather tool applies to IBM Watson Annotator for Clinical Data Container Edition.  For Merative Annotator for Clinical Data support, please [Contact Us](/support/support/)._

To help IBM Support troubleshoot any issues with your IBM ACD instance, use the `oc adm must-gather` command with the Cloud Pak Must-Gather image to capture the must gather logs.

To gather diagnostic logs, run the following commands as Cluster Administrator:

  1. Log in to your Red Hat OpenShift Container Platform as a cluster administrator by using the oc CLI.
  2. Run the following command to capture the logs:
    `oc adm must-gather --image=quay.io/opencloudio/must-gather -- gather -m cloudpak -n <namespace>`

To gather additional system level diagnostics in addition to the ACD information:

  1. Log in to your Red Hat OpenShift Container Platform as a cluster administrator by using the oc CLI.
  2. Run the following command to capture the logs:
    `oc adm must-gather --image=quay.io/opencloudio/must-gather -- gather -m overview,system,failure,cloudpak -n <namespace>`

These logs are stored in an archive file in a folder in the current working directory. For example, the must-gather archive could be located on the path:
  `must-gather.local.7975582093882663823/quay-io-opencloudio-must-gather-sha256-0e2973d08c3a83e076783c40d812d31179552f50b4d756e35145526460f88d07/cloudpak-must-gather-20210511164926.tar.gz`

Additional detailed instructions on the usage of the Cloud Pak Must-Gather, including instructions for usage in a disconnected (AirGap) environment can be found [here](https://www.ibm.com/support/pages/node/6398264).
