---
title: "Prerequisites"
excerpt: "Prerequisites for installing IBM ACD."
categories: installing
slug: prerequisites
toc: true
---

IBM Watson Annotator for Clinical Data (ACD) Container Edition has the following prerequisites:

- Red Hat Openshift Container Platform (OCP) 4.7 or later
  - Commencing with OpenShift Container Platform 4.8, Red Hat will denote all even numbered minor releases (eg 4.8, 4.10, 4.12) as Extended Update Support (EUS) releases. ACD will support the EUS releases. For more lifecycle policy information please see the [IBM Continuous Delivery Support Lifecycle Policy](https://www.ibm.com/support/pages/ibm-continuous-delivery-support-lifecycle-policy) (IBM CD), and the [Red Hat OpenShift Container Platform Life Cycle Policy](https://access.redhat.com/support/policy/updates/openshift).
- Share storage for ACD configuration storage - This can be:
  - A persistent volume claim against a [ReadWriteMany shared file system](https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage)
    - This is most often used with on premise cloud-based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports
    persistent volume claims of ReadWriteMany (RWX) access mode across all zones and nodes of the cluster.
  - An object bucket
    - On IBM Cloud - IBM Cloud Object Storage (COS) with a Regional bucket in the same cloud region as the cluster using Standard Storage Class
    - On AWS - S3 Bucket in the same region
- Command line tools
  - [oc](https://docs.openshift.com/container-platform) - Openshift CLI for interacting with the cluster
  - [cloud-pak-cli](https://github.com/IBM/cloud-pak-cli) - CASE CLI for interacting with CASE bundles
- Login credentials and other cluster connection details from your cluster administrator
- A [dedicated Openshift project (namespace)](https://ibm.github.io/acd-containers/installing/installing/#create-a-project-(namespace)) per ACD deployment
- A purchased [entitlement key](https://myibm.ibm.com/products-services/containerlibrary) for pulling images from the IBM Entitled Registry
- A secret for accessing a storage bucket, if [planning to use an object storage bucket](https://ibm.github.io/acd-containers/planning/storage/)

Obtain the connection details for your OpenShift Container Platform cluster from your administrator. For additional planning and installation details, see:

- [Plan for your installation](https://ibm.github.io/acd-containers/planning/namespace), such as preparing for persistent storage, considering security options, and planning for performance and capacity.
- [Install ACD](https://ibm.github.io/acd-containers/installing/installing/#overview), such as creating a namespace, creating secrets, [installing the catalog](https://ibm.github.io/acd-containers/installing/installing/#add-the-acd-operator-to-the-catalog), [installing the operator](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-operator), and [installing the ACD service](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-service).

## Resources Required

By default, an ACD installation requires the following minimum resources:

| Component               | Number of worker nodes | CPU/node | Memory/node (G)  |
| ----------------------- | ---------------------- | -------- | ---------------- |
| ACD                     | 3                      | 8 min (16 recommended )       | 64              |

For high availability run 3 replicas of the ACD service on a minimum of 3 worker nodes that have 16 CPU/node and 64 GB of memory. For a development or test environment, 1 or 2 replicas can be configured and 8 CPU/node may be used.  

By default the ACD pods may use all of the CPUs on a node. If needed, you can limit the ACD deployment CPU usage (see [Configuration](../../management/configuring)).

These are the requirements for ACD. The cluster itself has additional requirements for master, infrastructure and possible additional worker node for monitoring, logging and other components or applications being run. Please see the [OpenShift recommended host practices](https://docs.openshift.com/container-platform/4.7/scalability_and_performance/recommended-host-practices.html) for guidance on adding infrastructure nodes and moving resources to those nodes.
