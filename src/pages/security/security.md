---
title: "Security"
excerpt: ""
categories: security
slug: security
toc: true
---

## Security

* The IBM ACD Server is a stateless offering. It is the responsibility of the user to ensure that the proper security measures are established when using the server.

### Data in motion

* All transports used to interact with IBM ACD Server must be encrypted. TLS 1.2 is recommended.
* All transport within the server are encrypted using FIPS compliant protocols.

### Data at rest

* The prerequisite storage must have data encryption enabled.
* Each instance is responsible for Backup and Recovery of the storage and must backup solution specific configurations.
