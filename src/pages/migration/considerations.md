---
title: "Migration Considerations"
excerpt: "Migration Considerations."
categories: migration
slug: considerations
toc: true
---

_Note: All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022._

Consider the following as you prepare for and proceed with a migration of your ACD instance.

- A new instance of the `Acd` custom resource belonging to the `acd.merative.com` group must be installed.
- There is no upgrade path from the IBM Watson Annotator for Clinical Data Container Edition to Merative Annotator for Clinical Data Container Edition.
- Once the migration is complete, the former `Acd` custom resource belonging to the `wh-acd.ibm.com` group should be deleted.
- For image access:

  - Images for IBM Watson Annotator for Clinical Data are available from the IBM Entitled Registry through December 31, 2022.
  - Images for Merative Annotator for Clinical Data are available from the Azure Active Directory ACD registry.
  - To help ensure all ACD images are available during this migration period, January, April, and June [2022 versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases-from-ibm) of the IBM ACD releases from IBM have been mirrored to the ACD registry. See [Using Image Mirroring](/installing/using-image-mirroring) for details on mirroring.
  - Credentials for the ACD registry can be used to pull either Merative or IBM ACD images, once an ACD registry pull secret is configured and mirroring is configured for the IBM registry sources.

- There are several options for migrating persistent storage, depending on the type of storage used. The amount of persisted data, frequency of changes to that data, and window of time when the data is unavailable due to migration may also be factors in choosing one migration path versus another.

  Here are some options:

  - [Cartridge Redeployment with Shared File Storage](/migration/redeploy-file-storage/) to recreate the data by redeploying your cartridges to a new shared file storage volume.

    Consider this option if you have a smaller number of cartridges deployed and those cartridges are not updated often. The storage configuration and redeployment of the cartridges can be done at any time, even before the new ACD instance is installed. The new ACD instance and storage installation and verification can proceed without any impact or dependency on the existing ACD instance. This would prevent downtime for clients during the migration process.

  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume..

    Consider this option if you have data that is not updated often. If your deployed cartridges are stable and you know they will not change during the migration window, then you can take a backup and restore it to your new storage volume without any impact or dependency on the existing ACD instance. This would prevent downtime for clients during the migration process.

  - [Migration of Existing Shared File Storage](/migration/migrate-file-storage/) to migrate the data using the same shared file storage volume.

    Consider this option if you have a significant amount of data that is being updated on a regular basis. To ensure that a backup includes all the data and that data is migrated, a migration window will be needed with downtime for your clients.

  - [Migration of Existing Object Storage](/migration/migrate-object-storage/) to migrate the data using the same object storage bucket.

    Consider this option when using object storage. The migration of object storage to a new ACD instance can be done with minimal to no downtime for clients.
