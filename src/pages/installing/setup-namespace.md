---
title: "Setup Namespace"
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

## Setting up ACD Service optional dependencies

### Setting up S3-based Configuration Storage

If the deployment will use S3-based storage, the S3 credentials need to be inserted into the ACD operand namespace as secrets.

```
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
oc create secret generic ibm-wh-acd-as \
    --namespace <namespace> \
    --from-file=username \
    --from-file=password
```

If the deployment will use persistent file-based storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created.

### Setting up File-based Configuration Storage's Persistent Volume and Claim Setup

#### Shared filesystem creation

Create the shared file system using the platform's tools with encryption enabled.

It is recommended to have a minimum of 10 gigabyte of free space within the file system for configuration storage. Access mode must be set to ReadWriteMany (RWX).

Once the shared file system is created, the top-level directory should be empty and its GID set to 0 (root) with group rwx permissions.  This is required to allow the services write access when running with a restricted SCC. If the shared file system requires a GID other than zero, you must set the configurationStorage.file.supplementalGroups array property **TODO: how to describe values settings?** to the desired GID in the values file (example: [5555])  If you don't have direct access to the top-level directory of the file share, one technique to set the directory permissions is to start a temporary pod that runs as root with the PVC mounted.  Exec into the pod to run the chgrp and chmod commands on the mounted share directory.

If you are deploying more than one instance of ACD, each deployment is required to have its own PV and PVC within a project.  The path to the file system in the persistent volume must be unique for each project.
You can add a number to the end of the PV and PVC's name and corresponding file name to keep them unique. For example:

- ibm-wh-acd-config-storage-nfs-pv1, ibm-wh-acd-config-storage-nfs-pvc1
- ibm-wh-acd-config-storage-nfs-pv2, ibm-wh-acd-config-storage-nfs-pvc2

#### Create the persistent volume

```
 oc create -f ibm-wh-acd-config-storage-nfs-pv.yaml
```

> Example NFS PV file ibm-wh-acd-config-storage-nfs-pv.yaml

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ibm-wh-acd-config-storage-nfs-pv
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

#### Create the persistent volume claim.

```
 oc create -f ibm-wh-acd-config-storage-nfs-pvc.yaml -n <your namespace>
```

> Example NFS PVC file ibm-wh-acd-config-storage-nfs-pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ibm-wh-acd-config-storage-nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  volumeMode: Filesystem
  volumeName: ibm-wh-acd-config-storage-nfs-pv
```

#### Persistent Volume and Claim Removal

To remove the persistent volume and claim run the following:

```
oc delete pvc ibm-wh-acd-config-storage-nfs-pvc -n <your namespace>
oc delete pv ibm-wh-acd-config-storage-nfs-pv
```
