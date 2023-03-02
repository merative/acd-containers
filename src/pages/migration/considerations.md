---
title: "Migration Considerations"
excerpt: "Migration Considerations."
categories: migration
slug: considerations
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2022, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


The Merative Annotator for Clinical Data Container Edition is the replacement for the IBM Watson Annotator for Clinical Data Container Edition. All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by March 31, 2023.

Consider the following as you prepare for and proceed with a migration of your ACD instance.

- A new instance of the `Acd` custom resource belonging to the `acd.merative.com` group must be installed.
- There is no upgrade path from the IBM Watson Annotator for Clinical Data Container Edition to Merative Annotator for Clinical Data Container Edition.
- Confirm the cluster has enough resources to stand up another acd instance in addition to the existing instance. Add worker nodes or resize the worker pool if necessary.
- Once the migration is complete and your old ACD instance is removed, the former `Acd` custom resource belonging to the `wh-acd.ibm.com` group should be deleted.
- For image access:

  - Images for IBM Watson Annotator for Clinical Data are available from the IBM Entitled Registry through March 31, 2023.
  - Images for Merative Annotator for Clinical Data are available from the Azure Active Directory ACD registry.
  - To help ensure all ACD images are available during this migration period, January, April, and June [2022 versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases-from-ibm) of the IBM ACD releases from IBM have been mirrored to the ACD registry. See [Using Image Mirroring](/installing/using-image-mirroring) for details on mirroring.
  - Credentials for the ACD registry can be used to pull either Merative or IBM ACD images, once an ACD registry pull secret is configured and mirroring is configured for the IBM registry sources.

- There are several options for migrating persistent storage, depending on the type of storage used. The amount of persisted data, frequency of changes to that data, and window of time when the data is unavailable due to migration may also be factors in choosing one migration path versus another.

  - [Cartridge Redeployment with Shared File Storage](/migration/redeploy-file-storage/) to recreate the data by redeploying your cartridges to a new shared file storage volume.

    Consider this option  for shared file storage when:

    - It is easy to redeploy cartridges to recreate persisted data on a new storage volume.
    - Installation and verification of the new instance and persisted data can all be done before moving clients over.
    - No maintenance window or downtime for clients is the goal.

  - [Backup and Restore with Shared File Storage](/migration/restore-file-storage/) to restore the data from a backup to a new shared file storage volume.

    Consider this option for shared file storage when:

    - It is easy to restore data from a backup to recreate persisted data on a new storage volume.
    - Installation and verification of the new instance and persisted data can all be done before moving clients over.
    - No maintenance window or downtime for clients is the goal.

  - [Migration of Existing Shared File Storage](/migration/migrate-file-storage/) to migrate the data using the same shared file storage volume.

    Consider this option for shared file storage when:

    - Active cartridge development and deployment may be happening frequently by multiple clients.
    - Redeployment of cartridges or restoring data from a backup is not an option.
    - Installation and verification of the new instance and a subset of the persisted data can be done before moving clients over.
    - A migration window that requires downtime for your clients is acceptable.

  - [Migration of Existing Object Storage](/migration/migrate-object-storage/) to migrate the data using the same object storage bucket.

    Consider this option for object storage when:

    - Installation and verification of the new instance and persisted data can all be done before moving clients over.
    - No maintenance window or downtime for clients is the goal.
