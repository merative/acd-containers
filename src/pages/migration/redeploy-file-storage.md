---
title: "Cartridge Redeployment with Shared File Storage"
excerpt: "Cartridge Redeployment with Shared File Storage."
categories: migration
slug: redeploy-file-storage
toc: true
---

The Merative Annotator for Clinical Data Container Edition is the replacement for the IBM Watson Annotator for Clinical Data Container Edition. All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022.

- For more information and general considerations, see [Migration Considerations](/migration/considerations/).
- Additional storage migration options include:

  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume.
  - [Migration of Existing Shared File Storage](/migration/migrate-file-storage/) to migrate the data using the same shared file storage volume.
  - [Migration of Existing Object Storage](/migration/migrate-object-storage/) to migrate the data using the same object storage bucket.

Plan to do the following when redeploying cartridges to new storage as a migration path for an ACD instance that uses shared file storage as a storage medium.

- Create a new namespace for ACD.
- Create a new storage volume and claim.
- Create an ACD instance in the new namespace and configure it to use the new storage.
- Start up the new ACD instance and verify operation.
- Redeploy cartridges to the new ACD instance.
- Verify cartridges exist and are accessible.
- Enable access to the new instance and verify.
- Remove the old instance at a later date.

A set of detailed steps are provided below as an option for migration.

_Note:_ References to source ACD or source namespace are referring to your existing IBM ACD instance and namespace. References to target ACD or target namespace are referring to a new Merative ACD instance and namespace.

1. Take a backup of the persistent storage in the source namespace. Follow your usual backup process, or run this command as an example of a direct command to do the backup (`exec` in, tar to shared file system, and then copy out.)

  Replace `<backup_file_name>` with the name you want to use as your backup file name.

  ```
  export source_acd_pod_name=$(oc get pods -n ${source_acd_namespace} | grep acd-acd | awk '{print $1}')
  oc exec ${source_acd_pod_name} -n ${source_acd_namespace} -- tar -I "gzip --best" -cf - /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data > <backup_file_name>.tar.gz
  ```

1. Create the target ACD namespace and switch to that namespace as your project.

  Replace `<target_ACD_namespace>` with the name you want to use as your new ACD namespace.

  ```
  export target_acd_namespace=<target_ACD_namespace>
  oc create namespace ${target_acd_namespace}
  oc project ${target_acd_namespace}
  ```

1. Create a new PersistentVolumeClaim (PVC) and PersistentVolume (PV) in the target namespace.

  Create the PVC using the OpenShift console, or save the example yaml below as <target_pvc_name>.yaml. Replace `<target_pvc_name>` with the new PVC name.

  Ensure the rest of the configuration matches that of your existing PVC in the source ACD namespace.

  ```
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: <target_pvc_name>
  spec:
    accessModes:
    - ReadWriteMany
    resources:
      requests:
        storage: 10Gi
    storageClassName: ocs-storagecluster-cephfs
    volumeMode: Filesystem
  ```

  ```
  export target_pvc_name=<target_pvc_name>
  oc create -f <target_pvc_name>.yaml -n ${target_acd_namespace}
  oc get pvc -n ${target_acd_namespace}
  ```
  Confirm the PVC shows a status of `Bound`.

1. Create a new ACD instance in the target namespace using the target PVC name.

  Bring forward the rest of your configured settings from the existing source deployment, such as tenant header, license usage, etc.

  Refer to [Installing ACD](/installing/installing/) for installation steps.

1. Verify all ACD pods start up as expected.

  ```
  oc get pods -n ${target_acd_namespace}
  ```

1. Redeploy your cartridges to the new ACD instance so they are persisted to the new storage volume.

    - See [Deploying and updating the ACD-provided cartridges](/usage/getting-started/#deploying-and-updating-the-acd-provided-cartridges) for deploying the provided cartridges.
    - See [Cartridge deployment](/usage/customizing/#cartridge-deployment) for deploying your custom cartridges.

1. Make OAuth proxy updates for secure access to the target namespace, if configured to use this.

    - For ACD deployments (not the Configuration Editor), create a serviceview role in the target namespace and grant all service accounts in the proxy namespace access to it. Follow the steps 7 and 8 under [Manage Access](/security/manage-access/).

    - Update the proxy deployment upstream option to point to the ACD service (or cartridge service) in the target namespace. Follow step 2 under [Manage Access](/security/manage-access/).

1. Uninstall the source ACD instance and source ACD operator at a later date.

  Refer to [Uninstalling ACD](https://merative.github.io/acd-containers/installing/uninstalling/) for instructions.
