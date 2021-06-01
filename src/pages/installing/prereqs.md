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
- Login credentials and other cluster connection details from your cluster administrator
- A [dedicated Openshift project (namespace)](https://ibm.github.io/acd-containers/installing/installing/#create-a-project-(namespace)) per ACD deployment
- An [entitlement key](https://myibm.ibm.com/products-services/containerlibrary) for pulling images from the entitled registry; used to [create the global pull secret](https://ibm.github.io/acd-containers/installing/installing/#global-pull-secret-installation).
- A secret for accessing a storage bucket, if [planning to use an object storage bucket](https://ibm.github.io/acd-containers/planning/storage/)

Obtain the connection details for your OpenShift Container Platform cluster from your administrator. For additional planning and installation details, see:

- [Plan for your installation](https://ibm.github.io/acd-containers/installing/planning/), such as preparing for persistent storage, considering security options, and planning for performance and capacity.
- [Install ACD](https://ibm.github.io/acd-containers/installing/installing/#overview), such as creating a namespace, creating secrets, [installing the catalog](https://ibm.github.io/acd-containers/installing/installing/#add-the-acd-operator-to-the-catalog), [installing the operator](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-operator), and [installing the ACD service](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-service).

## Resources Required

By default, an ACD installation requires the following minimum resources:

| Component               | Number of worker nodes | CPU/node | Memory/node (G)  |
| ----------------------- | ---------------------- | -------- | ---------------- |
| ACD                     | 3                      | 8 min (16 recommended )       | 64              |

For high availability run 3 replicas of the ACD service on a minimum of 3 worker nodes that have 16 vCPU/node and 64 GB of memory. For a development or test environment, 1 or 2 replicas can be configured and 8 vCPU/pod may be used.  

By default the ACD pods may use all of the CPUs on a node. If needed you can limit the ACD deployment CPU usage (see [Configuration](../../management/configuring).

These are the requirements for ACD. The cluster itself has additional requirements for master, infrastructure and possible additional worker node for monitoring, logging and other components or applications being run. Please see the [OpenShift recommended host practices](https://docs.openshift.com/container-platform/4.7/scalability_and_performance/recommended-host-practices.html) for guidance on adding infrastructure nodes and moving resources to those nodes.

## Storage

If the deployment will use persistent file based storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created.

### Persistent Volume and Claim Installation

Create the persistent volume claim.

```
 oc create -f file-store-pvc.yaml
```

The following is an example of a PVC that has been tested with this chart.

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ibm-wh-acd-acd-file-store-pvc
  namespace: ibm-wh-acd-demo
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  storageClassName: ocs-storagecluster-cephfs
  volumeMode: Filesystem
  volumeName: ibm-wh-acd-acd-file-store-pv
```

Create the persistent volume.

A minimum size of 1 gigabyte is recommended. Access mode must be set to ReadWriteMany. Note that the persistent volume has a `claimRef` field which
refers back to the persistent volume claim so ensure its references for name, namespace, and uid are correct.

```
 oc create -f file-store-pv.yaml
```

The following is an example of a PV that has been tested with this chart.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ibm-wh-acd-acd-file-store-pv
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  claimRef:
    apiVersion: v1
    kind: PersistentVolumeClaim
    name: ibm-wh-acd-acd-file-store-pvc
    namespace: ibm-wh-acd-demo
    uid: 4353a4d2-306f-4fcd-a0cf-ea43e052ad7d
  csi:
    driver: openshift-storage.cephfs.csi.ceph.com
    fsType: ext4
    nodeStageSecretRef:
      name: rook-csi-cephfs-node
      namespace: openshift-storage
    volumeAttributes:
      clusterID: openshift-storage
      fsName: ocs-storagecluster-cephfilesystem
      storage.kubernetes.io/csiProvisionerIdentity: 1580324955446-8081-openshift-storage.cephfs.csi.ceph.com
    volumeHandle: 0001-0011-openshift-storage-0000000000000001-52314a98-5e3c-11ea-af7e-0a580a83008f
  persistentVolumeReclaimPolicy: Retain
  storageClassName: ocs-storagecluster-cephfs
  volumeMode: Filesystem
```

### Persistent Volume and Claim Removal

To remove the persistent volume and claim run the following:

```
oc delete pvc ibm-wh-acd-acd-file-store-pvc -n ibm-wh-acd-demo
oc delete pv ibm-wh-acd-acd-file-store-pv -n ibm-wh-acd-demo
```
