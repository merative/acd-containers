---
title: "Performance and Capacity"
excerpt: "Performance and Capacity."
categories: planning
slug: perf-and-capacity
toc: true
---
## Planning for performance and capacity of Annotator for Clinical Data

Response time for _analyze_ calls to Annotator for Clinical Data depends on the document size and the flow used as well as the content and the systems that ACD is deployed on, so it is recommended to test with your data and configuration.  For planning purposes, the provided [clinical insights](../../clouddocs/clinical_insights_overview/) flow processes a typical 2K document (about 1 page of clinical text) in about 2 seconds so this can be used as a high-level approximation.

### Scaling

ACD scales both vertically and horizontally in terms of the number of concurrent documents it can process at one time.  The maximum concurrent documents at a time can be used to plan for peak demand needs.   The concurrent documents and response time averaged together can then be used to calculate a maximum throughput.

- Vertical scaling refers to a single ACD replica which can scale up to the number of virtual CPUs on the system with a limit of 16.
- Horizontal scaling refers to adding more replicas to the ACD instance.

For production environments, it is recommended to use 3 replicas to have triple-active HA (and across 3 zones when used in a multi-zone region in a cloud environment).  With triple-active architectures, you can plan for 2 replicas to be available and each replica to handle 50% of your steady-state workload to allow for a zone or replica to be down during updates. For development environments, a 2-replica or even single-replica instance may be used depending on your availability and scaling needs.

For example, if running a production environment with 3 replicas on 16 vCPU systems, the ACD instance would have top capacity of 48 (3x16) concurrent documents and you can plan on 32 (2x16) even during zone outages or system updates.   To scale up, add more replicas to the instance (and ensure you have the required worker capacity in the cluster).  Note that a single replica can handle up to a maximum of 16 concurrent documents if the CPU capacity of the system is 16 or higher.   Note also that ACD replicas are set up to not get scheduled on the same system by default, so the worker pool count should be at least as big as the replica count.  To configure or adjust the replica count on an ACD instance, see the [Scaling ACD](../../management/scaling/) section under management.

As you plan capacity, consider the number of vCPU licenses purchased for Annotator for Clinical Data. You should purchase enough licenses to match the maximum capacity of concurrent documents the system is configured to handle (number of replicas times worker system CPU capacity by default). If you want to lower the licenses needed you can lower the replica count and/or set the limit on the CPU for the ACD instance.  See [License Tracking](/installing/license-tracking/) for details on how the license usage based on a VPC metric is tracked.
