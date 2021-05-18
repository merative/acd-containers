---
title: "Prerequisites"
excerpt: "Prerequisites for installing IBM ACD."
categories: installing
slug: prerequisites
toc: true
---

- Red Hat Openshift Container Platform 4.7 or later
- Share storage for ACD configuration storage - This can be:
  - A persistent volume claim against a [ReadWriteMany shared file system](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage)
    - This is most often used with on prem clouds based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports
    persisent volume claims of Read Write Many access mode across all zones and nodes of the cluster.
- An object bucket
  - On IBM Cloud - IBM Cloud Object Storage (COS) with a Regional bucket in the same cloud region as the cluster using Standard Storage Class
  - On AWS - S3 Bucket in the same region
- Command line tools
  - [oc](https://docs.openshift.com/container-platform) - Openshift CLI for interacting with the cluster
  - [cloud-pak-cli](https://github.com/IBM/cloud-pak-cli) - CASE CLI for interacting with CASE bundles
- Dedicated namespace

## Resources Required

By default, an ACD installation requires the following minimum resources:

| Component               | Number of worker nodes | CPU/node | Memory/node (G)  |
| ----------------------- | ---------------------- | -------- | ---------------- |
| ACD                     | 3                      | 8 min (16 recommended )       | 64              |

For high availability run 3 replicas of the ACD service on a minimum of 3 worker nodes that have 16 vCPU/node and 64 GB of memory. For a development or test environment, 1 or 2 replicas can be configured and 8 vCPU/pod can be used.  

By default the ACD pods may use all of the CPUs on a node. If needed you can limit the ACD deployment CPU usage (see [Configuration](../../management/configuration)), but this may result in lower availability of the ACD service.

These are the requirements for ACD. The cluster itself has additional worker node requirements for monitoring,
logging and other components so we recommend adding at least one more worker node for that if this is a new cluster.
