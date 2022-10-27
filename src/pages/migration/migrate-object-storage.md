---
title: "Migration of Existing Object Storage"
excerpt: "Migration of Existing Object Storage."
categories: migration
slug: migrate-object-storage
toc: true
---

The Merative Annotator for Clinical Data Container Edition is the replacement for the IBM Watson Annotator for Clinical Data Container Edition. All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022.

- For more information and general considerations, see [Migration Considerations](/migration/considerations/).
- Additional storage migration options include:

  - [Cartridge Redeployment with Shared File Storage](/migration/redeploy-file-storage/) to recreate the data by redeploying your cartridges to a new shared file storage volume.
  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume.
  - [Migration of Existing Shared File Storage](/migration/migrate-file-storage/) to migrate the data using the same shared file storage volume.

Plan to do the following when migrating an ACD instance that uses object storage as a storage medium.

- Create a new namespace for ACD.
- Create a new secret with credentials for S3-based storage.
- Backup the existing persistent storage.
- Create a new ACD instance with existing configuration and verify operation.
- Enable access to the new instance and verify.
- Remove the old instance at a later date.

A set of detailed steps are provided below as an option for migration.

_Note:_ References to source ACD or source namespace are referring to your existing IBM ACD instance and namespace. References to target ACD or target namespace are referring to a new Merative ACD instance and namespace.

1. Save the source ACD namespace name.

  Replace `<existing_ACD_namespace>` with your existing ACD namespace.

  ```
  export source_acd_namespace=<existing_ACD_namespace>
  ```

1. Gather and save the source ACD configuration for persistent storage, tenant header, etc. These will be used when creating the target ACD instance and input through the OpenShift console during the install step.

  `s3_bucket`=

  `s3_endpointUrl`=

  `s3_location`=

  `tenantHeader`=

1. Create the target ACD namespace and switch to that namespace as your project.

  Replace `<target_ACD_namespace>` with the name you want to use as your new ACD namespace.

  ```
  export target_acd_namespace=<target_ACD_namespace>
  oc create namespace ${target_acd_namespace}
  oc project ${target_acd_namespace}
  ```

1. Create the secret for the object storage bucket in the target namespace. Replace `<cos_id>` with your S3 bucket access key ID and `<cos_secret>` with your S3 bucket access key secret.

  ```
  echo ‘<cos_id>’ | tr -d ‘\n’ > username
  echo ‘<cos_secret>’ | tr -d ‘\n’ > password
  oc create secret generic merative-acd-as --namespace ${target_acd_namespace} --from-file=username --from-file=password
  ```

1. Take a backup of the persistent storage in the source namespace. Follow your usual backup process.

1. Create a new ACD instance in the target namespace using the existing persistent storage configuration.

  Also bring forward the rest of your configured settings from the existing source deployment, such as tenant header, license usage, etc.

  Refer to [Installing ACD](/installing/installing/) for installation steps.

1. Verify all ACD pods start up as expected in the target namespace.

  ```
  oc get pods -n ${target_acd_namespace}
  ```

1. Make OAuth proxy updates for secure access to the target namespace, if configured to use this.

  For ACD deployments (not the Configuration Editor), create a serviceview role in target namespace and grant all service accounts in the proxy namespace access to it. Follow the steps 7 and 8 under [Manage Access](/security/manage-access/).

  Update the proxy deployment upstream option to point to the ACD service (or cartridge service) in the target namespace. Follow step 2 under [Manage Access](/security/manage-access/).

1. Uninstall the source ACD instance and source ACD operator at a later date.

  Refer to [Uninstalling ACD](https://merative.github.io/acd-containers/installing/uninstalling/) for instructions.
