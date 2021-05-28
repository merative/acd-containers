---
title: "Data Security"
excerpt: ""
categories: security
slug: data-security
toc: true
---

## Security of data

* It is the responsibility of the user to ensure that the proper security measures are established when using the server.

### Data in motion

* All transports used to interact with IBM ACD Server must be encrypted. TLS 1.2 is recommended.
* All transport within the ACD server itself are encrypted using FIPS compliant protocols.

### Data at rest

* The IBM ACD Server is a stateless offering in that it doesn't store any data sent to it for analyzing.
* Configuration data is stored in the user provided storage.
* The prerequisite storage used for ACD configuration must have data encryption enabled.
* The user is responsible for Backup and Recovery of the configuration storage and must backup solution specific configurations.
