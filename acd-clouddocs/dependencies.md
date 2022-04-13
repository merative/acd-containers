---

copyright:
  years: 2020
lastupdated: "2020-04-01"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:important: .important}
{:note: .note}
{:deprecated: .deprecated}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}


# Dependencies on other {{site.data.keyword.cloud_notm}} services
{: #dependencies-ibmcloud}

Review the {{site.data.keyword.cloud_notm}} services that {{site.data.keyword.wh-acd_short}} connects to over the public network.
{: shortdesc}

| Service name | Description|
| -----------|-------------------------------|
|{{site.data.keyword.cos_short}} (COS)|This service is used to store tenant-isolated configuration artifacts such as annotator flows, profiles, and other artifacts deployed via a cartridge. Access to this service instance is protected by IAM policies. All data is encrypted in transit and at rest.|
| Identity and Access Management (IAM) | To authenticate requests to the service and authorize user actions, {{site.data.keyword.wh-acd_short}} implements service access roles in Identity and Access Management (IAM).|
| {{site.data.keyword.la_full_notm}} | {{site.data.keyword.wh-acd_short}} sends service logs to {{site.data.keyword.la_full_notm}}. These logs are monitored and analyzed by the service team to detect and troubleshoot service issues.|
| {{site.data.keyword.mon_full_notm}} | {{site.data.keyword.wh-acd_short}} sends service metrics to {{site.data.keyword.mon_full_notm}}. These metrics are monitored by the service team to identify capacity and performance issues of the service.|
| {{site.data.keyword.cloudaccesstraillong_notm}} | {{site.data.keyword.wh-acd_short}} integrates with {{site.data.keyword.at_full_notm}} to forward audit events to the {{site.data.keyword.at_full_notm}} service. For more information, see [{{site.data.keyword.cloudaccesstraillong_notm}} events](/docs/wh-acd?topic=wh-acd-at_events). |
| {{site.data.keyword.containershort_notm}} | The {{site.data.keyword.wh-acd_short}} service runs in an {{site.data.keyword.containerlong_notm}} cluster and leverages the built-in security, high availability, and self-healing capabilities of the service. |
| {{site.data.keyword.registrylong_notm}} | This service is used to store the container images that {{site.data.keyword.wh-acd_short}} uses to run the service. |
| {{site.data.keyword.cloudcerts_short}} | This service is used to store and manage the TLS certificates for the {{site.data.keyword.wh-acd_short}} domains. |
| {{site.data.keyword.cis_short}} | This service is used to provide the global load balancer and firewall for {{site.data.keyword.wh-acd_short}} |
| {{site.data.keyword.keymanagementservicelong_notm}} | {{site.data.keyword.wh-acd_short}} uses root keys in {{site.data.keyword.keymanagementserviceshort}} to create data encryption keys (DEK). The DEK is then used to encrypt configuration data stored in {{site.data.keyword.cos_short}} |
