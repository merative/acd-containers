---
title: "Migration of Existing Shared File Storage"
excerpt: "Migration of Existing Shared File Storage."
categories: migration
slug: migrate-file-storage
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


The Merative Annotator for Clinical Data Container Edition is the replacement for the IBM Watson Annotator for Clinical Data Container Edition. All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by March 31, 2023.

- For more information and general considerations, see [Migration Considerations](/migration/considerations/).
- Additional storage migration options include:

  - [Cartridge Redeployment with Shared File Storage](/migration/redeploy-file-storage/) to recreate the data by redeploying your cartridges to a new shared file storage volume.
  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume.
  - [Migration of Existing Object Storage](/migration/migrate-object-storage/) to migrate the data using the same object storage bucket.

Plan to do the following when migrating an ACD instance and an existing shared file storage volume as a storage medium.

- Create a new namespace and new volume claim.
- Create a new ACD instance with zero replicas.
- Turn off access to the existing instance.
- Backup the existing persistent storage.
- Bind the new volume claim to the existing persistent volume.
- Fix user permissions in persistent volume.
- Start up the new ACD instance and verify operation.
- Enable access to the new instance and verify.
- Remove the old instance at a later date.

A set of detailed steps are provided below as an option for migration.

_Note:_ References to source ACD or source namespace are referring to your existing IBM ACD instance and namespace. References to target ACD or target namespace are referring to a new Merative ACD instance and namespace.

1. Capture storage configuration information from the source ACD instance.

  Replace `<existing_ACD_namespace>` with your existing ACD namespace.

  ```
  export source_acd_namespace=<existing_ACD_namespace>
  export source_pvc_name=$(oc get pvc -n ${source_acd_namespace} -o yaml | yq -r ".items[].metadata.name")
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
  export target_project_uid=$(oc get project ${target_acd_namespace} -o yaml | yq -r '.metadata.annotations."openshift.io/sa.scc.uid-range" | split("/") | .[0]')
  ```

2. Create a new PersistentVolumeClaim (PVC) using the existing PersistentVolume (PV) in the target namespace. Create a PVC using the OpenShift console, or save the example yaml below as <target_pvc_name>.yaml. Replace `<target_pvc_name>` with the new PVC name and `<pv_id>` with the persistent volume name. Ensure the rest of the configuration matches that of your existing PVC in the source ACD namespace. It will be in `Pending` status.

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
    volumeName: <pv_id>
  ```

  ```
  export target_pvc_name=<target_pvc_name>
  oc create -f <target_pvc_name>.yaml -n ${target_acd_namespace}
  oc get pvc -n ${target_acd_namespace}
  ```

1. Create a new pod using the ubi8 base image to fix permissions on the storage volume. Save the yaml below as `acd-ubi-pod-pvc-debug.yaml`. Replace `<target_pvc_name>` with the new PVC name. It will be in `Pending` status as it needs to use the PVC mount and can't yet at this point.

  ```
  kind: Pod
  apiVersion: v1
  metadata:
    name: acd-ubi-pod-pvc-debug
  spec:
    containers:
      - name: main
        command:
          - /bin/bash
        volumeMounts:
          - name: acd-file-store
            mountPath: /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data
        image: 'registry.access.redhat.com/ubi8/ubi:latest'
        args:
          - '-c'
          - sleep 7200
    volumes:
      - name: acd-file-store
        persistentVolumeClaim:
          claimName: <target_pvc_name>
    tolerations:
      - key: node.kubernetes.io/not-ready
        operator: Exists
        effect: NoExecute
        tolerationSeconds: 300
      - key: node.kubernetes.io/unreachable
        operator: Exists
        effect: NoExecute
        tolerationSeconds: 300
      - key: node.kubernetes.io/memory-pressure
        operator: Exists
        effect: NoSchedule
  ```

1. If the Configuration Editor is deployed, create a new zero-replica instance of the cartridge and dictionary services in the target namespace using the target PVC name.

  Refer to <span><a aria-current="" to="https://merative.github.io/acd-containers/configeditor/index.html#openshift-installing-config-editor" href="https://merative.github.io/acd-containers/configeditor/index.html#openshift-installing-config-editor" rel="noopener noreferrer" target="_blank" class="LeftNav-module--outboundLink">Install CE</a><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path><path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path></svg></span> for installation steps.

  ```
  helm install merative-acd-ce-cdc   merative-acd-ce/cdc/chart/cdc   --set replicas=0   --set configurationStorage.file.volume.existingClaimName=${target_pvc_name}   --namespace ${target_acd_namespace}
  helm install merative-acd-ce-crtg   merative-acd-ce/crtg/chart/crtg   --set replicas=0   --set configurationStorage.file.volume.existingClaimName=${target_pvc_name}   --namespace ${target_acd_namespace}
  ```

1. Create a new zero-replica ACD instance in the target namespace using the target PVC name.

  Also bring forward the rest of your configured settings from the existing source deployment, such as tenant header, license usage, etc.

  Refer to [Installing ACD](/installing/installing/) for installation steps.

1. Shut off network access to the ACD instance in the source namespace and to the Configuration Editor, if it is also deploy.

    - First, verify you can get to the URL that clients use.
    - Then edit the Route to point to a non-existent service.
    - Finally, verify you can no longer get to the URL that clients use.

1. Take a backup of the persistent storage in the source namespace. Follow your usual backup process, or run this command as an example of a direct command to do the backup (`exec` in, tar to shared file system, and then copy out.)

  Replace `<backup_file_name>` with the name you want to use as your backup file name.

  ```
  export source_acd_pod_name=$(oc get pods -n ${source_acd_namespace} | grep acd-acd | awk '{print $1}')
  oc exec ${source_acd_pod_name} -n ${source_acd_namespace} -- tar -I "gzip --best" -cf - /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data > <backup_file_name>.tar.gz
  ```

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

1. Delete the PVC in the source namespace. The Persistent Volume (PV) will become `Released`, but will still be retained.

  ```
  oc delete pvc ${source_pvc_name} -n ${source_acd_namespace}
  ```

1. Remove the PVC reference from the released PV.

  ```
  oc edit pv ${pv_id} -n ${source_acd_namespace}
  ```

  Delete the claimRef entry, such as the following lines:

  ```
  claimRef:
    kind: PersistentVolumeClaim
    namespace: merative-acd-operator-system
    name: merative-acd-config-storage-cephfs-pvc
    uid: 44453347-562c-47e8-a82f-190eee5cb1ae
    apiVersion: v1
    resourceVersion: '326022050'
  ```

1. The volume status should show `Bound` again to the new PVC. Verify the PV is bound to the PVC in the target namespace.

  ```
  oc get pvc ${target_pvc_name} -n ${target_acd_namespace}
  ```

1. Fix user permissions to directories and artifacts in persistent storage in the target namespace. Use the user id, `target_project_uid`, previously identified.

  ```
  oc exec  acd-ubi-pod-pvc-debug   -n ${target_acd_namespace} -- chown -R  ${target_project_uid} /opt/ibm/watsonhealth/services/config/artifactstore/tenant_data/.
  ```

1. Scale up the ACD instance to one (or more) replicas in the target namespace. Use the OpenShift console, or from the command line, run:

  ```
  oc scale --replicas=1 -n ${target_acd_namespace} acds.acd.merative.com/acd-instance
  ```

1. If the Configuration Editor is deployed, scale up the cartridge and dictionary deployments to one (or more) replicas.

  ```
  export target_crtg_deployment_name=$(oc get deployments -n ${target_acd_namespace} | grep acd-crtg | awk '{print $1}')
  oc scale --replicas=1 deployment ${target_crtg_deployment_name} -n ${target_acd_namespace}
  export target_cdc_deployment_name=$(oc get deployments -n ${target_acd_namespace}  | grep acd-cdc | awk '{print $1}')
  oc scale --replicas=1 deployment ${target_cdc_deployment_name} -n ${target_acd_namespace}
  ```

1. Delete the temporary ubi8 pod used to fix permissions.

  ```
  oc delete -f acd-ubi-pod-pvc-debug.yaml -n ${target_acd_namespace}
  ```

1. Verify all ACD pods start up as expected.

  ```
  oc get pods -n ${target_acd_namespace}
  ```

1. Make OAuth proxy updates for secure access to the target namespace, if configured to use this.

  For ACD deployments (not the Configuration Editor), create a serviceview role in target namespace and grant all service accounts in the proxy namespace access to it. Follow the steps 7 and 8 under [Manage Access](/security/manage-access/).

  Update the proxy deployment upstream option to point to the ACD service (or cartridge service) in the target namespace. Note the service names also changed as part of the migration, for example from `ibm-wh-acd-acd` to `merative-acd-acd`, so be sure to update both the service name and target namespace in the upstream option. Follow step 2 under [Manage Access](/security/manage-access/).

1. Re-enable network access and client traffic to the target namespace.

  Fix the Route you disabled in step 8 above to point to the OAuth service if using an OAuth proxy or to the ACD service.

1. Uninstall the source ACD instance and source ACD operator at a later date.

  Refer to [Uninstalling ACD](https://merative.github.io/acd-containers/installing/uninstalling/) for instructions.
