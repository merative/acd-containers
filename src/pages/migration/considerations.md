---
title: "Migration Considerations"
excerpt: "Migration Considerations."
categories: migration
slug: considerations
toc: true
---

_Note: All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022._

Please consider the following as you prepare for and proceed with a migration of your ACD instance.

- A new instance of the `Acd` custom resource belonging to the `acd.merative.com` group must be installed.
- There is no upgrade path from the IBM Watson Annotator for Clinical Data Container Edition to Merative Annotator for Clinical Data Container Edition.
- Once the migration is complete, the former `Acd` custom resource belonging to the `wh-acd.ibm.com` group should be deleted.
- For image access:

  - Images for IBM Watson Annotator for Clinical Data are available from the IBM Entitled Registry through December 31, 2022.
  - Images for Merative Annotator for Clinical Data are available from the Azure Active Directory ACD registry.
  - To help ensure all ACD images are available during this migration period, we have mirrored [recent versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases) of the IBM Watson ACD images from the IBM Entitled Registry to the ACD registry.
  - Credentials for the ACD registry can be used to pull either Merative or recent IBM Watson ACD images, once an ACD registry pull secret is configured and mirroring is configured for the IBM Watson ACD images.
