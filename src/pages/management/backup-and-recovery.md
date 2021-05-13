---
title: "Backup and Recovery"
excerpt: "Configure your ACD installation."
categories: management
slug: backup-and-recovery
toc: true
---

ACD stores configuration data in either an object bucket (eg: S3  IBM COS) or on a Persistent Volume Claim
from a Persistent Volume (eg: a NFS file share) that was configured when the ACD operand was created.
Users of ACD set and edit this configuration through the apis to deploy cartridges, set custom profiles and flow, etc.
If you are deploying custom configuration data,  you should setup backups of this storage to enable recovery should the
storage where this is stored become corrupted or unavailable or to recover from user actions.  How often you create these
backups and how many you store or create depends on the [recovery point objectives (RPO)](https://www.ibm.com/services/business-continuity/rpo) for your backup and recovery processes.
For example you may want to configure daily backups and storing 30 days of backups to enable recovery to a point in the last month with a potential to loose less than the last days worth of configuration data.
Store these backups in a different location(s) and test your restore procedures periodically.  This will enable an IT admin based recovery in the event of a disaster.
In addition, since ACD configuration is usually done via cartridges users of ACD should be encouraged to version and store their cartridges outside of ACD as well to enable self-recovery.
For example the provided out of the box cartridges are stored in github so you can always recover those by pulling from github and deploying it again.
