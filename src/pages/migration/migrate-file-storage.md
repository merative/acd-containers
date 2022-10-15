---
title: "Migration of Existing Shared File Storage"
excerpt: "Migration of Existing Shared File Storage."
categories: migration
slug: migrate-file-storage
toc: true
---

All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM ACD to Merative ACD by December 31, 2022.

- For more information and general considerations, see [Migration Considerations](/migration/considerations/).
- Additional storage migration options include:

  - [Cartridge Redeployment with Shared File Storage](/migration/redeploy-file-storage/) to recreate the data by redeploying your cartridges to a new shared file storage volume.
  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume.
  - [Migration of Existing Shared File Storage](/migration/migrate-file-storage/) to migrate the data using the same shared file storage volume.
  - [Migration of Existing Object Storage](/migration/migrate-object-storage/) to migrate the data using the same object storage bucket.

Plan for the following when migrating an ACD instance and an existing shared file storage volume as a storage medium. The following summarizes the steps needed.

- Create a new namespace and ACD instance with zero replicas.
- Turn off access to the existing instance.
- Backup the existing persistent storage.
- Migrate storage using one of these options:
  - Move the persistent volume to the new namespace and fix permissions.
  - Restore from the backup to a new volume in the new namespace.
- Start up the new ACD instance and verify operation.
- Enable access to the new instance and verify.
- Remove the old instance at a later date.

A set of detailed steps are provided below as an option for migration.

_Note:_ References to source ACD or source namespace are referring to your existing IBM ACD instance and namespace. References to target ACD or target namespace are referring to a new Merative ACD instance and namespace.

1. Capture storage configuration information from the source ACD instance.

  Replace `<existing_ACD_namespace>` with your existing ACD namespace.

  ```
  export source_acd_namespace=<existing_ACD_namespace>
  export source_pvc_name=$(oc get pvc -n ${source_acd_namespace} -o json | yq -r ".items[].spec.volumeName")
  echo ${source_pvc_name}
  ```

  Verify the source pvc name is correct.

  ```
  export pv_id=$(oc get pvc ${source_pvc_name} -n ${source_acd_namespace} -o yaml | yq -r ".spec.volumeName")
  echo ${pv_id}
  ```

  Verify the volume name is correct.

  ```
  oc get pv ${pv_id} -n ${source_acd_namespace} -o yaml | grep persistentVolumeReclaimPolicy
  ```
  **NOTE: Very Important! Verify the reclaim policy is set to "Retain".**

1. Create the target ACD namespace and switch to that namespace as your project.

  Replace `<target_ACD_namespace>` with the name you want to use as your new ACD namespace.

  ```
  export target_acd_namespace=<target_ACD_namespace>
  oc create namespace ${target_acd_namespace}
  oc project ${target_acd_namespace}
  ```

1. Capture user information from the target namespace.

  The annotation `openshift.io/sa.scc.uid-range` indicates the user ID range for the project. Replace `<target_project_uid>` with the starting number in the range identified by that annotation.

  ```
  oc get project ${target_acd_namespace} -o json | yq -r .metadata.annotations
  export target_project_uid=<target_project_uid>
  ```

1. Create a new PersistentVolumeClaim (PVC) using the existing PersistentVolume (PV) in the target namespace. Create a PVC using the Openshift console, or save the example yaml below as <target_pvc_name>.yaml. Replace `<target_pvc_name>` with the new PVC name. Ensure the rest of the configuration matches that of your existing PVC in the source ACD namespace.

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
  oc <target_pvc_name>.yaml -n ${target_acd_namespace}
  ```

1. Shut off network access to the ACD instance in the source namespace and to the Configuration Editor, if it is also deploy.

    - First, verify you can get to the URL that clients use.
    - Then edit the Route to point to a non-existent service.
    - Finally, verify you can no longer get to the URL that clients use.

1. Take a backup of the persistent storage in the source namespace.

  Replace `<backup_file_name>` with the name you want to use as your backup file name.

  ```
  export source_acd_pod_name=$(oc get pods -n ${source_acd_namespace} | grep acd-acd | awk '{print $1}')
  oc exec ${source_acd_pod_name} -n ${source_acd_namespace} -- tar -I "gzip --best" -cf - /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data > <backup_file_name>.tar.gz
  ```

1. Choose your storage migration path and migrate the persistent storage, either [Restore from a backup to a new volume]() in the target namespace or [Migrate an existing persistent volume to a new namespace]().

  After the storage migration steps are complete, verify the target PersistentVolumeClaim (PVC) name is correct.

  ```
  echo ${target_pvc_name}
  ```

1. If the Configuration Editor is deployed, create a new zero-replica instance of the cartridge and dictionary services in the target namespace using the target PVC name. Refer to [Installing ACD Configuration Editor](https://merative.github.io/acd-containers/configeditor/download_openshift/#installing-acd-configuration-editor).

  ```
  helm install merative-acd-ce-cdc   merative-acd-ce/cdc/chart/cdc   --set replicas=0   --set configurationStorage.file.volume.existingClaimName=${target_pvc_name}   --namespace ${target_acd_namespace}
  helm install merative-acd-ce-crtg   merative-acd-ce/crtg/chart/crtg   --set replicas=0   --set configurationStorage.file.volume.existingClaimName=${target_pvc_name}   --namespace ${target_acd_namespace}
  ```

1. Create a new zero-replica ACD instance in the target namespace using the target PVC name.

  Also bring forward the rest of your configured settings from the existing source deployment, such as tenant header, license usage, etc.

  Refer to [Installing ACD](/installing/installing/) for installation steps.

1. If the Configuration Editor is deployed, scale down the cartridge and dictionary services to zero replicas in the source namespace.

  ```
  export source_crtg_deployment_name=$(oc get deployments -n ${source_acd_namespace} | grep acd-crtg | awk '{print $1}')
  oc scale --replicas=0 deployment ${source_crtg_deployment_name} -n ${source_acd_namespace}
  export source_cdc_deployment_name=$(oc get deployments -n ${source_acd_namespace} | grep acd-cdc | awk '{print $1}')
  oc scale --replicas=0 deployment ${source_cdc_deployment_name} -n ${source_acd_namespace}
  ```

1. Scale down the ACD instance to zero replicas in the source namespace.

  ```
  oc scale --replicas=0 -n ${source_acd_namespace} acds.wh-acd.ibm.com/acd-instance
  ```

1. Delete the PVC in the source namespace.

  ```
  oc delete pvc ${source_pvc_name} -n ${source_acd_namespace}
  ```

1. Remove the PVC reference from the unbound, retained PersistentVolume (PV).

  ```
  oc edit pv ${pv_id} -n ${source_acd_namespace}
  ```

1. The volume should be bound again to the new PVC. Verify the PV is bound again to the PVC in the target namespace.

  ```
  oc get pvc ${target_pvc_name} -n ${target_acd_namespace}
  ```

1. Fix user permissions to directories and artifacts in persistent storage in the target namespace.

  ```
  oc exec  acd-ubi-pod-pvc-debug   -n ${target_acd_namespace} -- chown -R  ${target_project_uid} /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data/.
  ```

1. Scale up the ACD instance to one (or more) replicas in the target namespace.

1. If the Configuration Editor is deployed, scale up the cartridge and dictionary deployments to one (or more) replicas.

  ```
  export target_crtg_deployment_name=$(oc get deployments -n ${target_acd_namespace} | grep acd-crtg | awk '{print $1}')
  oc scale --replicas=1 deployment ${target_crtg_deployment_name} -n ${target_acd_namespace}
  export target_cdc_deployment_name=$(oc get deployments -n ${target_acd_namespace}  | grep acd-cdc | awk '{print $1}')
  oc scale --replicas=1 deployment ${target_cdc_deployment_name} -n ${target_acd_namespace}
  ```

1. Verify all ACD pods start up as expected.

  ```
  oc get pods -n ${target_acd_namespace}
  ```

1. Make OAuth proxy updates for secure access to the target namespace, if configured to use this.

  For ACD deployments (not the Configuration Editor), create a serviceview role in target namespace and grant all service accounts in the proxy namespace access to it. Follow the steps 7 and 8 under [Manage Access](/security/manage-access/).

  Update the proxy Deployment upstream option to point to the ACD service (or cartridge service) in the target namespace. Follow step 2 under [Manage Access](/security/manage-access/).

1. Re-enable network access and client traffic to the target namespace.

  Fix the Route you disabled in step 7 to point to the OAuth service if using an OAuth proxy or to the ACD service.
