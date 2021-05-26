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
- A dedicated openshift project (namespace) to deploy acd into
- Secrets for pulling images and accessing a storage bucket
- Image mirroring (optional; for pulling images from different registries or running in airgap mode)

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

## Dedicated Namespace

See [create a project (namespace)](https://ibm.github.io/acd-containers/installing/installing/#create-a-project-(namespace)) in the Installation section.

## Secrets

ACD and its operator require the following secrets.

1. A pull secret to pull images from the entitled registry account.
2. (Optional) S3 credentials if S3 is being used as the configuration storage.

### Secret Installation

**Note:** Request access to the staging and/or production entitled registry and get an API or entitlement key. See [IBM Developer Entitled Registry Login Options](https://playbook.cloudpaklab.ibm.com/ibm-developer-entitled-registry-login-options/) for details.

#### Update the global pull secret using the CLI

[Update the global cluster pull secret](https://docs.openshift.com/container-platform/4.7/openshift_images/managing_images/using-image-pull-secrets.html#images-update-global-pull-secret_using-image-pull-secrets) containing the container registry image pull secret with these steps:

1. Extract the current global image pull secret from the cluster into a file in the current directory named .dockerconfigjson:
oc extract secret/pull-secret -n openshift-config --to=.

2. Create a base64 encoded string with the registry userid and password as it aligns with your access method.

   `printf "iamapikey:<developerkey>" | base64`  -or-  `printf "cp:<entitlementkey>" | base64`

3. Edit the .dockerconfigjson file and **ADD** a new JSON object to the exiting auths object with the credentials for the entitled registry. For example:

   ```
   "cp.stg.icr.io": {
       "auth": "aWFtYXBpaxxxxxxxxxxxcGFzc3dvcmQ=",
       "email": "xxx@nomail.relay.ibm.com"
   }
   ```

4. Update the global image pull secret with the updated credentials:

   `oc set data secret/pull-secret -n openshift-config --from-file=.dockerconfigjson`

5. Monitor the node status using the command:

   `oc get nodes`

6. When the nodes are finish restarting, your cluster is now ready to pull images from the registry.

#### Update the global pull secret using a script

See the [Air-gap Installation Configure Cluster for Airgap section](https://ibm.github.io/acd-containers/installing/air-gap-installation/#cluster-with-a-bastion/) documentation.

#### (Optional) Create configuration storage secret

If the deployment is using S3 as the configuration storage, the credentials need to be inserted as secrets.

```
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
kubectl create secret generic ibm-wh-acd-as \
                              --namespace <namespace> \
                              --from-file=username \
                              --from-file=password
```

## (Optional) Configure Image Registry Repository Mirroring

Configure your OpenShift Container Platform cluster to redirect requests to pull images from a repository on a source image registry and have it resolved by a repository on a mirrored image registry. See [configuring image registry repository mirroring](
https://docs.openshift.com/container-platform/4.7/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration) for details.

**Note** This is currently required if you are pulling ACD images from the production entitled registry and want to access the mirrored images in the staging entitled registry.

### Configure mirroring using the CLI

Create an ImageContentSourcePolicy file (for example, mirror-config.yaml) to define the source and mirror locations. Replace the source and mirrors with your own registry and repository pairs and images.

This example mirrors images from production registries `icr.io` and `cp.icr.io` to the same namespace and two different repository locations in the staging registry `cp.stg.icr.io`.

```
apiVersion: operator.openshift.io/v1alpha1
kind: ImageContentSourcePolicy
metadata:
  name: mirror-config
spec:
  repositoryDigestMirrors:
    - mirrors:
        - cp.stg.icr.io/cp/wh-acd
      source: cp.icr.io/cp/wh-acd
    - mirrors:
        - cp.stg.icr.io/cp
      source: icr.io/cpopen
```

Create the ImageContentSourcePolicy object.

`oc create -f mirror-config.yaml`

**Note** Applying the ImageContentSourcePolicy causes your cluster nodes to recycle and will temporarily limit the usability of the cluster.

### Configure mirroring using a script

See the [Air-gap Installation Configure Cluster for Airgap section](https://ibm.github.io/acd-containers/installing/air-gap-installation/#cluster-with-a-bastion/) documentation.
