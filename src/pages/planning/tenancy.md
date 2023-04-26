---
title: "Security and Tenancy"
excerpt: "Security and Tenancy"
categories: planning
slug: tenancy
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->

## Planning for security of Annotator for Clinical Data (ACD) Container Edition

Annotator for Clinical Data instances are set up in a dedicated namespace (one instance per namespace).  A Network policy is installed that allows incoming calls to the top level ACD service from any other namespace in the same cluster.  If you need external access or want to secure access to limit which other namespaces can call into an ACD instance, see the [Manage Access](../../security/manage-access/#network-policies-with-acd) section after you have installed the instance.

## Multitenancy planning for Annotator for Clinical Data

Annotator for Clinical Data instances are set up by default to run as a single 'defaultTenant' tenant.  If you have multiple applications and want to isolate their configuration data, you should plan how you want to isolate the applications from each if required.  You can install multiple Annotator for Clinical Data instances (one per application) or configure a single instance with multitenancy.  When using a single instance with multitenancy, the configuration storage is partitioned by tenant, where each tenant represents a different application.  To identify which application (i.e. tenant) is calling, ACD relies on a security proxy that will authenticate the application and pass a header back to ACD to identify the application (this is set with the `tenantHeader` field on the ACD instance and the application is identified by which service account token it is using).   The [Manage Access](../../security/manage-access) section provides instructions for installing a security proxy, creating service accounts per application and setting up ACD to honor the header passed back.
