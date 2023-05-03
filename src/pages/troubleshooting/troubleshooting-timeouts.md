---
title: "Troubleshooting Timeouts"
excerpt: "."
categories: troubleshooting
slug: timeouts
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


Timeouts can occur during analyze calls if the documents you send to ACD take too long to process.  This can be due to the size of the document or the configuration of the cartridge and its artifacts with the content of the document or a combination of both.  In addition, there are various components in the path which can be configured to adjust their timeouts.  

## OpenShift Route timeouts
OpenShift uses Routes for ingress access to the ACD or any proxy authentication service you are exposing in front of ACD. The default timeout for this is 30 seconds.  You can adjust this by adding the *haproxy.router.openshift.io/timeout* annotation to the route you are using.  There are other annotations recommended on routes to help balance the traffic across route instances - see the 
[Manage Access](/security/manage-access/) page for details.
## Load balancer timeouts
Ingress controllers on OpenShift are tied to load balancers that expose the routes outside the cluster network.  These are configured in the ingress controller or in the cloud specific load balancer settings.  On AWS OCP if the ingress controller is of type Internal you can set the timeout on the Classic load balancer associated with the domain name in the AWS Console on its Attributes settings.  In OCP 4.11 and later this can be configured in the ingress controller yaml itself - see [OpenShift documentation](https://docs.openshift.com/container-platform/4.11/networking/configuring_ingress_cluster_traffic/configuring-ingress-cluster-traffic-aws.html) for details. 

## ACD timeouts
The default timeout between ACD and its microservices is 60 seconds.  If an annotator in the flow takes longer than this, ACD will return a 504 Gateway Timeout error back to the caller.  This timeout can be adjusted by adding this environment variable to the merative-acd-acd deployment 

| env variable | description | default (if not set)|
|----------|-------------|---------------------|
|clinical_data_annotator_acd_api_request_timeout_read | timeout in milliseconds for any microservice call from acd | 60000

## Reduction of document size
One way to reduce timeouts on the client side is to break the document into smaller chunks to send to ACD.  This is pretty straightforward but care should be taken to try to break the document on a page or sentence boundary so the syntactical and lexical parsing is maintained.  Sometimes there are natural breaks in large documents or headers that can be scanned for to assist with this.

## Reducing the wait time in service queues
If the ACD system is under load it has queues to buffer requests as needed (too many concurrent requests can cause the processes in ACD to run out of memory and crash so there are safeguards to limit the maximum number of concurrent request each process can handle at once).  If any ACD service is experiencing persistent high queue lengths it will slow down processing.  To see if documents are queueing up in ACD or any of its microservices, look at the metric *clinical_data_annotator_api_queued_time_seconds*  (see [Enabling and Configuring ACD prometheus metrics](/troubleshooting/logging-monitoring/#enabling-and-configuring-acd-prometheus-metrics) for metric enablement) or search the logs for the message "Concurrent event". To remedy this, add more ACD replicas to your ACD instance (which generally requires more nodes to run on), or reduce the number of documents sent to the ACD instance at once.

## Run on larger VMs
The node size on which you choose to put the ACD pods determines how many virtual CPU cores are avaiable. You can reduce the time it takes for ACD to process documents by running on larger nodes with more CPUs.  If you are  using 8 vCPU nodes, consider moving to 16 vCPU nodes and seeing if that helps reduce analyze call times to ACD.


