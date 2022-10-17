---
title: "High Availability"
excerpt: "High Availability."
categories: planning
slug: hadr
toc: true
---

Annotator for Clinical Data Container Edition default deployment model distributes replicas across nodes and can also span zones within a region.
Disruption in the network connectivity may happen within a region.  Recovering from potential disasters that affect an entire region requires planning and preparation.
Instance owners should develop recovery plans based on their use cases.

## Availability during updates and voluntary operations

Pod disruption budgets can be configured such that a minimum number of replicas are available during voluntary operations like upgrades or other cluster administration activities.
The [Management](../../management/pod-disruption) section provides an example that was tested with the default deployment Annotator for Clinical Data Container Edition.

## Disaster recovery

Disaster recovery can become a necessity if a region experiences a significant failure that includes the potential loss of data.
Recovery can be accomplished by deploying into multiple regions or installing in a new region if an existing instance becomes unavailable.
See [Backup and Recovery](../../management/backup-and-recovery) for more information on data recovery.
