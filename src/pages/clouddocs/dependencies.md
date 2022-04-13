---

copyright:
  years: 2020
lastupdated: "2020-04-01"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Dependencies on other IBM Cloud services

Review the IBM Cloud services that Annotator for Clinical Data connects to over the public network.

| Service name | Description|
| -----------|-------------------------------|
| Cloud Object Store (COS)|This service is used to store tenant-isolated configuration artifacts such as annotator flows, profiles, and other artifacts deployed via a cartridge. Access to this service instance is protected by IAM policies. All data is encrypted in transit and at rest.|
| Identity and Access Management (IAM) | To authenticate requests to the service and authorize user actions, Annotator for Clinical Data implements service access roles in Identity and Access Management (IAM).|
| IBM Cloud Log Analysis | Annotator for Clinical Data  sends service logs to IBM Cloud Log Analysis. These logs are monitored and analyzed by the service team to detect and troubleshoot service issues.|
| IBM Cloud Logging and Monitoring | Annotator for Clinical Data sends service metrics to IBM Cloud Logging and Monitoring. These metrics are monitored by the service team to identify capacity and performance issues of the service.|
| {{site.data.keyword.cloudaccesstraillong_notm}} | Annotator for Clinical Data integrates with IBM Cloud Activity Tracker to forward audit events to the IBM Cloud Activity Trackerservice. For more information, see [IBM Cloud Activity Tracker events](/docs/wh-acd?topic=wh-acd-at_events). |
| {{site.data.keyword.containershort_notm}} | The Annotator for Clinical Data service runs in an {{site.data.keyword.containerlong_notm}} cluster and leverages the built-in security, high availability, and self-healing capabilities of the service. |
| {{site.data.keyword.registrylong_notm}} | This service is used to store the container images that Annotator for Clinical Data uses to run the service. |
| {{site.data.keyword.cloudcerts_short}} | This service is used to store and manage the TLS certificates for the Annotator for Clinical Data domains. |
| {{site.data.keyword.cis_short}} | This service is used to provide the global load balancer and firewall for Annotator for Clinical Data |
| {{site.data.keyword.keymanagementservicelong_notm}} | Annotator for Clinical Data uses root keys in {{site.data.keyword.keymanagementserviceshort}} to create data encryption keys (DEK). The DEK is then used to encrypt configuration data stored in Cloud Object Store |
