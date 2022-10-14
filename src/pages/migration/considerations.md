---
title: "Migration Considerations"
excerpt: "Migration Considerations."
categories: migration
slug: considerations
toc: true
---

All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM ACD to Merative ACD by December 31, 2022.

Consider the following as you prepare for and proceed with a migration of your ACD instance.

- A new instance of the `Acd` custom resource belonging to the `acd.merative.com` group must be installed.
- There is no upgrade path from the IBM Watson Annotator for Clinical Data Container Edition to Merative Annotator for Clinical Data Container Edition.
- Once the migration is complete, the former `Acd` custom resource belonging to the `wh-acd.ibm.com` group should be deleted.
- For image access:

  - Images for IBM Watson Annotator for Clinical Data are available from the IBM Entitled Registry through December 31, 2022.
  - Images for Merative Annotator for Clinical Data are available from the Azure Active Directory ACD registry.
  - To help ensure all ACD images are available during this migration period, January, April, and June [2022 versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases-from-ibm) of the IBM ACD releases from IBM have been mirrored to the ACD registry. See [Using Image Mirroring](/installing/using-image-mirroring) for details on mirroring.
  - Credentials for the ACD registry can be used to pull either Merative or IBM ACD images, once an ACD registry pull secret is configured and mirroring is configured for the IBM registry sources.

- For migration with persistent storage:

  - Refer to [Migration with Shared File Storage](/migration/file-storage) if file-based storage is used.
  - Refer to [Migration with Object Storage](migration/object-storage) if object-based storage is used.
