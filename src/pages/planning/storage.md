---
title: "Storage Considerations"
excerpt: "Storage Considerations."
categories: planning
slug: storage
toc: true
---

## Storage Options

IBM Watson Annotator for Clinical Data Container Edition requires a storage medium if a cartridge is going to be deployed to the environment.  The storage medium persists the specific version of each analytic artifact contained in the cartridge and associated metadata.

Two storage mediums are supported:

- File-based persisted volumes and claims
- Object Storage

All configured storage needs to have encryption enabled.

### Persistent Volume and Claim Installation

File-based storage is most often used with on premise cloud-based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports persistent volume claims of Read Write Many access mode across all zones and nodes of the cluster. The persistent volume claim must be against a [ReadWriteMany shared file system](https://docs.openshift.com/container-platform/4.7/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage)

It is recommended to have a minimum of 10 gigabytes of free space within the file system for configuration storage.

### Object Storage Configuration

See the [configuration](../../management/configuring) section for enabling object storage.

#### IBM Cloud Object Storage (COS)

IBM COS encrypts all objects by default. For more information on encryption management including bring your own encryption key, refer to the [Cloud Object Storage documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-encryption)

#### Amazon S3 Storage

For information on configuring Amazon's S3 server-side encryption, refer to the [Amazon S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html).
