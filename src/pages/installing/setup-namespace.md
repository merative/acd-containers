---
title: "Set Up Namespace"
excerpt: "Setting up Namespace Artifacts."
categories: installing
slug: setup
toc: true
---

Each deployment of the ACD operator and its dependent resources need to be scoped to a project for proper isolation.

## Create a project (namespace)

Create a namespace into which the ACD instance will be installed by creating a [project](https://docs.openshift.com/container-platform/4.7/applications/projects/working-with-projects.html).

When you create a project, a namespace with the same name is also created.

Ensure you use a namespace that is dedicated to a single instance of ACD.

**Important**: Do not use any of the default or system namespaces to install an instance of ACD (some examples of these are: default, kube-system, kube-public, and openshift-operators).

## Setting up ACD service optional dependencies

### Setting up S3-based configuration storage

If the deployment will use S3-based storage, the S3 credentials need to be inserted into the ACD operand namespace as secrets.

```
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
oc create secret generic merative-acd-as \
    --namespace <namespace> \
    --from-file=username \
    --from-file=password
```

### Setting up file-based storage configuration persistent volume and claim setup

If the deployment will use persistent file-based storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created.

If you are deploying more than one instance of ACD, each deployment is required to have its own PV and PVC within its own project.  

We have tested two methods for providing a shared filesystem for storing ACD persistent data.

- [OpenShift Container Storage (OCS)](#create-ocs)
- [NFS](#create-nfs)

Create the shared file system using the platform's tools with encryption enabled. It is recommended to have a minimum of 10 gigabyte of free space within the file system for configuration storage. Access mode must be set to ReadWriteMany (RWX).

<a name="create-ocs"></a>

#### Creating an OCS (cephfs) shared filesystem

1. Install OCS from the operator catalog.  This will install the cephfs storage class.  You must provide a block storage class for OCS to use.

1. In the ACD namespace, manually create the ACD persistent volume claim from the example "merative-acd-config-storage-cephfs-pvc.yaml" file below.  The persistent volume will get dynamically created from the `ocs-storagecluster-cephfs` storage class.

    ```
    oc create -n <your namespace> -f merative-acd-config-storage-cephfs-pvc.yaml
    ```

    <br/>Example:  PVC file "merative-acd-config-storage-cephfs-pv.yaml"

    ```yaml merative-acd-config-storage-cephfs-pvc.yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: merative-acd-config-storage-cephfs-pvc
      spec:
        accessModes:
        - ReadWriteMany
        resources:
          requests:
            storage: 10Gi
        storageClassName: ocs-storagecluster-cephfs
        volumeMode: Filesystem
      ```

1. Determine the name of the generated persistent volume that is bound to your PVC.  The PV name starts with 'pvc-'

      ```
      oc get pvc -n <acd namespace>
      ```

1. Patch the generated persistent volume to change the `persistentVolumeReclaimPolicy` to `Retain` so the volume does not get deleted if the PVC is deleted.

      ```
      oc patch pv <dynamic-pv-name> -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
      ```

1. Continue to the [Shared file system preparation](#shared-prep) step below.

#### OCS persistent volume and claim removal

WARNING: Removing an OCS persistent volume will delete any data stored in that PV.

To remove the persistent volume and claim, run the following commands:

```
oc delete pvc merative-acd-config-storage-cephfs-pvc.yaml -n <your namespace>
oc delete pv <dynamic-pv-name>
```

<a name="create-nfs"></a>

#### Creating an NFS shared filesystem

1. Create the persistent volume for NFS

    ```
    oc create -f merative-acd-config-storage-nfs-pv.yaml
    ```

    Note: The path to the NFS volume must be unique for each ACD instance.

    <br/>Example:  NFS PV file "merative-acd-config-storage-nfs-pv.yaml"

    ```yaml merative-acd-config-storage-nfs-pv.yaml
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: merative-acd-config-storage-nfs-pv
    spec:
      capacity:
        storage: 10Gi
      nfs:
         server: your-nfs-server
         path: /your/nfs/path
      accessModes:
        - ReadWriteMany
      persistentVolumeReclaimPolicy: Retain
      volumeMode: Filesystem
    ```

1. Create the persistent volume claim for NFS

    ```
    oc create -f merative-acd-config-storage-nfs-pvc.yaml -n <your namespace>
    ```

    <br/>Example:  NFS PVC file "merative-acd-config-storage-nfs-pvc.yaml"

    ```yaml merative-acd-config-storage-nfs-pvc.yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: merative-acd-config-storage-nfs-pvc
    spec:
      accessModes:
        - ReadWriteMany
      resources:
        requests:
          storage: 10Gi
      volumeMode: Filesystem
      volumeName: merative-acd-config-storage-nfs-pv
    ```

#### NFS persistent volume and claim removal

To remove the persistent volume and claim, run the following:

```
oc delete pvc merative-acd-config-storage-nfs-pvc -n <your namespace>
oc delete pv merative-acd-config-storage-nfs-pv
```

<a name="shared-prep"></a>

### Shared file system preparation

Once the shared file system is created, the top-level directory should be empty and its GID set to 0 (root) with group `rwx` permissions.  This is required to allow the ACD services write access when running with a restricted SCC.  If the shared file system requires a GID other than zero, you must also set the `Supplemental Group ID` parameter in the `File Storage -> PVC` section during the ACD instance creation.  

Example commands to set the shared file system directory permissions:

```
chgrp 0 <top level mount directory>
chmod g+w <top level mount directory>
```

If you don't have direct access to the top-level directory of the file share, one technique to set the directory permissions is to start a temporary pod that runs as root with the PVC mounted.  Exec into the pod to run the `chgrp` and `chmod` commands on the mounted share directory.

When creating the ACD instance, the `Existing PVC Name` parameter should match the name specified in the PVC that was created in these steps.  The `PVC Storage Size` must also be set to match the size of the shared file system.
