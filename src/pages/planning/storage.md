---
title: "Storage Considerations"
excerpt: "Stroage Considerations."
categories: planning
slug: storage
toc: true
---

## Storage Options

IBM® Watson Annotator for Clinical Data Container Edition requires a storage medium if a cartridge is going to be deployed to the environment.  The storage medium persists the specfic verion of each analytic artifact contained in the cartridge and associated metadata.

Two storage mediums are supported:

- NFS based persisted volumes and claims
- Object Stoage

All configured storage needs to have encrytion enabled.

## Persistant Volume and Claim Installation

File based storage is most often used with on prem clouds based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports persistent volume claims of Read Write Many access mode across all zones and nodes of the cluster. The persistent volume claim must be against a [ReadWriteMany shared file system](https://docs.openshift.com/container-platform/4.7/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage)

To setup encryption, a custom storage class must be created using the platform's encryption. This storage class then needs to be specified on the persistent volume claim. For more information on storage class encryption refer to the platform's storage class options.

It is recommended to define an empty directory volume which will honor and use the fsGroup gid from the chart installation.  If you must use an existing volume, ensure the gid of the top level directory is configured in the fsGroup setting of the custom security context.

It is recommended to have a minimum of 1 gigabyte or free space within the file system for artifact storage.

The configuration for a persistant volume is defined in the file-store-pv.yaml file.

The following is an example of a PV that has been tested with this chart.

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ibm-wh-acd-file-store-pv
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  claimRef:
    apiVersion: v1
    kind: PersistentVolumeClaim
    name: ibm-wh-acd-file-store-pvc
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

### Persistant Volume and Claim Creation

```
 oc create -f file-store-pv.yaml
```

### Persistant Volume and Claim Removal

```
oc delete pvc ibm-wh-acd-file-store-pvc -n <namespace>
oc delete pv ibm-wh-acd-file-store-pv -n <namespace>
```

## Object Storage Configuration

See the [configuration](../../management/configuring) section for enabling object storage.

### IBM Cloud Object Storage (COS)

IBM COS encrypts all objects by default. For more information on encryption management including bring your own encryption key, refer to the [Cloud Object Storage documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-encryption)

### Amazon S3 Storage

For information on configuring Amazon's S3 server-side encryption, refer to the [Amazon S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html).
