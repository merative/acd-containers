---
title: "Storage Considerations"
excerpt: "Storage Considerations."
categories: planning
slug: storage
toc: true
---

_Note: All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022. See [Migration](/migration/considerations/) for more details regarding storage considerations._

Annotator for Clinical Data Container Edition requires a storage medium if a cartridge is going to be deployed to the environment.  The storage medium persists the specific version of each analytic artifact contained in the cartridge and associated metadata.

Two storage mediums are supported:

- File-based persisted volumes and claims
- Object Storage

All configured storage needs to have encryption enabled.

## Persistent volume and claim installation

File-based storage is most often used with on-premise cloud-based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports persistent volume claims of ReadWriteMany (RWX) access mode across all zones and nodes of the cluster. The persistent volume claim must be against a [ReadWriteMany shared file system](https://docs.openshift.com/container-platform/4.7/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage)

It is recommended to have a minimum of 10 gigabytes of free space within the file system for configuration storage.

See the [Configuration](../../management/configuring) section for enabling file storage using a persistent volume and the [Setting up file-based storage configuration persistent volume and claim setup](../../installing/setup-namespace/#setting-up-file-based-storage-configuration-persistent-volume-and-claim-setup) section for detailed setup instructions.

## Object storage configuration

See the [Configuration](../../management/configuring) section for enabling object storage and the [Setting up S3-based configuration storage](../../installing/setup-namespace/#setting-up-s3-based-configuration-storage) section for secret setup using the S3 credentials.

### IBM Cloud Object Storage (COS)

IBM COS encrypts all objects by default. For more information on encryption management including bring your own encryption key, refer to the [Cloud Object Storage documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-encryption)

### Amazon S3 storage

For information on configuring Amazon's S3 server-side encryption, refer to the [Amazon S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html).
