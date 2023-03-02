---
title: "Data Security"
excerpt: ""
categories: security
slug: data-security
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


## Security of data

It is the responsibility of the user to ensure that the proper security measures are established when using the ACD service.

### Data in motion

* All transports used to interact with the ACD service must be encrypted. TLS 1.2 is recommended.
* All transport within the ACD service itself are encrypted using FIPS compliant protocols.

### Data at rest

* The ACD service is a stateless offering in that it doesn't store any data sent to it for analyzing.
* Configuration data is stored in the [user-provided storage](/planning/storage/).
* The prerequisite storage used for ACD configuration must have data encryption enabled.
* The user is responsible for [backup and recovery](/management/backup-and-recovery/) of the configuration storage and must back up solution-specific configurations.
