---

copyright:
  years: 2019, 2020
lastupdated: "20120-04-10"

keywords: annotator clinical data, disaster recovery, disaster, recovery

subcollection: wh-acd

---

# High availability and disaster recovery

The IBM Watson Anntator for Clinical Data service is highly available within an IBM Cloud region. Disruption in the network connectivity may happen when a cloud region is down. Recovering from potential disasters that affect an entire region requires planning and preparation. Thus, instance owners need to have recovery plans based on their use cases.

The instance owner is [responsible](/docs/overview?topic=overview-shared-responsibilities) for understanding the configuration, customization, and usage of the service. See [Disaster recovery](/docs/wh-acd?topic=wh-acd-troubleshoot#troubleshoot_deploy_timeout) for further details.

## High availability

Anntator for Clinical Data is hosted in the [Dallas and Washington regions](/docs/resources?topic=resources-services_region#services_region). Traffic to any instance is load-balanced across multiple [data centers](/docs/overview?topic=overview-zero-downtime#zero-downtime).

## Disaster recovery

Disaster recovery can become a necessity if an IBM Cloud region experiences a significant failure that includes the potential loss of data.

Disaster recovery can be accomplished by either provisioning an instance of the service in multiple regions or provisioning an instance in a new region if an existing region becomes unavailable. The URL and API key for the new region need to be provided to the solution accessing the service to complete the recovery from one region to another.

IBM Cloud is responsible for maintaining backups and high availability of the {{site.data.keyword.wh-acd_short}} service in each supported region. User-defined configuration artifacts such as annotator flows, profiles, and cartridges are isolated by region. You can implement manual failover to another region by creating and maintaining copies of your configuration artifacts in another IBM Cloud region.

Review [Responsibilities for Anntator for Clinical Data](/docs/wh-acd?topic=wh-acd-responsibilities) for details on IBM Cloud and user responsiblities regarding disaster recovery and failover.

### Detecting a location outage

The IBM Watson Anntator for Clinical Data service provides a [health check API](/apidocs/wh-acd#health-check) that can be called repeatedly to ensure the service is available. Successive internal service error responses from the API could be used as indicator that the service is no longer available in a specific location.
