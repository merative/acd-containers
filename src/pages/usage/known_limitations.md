---
title: "Known Limitations"
excerpt: "Known Limitations."
categories: Using ACD
slug: known_limitations
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->

<!-- ---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Known Limitations -->

## Text size limits

Annotator for Clinical Data imposes a 50K limit on text being analyzed per request. For JSON requests, the JSON metadata does not count towards the 50K threshold. The Annotator for Clinical Data _analyze_ APIs will return an `HTTP 413 Payload Too Large` error if the input text exceeds the 50K threshold.

## Cartridge deployment timeouts

Cartridge deployments via the _deploy_ API can sometimes exceed the one minute timeout threshold for services to provide a response. When the timeout is exceeded, an `HTTP 504 Gateway Timeout` response is returned in HTML format. Despite the `HTTP 504 Gateway Timeout` response, the deploy operation will continue to completion. In the event of a deployment timeout, you can verify successful deployment of the cartridge through monitoring the status of the deployment.  See [Cartridge Deployment](/usage/customizing/#cartridge-deployment).

Use of the asynchronous _cartridges_ APIs is recommended to avoid cartridge deployment timeouts.  See here for more information about [troubleshooting a cartridge deployment](/troubleshooting/troubleshooting-cartridge-deploy/).

## Multiple unstructured array elements

While multiple unstructured array elements with text values may be submitted in a single request, 40 unstructured array elements is the recommended limit to avoid performance degradation due to processing overhead.

## Cartridge use while deployment in progress

When a cartridge is in the midst of being deployed or re-deployed, use of the flows therein for text analysis should be avoided until cartridge deployment has successfully completed. Use of cartridge flows while the cartridge is actively being deployed may yield unexpected results.
