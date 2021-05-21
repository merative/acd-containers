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
- Secrets

## Resources Required

By default, an ACD installation requires the following minimum resources:

| Component               | Number of worker nodes | CPU/node | Memory/node (G)  |
| ----------------------- | ---------------------- | -------- | ---------------- |
| ACD                     | 3                      | 8 min (16 recommended )       | 64              |

For high availability run 3 replicas of the ACD service on a minimum of 3 worker nodes that have 16 vCPU/node and 64 GB of memory. For a development or test environment, 1 or 2 replicas can be configured and 8 vCPU/pod can be used.  

By default the ACD pods may use all of the CPUs on a node. If needed you can limit the ACD deployment CPU usage (see [Configuration](../../management/configuring), but this may result in lower availability of the ACD service.

These are the requirements for ACD. The cluster itself has additional worker node requirements for monitoring,
logging and other components so we recommend adding at least one more worker node for that if this is a new cluster.


## Storage (Optional)

If the deployment will use persistent file based storage instead of IBM Cloud Object (COS) storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created.

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

## Dedicated Namespace

See [create a project (namespace)](https://ibm.github.io/acd-containers/installing/installing/#create-a-project-(namespace)) in the Installation section.

## Secrets

ACD and its operator require the following secrets.

1. A pull secret to pull images from the staging entitled registry account. Note: Request access to the staging entitled registry and get an API key to be used in secret creation steps.
2. (Optional) S3 credentials if S3 is being used as the configuration storage.

### Secret Installation

Create the secret containing the container registry image pull secret.

For more details on creating a pull secret, see IBM Cloud documentation for [using an image pull secret to access images in other IBM Cloud accounts or external private registries from a non-default Kubernetes namespace](https://cloud.ibm.com/docs/containers?topic=containers-registry#other ).

```
kubectl create secret docker-registry cp.stg.icr.io \
    --docker-server=cp.stg.icr.io \
    --docker-username=iamapikey \
    --docker-password=<apikey> \
    --docker-email=<email_address> \
    --namespace=<namespace>
```

(Optional) If the deployment is using S3 as the configuration storage, the credentials need to be inserted as secrets.

```
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
kubectl create secret generic ibm-wh-acd-as \
                              --namespace <namespace> \
                              --from-file=username \
                              --from-file=password
```
