---

copyright:
  years: 2016, 2020
lastupdated: "2020-09-14"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd
---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:codeblock: .codeblock}
{:pre: .pre}
{:screen: .screen}
{:tip: .tip}
{:download: .download}
{:table: .aria-labeledby="caption"}

# Service Endpoints
{: #endpoints}

{{site.data.keyword.cloud_notm}} provides connectivity options for accessing cloud services using service endpoints.

When you provision an instance of {{site.data.keyword.wh-acd_short}} you can chose to access the service using the public internet which is the default setting or using the {{site.data.keyword.cloud_notm}} private network.

## Public network endpoints
{: #public_endpoints}

Public network endpoints provide connectivity to your {{site.data.keyword.wh-acd_short}} instance over the public network.  Your environment needs to have internet access to connect to the provisioned instance.

## Private network endpoints
{: #private_endpoints}

Private network endpoints provide connectivity to your {{site.data.keyword.wh-acd_short}} instance over the {{site.data.keyword.cloud_notm}} private network.  Your {{site.data.keyword.wh-acd_short}} instance can be configured to use only a private endpoint, only a public endpoint or it can be configured to support both.

## Adding a private network endpoint

You add a private endpoint to a paid service instance from the service details page if you have a Manager or Writer service access role.

1.  Go to your [Resource list](https://{DomainName}/resources){: external}.
1.  Click the name of a service instance that is on a premium plan. Lite plans do not support private network endpoints.
1.  In the service details page, click the **Manage** tab.
1.  Click **Add private network endpoint**.

## Disabling a public or private endpoint

You can disable the public or private endpoint from the service details page if you have a Manager or Writer service access role and both types of endpoints are currently enabled for the instance. 

1.  Go to your [Resource list](https://{DomainName}/resources){: external}.
1.  Click the name of a service instance that is on a premium plan. Lite plans do not support private network endpoints.
1.  In the service details page, click the **Manage** tab.
1.  In the Endpoints panel, select the endpoint you wish to disable, and click the button to **disable** the endpoint.

## Viewing your endpoint URL

The service endpoint URLs are different for private and public network endpoints. You can view the URL for an endpoint from the service details page.

1.  Go to your [Resource list](https://{DomainName}/resources){: external}.
1.  Click the name of a service instance that has a private network endpoint.
1.  In the service details page, click the **Manage** tab, and then click **Private Network Endpoint**.

## Using a private endpoint

Configure your application to connect to your {{site.data.keyword.wh-acd_short}} instance using the private endpoint https://api.private.us-south.wh-acd.cloud.ibm.com/ to make API calls.

An example API call using the private endpoint:
```sh
https://api.private.us-south.wh-acd.cloud.ibm.com/wh-acd/api/v1/flows
```
