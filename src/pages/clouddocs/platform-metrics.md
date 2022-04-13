---

copyright:
  years: 2020
lastupdated: "2020-11-30"

keywords: monitoring, platform metrics, observability page

subcollection: wh-acd

---

# IBM Cloud Monitoring integration

IBM CLoud is a cloud-native and container-intelligent management system that you can include as part of your IBM Cloud architecture. Use it to gain operational visibility into the performance and health of your applications, services, and platforms. It offers administrators, DevOps teams, and developers full-stack telemetry with advanced features to monitor and troubleshoot, define alerts, and design custom dashboards. 

Currently, IBM Cloud integration is available for Annotator for Clincal Data deployments according to the following table:

Deployment Region | IBM Cloud Region
----------|-----------
`Dallas` | `Dallas`
`Washington DC` | `Washington DC`
Table 1. Monitoring regions

## Platform metrics overview

You can configure only one instance of the IBM Cloud Logging and Monitoring service per region to collect platform metrics.
* To configure the Monitoring instance, you must turn on the *platform metrics* configuration setting.
* If a Monitoring instance in a region is already enabled to collect platform metrics, metrics from enabled services are collected automatically and available for monitoring through this instance. For more information about enabled instances, see [IBM Cloud services](https://www.ibm.com/cloud/services).

To monitor platform metrics, check that the IBM Cloud Logging and Monitoring service instance is provisioned in the same region where the IBM lLoud instance is provisioned.

## Enabling platform metrics from the IBM Cloud Logging and Monitoring service dashboard

Complete the following steps to configure platform metrics:

1. Log in to IBM Cloud.

    The IBM Cloud dashboard opens.

2. Click **View all** in the Resource summary section of the dashboard.

3. In the *Services* section, click the IBM Cloud instance that you plan to monitor.

    The IBM Cloud UI *Manage* page opens.

4. Click **Actions** > **Add monitoring** to configure *platform metrics* in the region of your IBM Cloud instance.

    If the menu choices include the **Monitoring** option, then your instance is already configured for platform metrics.

6. Provision an instance of the IBM Cloud Logging and Monitoring service service.

   After you provision the Monitoring instance, the *Observabvility* page opens. To continue working with IBM Cloud, go back to the IBM Cloud UI.

## Viewing metrics

To monitor Annotator for Clinical Data Service metrics, you must launch the Monitoring web UI instance that is enabled for platform metrics in the region where your {{site.data.keyword.cloud_notm}} instance is available.

There are different options to launch the Monitoring web UI and monitor metrics that are described in the following section.

### Launching Monitoring web UI from the Annotator for Clinical Data Service dashboard

Complete the following steps to launch the Monitoring web UI from the {{site.data.keyword.cloud_notm}} dashboard:

1. Log in to {{site.data.keyword.cloud_notm}}.

   The {{site.data.keyword.cloud_notm}} dashboard opens.

2. Click **View all** in the Resource summary section of the dashboard.

3. In the *Services* section, click the {{site.data.keyword.wh-acd_short}} instance that you plan to monitor.

   The {{site.data.keyword.wh-acd_short}} *Manage* page opens.

4. Click the **Actions** menu, and select **Monitoring**.

   A new tab in your browser opens and displays the *Default* dashboard named ** {{site.data.keyword.wh-acd_short}} ** within the context of your {{site.data.keyword.wh-acd_short}} instance.

### Launching Monitoring web UI from the Observability page

Complete the following steps to launch the Monitoring web UI from the *Observability* page:

1. [Launch the Monitoring web UI](/docs/monitoring?topic=monitoring-launch).
2. Click **DASHBOARDS**.
3. In the **Default Dashboards** section, expand **{{site.data.keyword.IBM_notm}}**.
4. Choose the {{site.data.keyword.wh-acd_short}} dashboard from the list.

   To access your deployment's Monitoring dashboard, it's in the sidebar, under {{site.data.keyword.IBM_notm}}.

   Next, change the scope or make a copy of the *Default* dashboard to monitor an {{site.data.keyword.wh-acd_short}} instance.

## Monitoring {{site.data.keyword.wh-acd_short}}

Consider the following tasks when you monitor your account in the {{site.data.keyword.wh-acd_short}} service:

| Task                                      | Predefined alert | What to look for  |
|-------------------------------------------|------------------|-------------------|
| Monitor the occurrence of 4xx errors. | Frequent 4xx Responses | When 4xx errors occur, there's an issue on the client side in sending data to {{site.data.keyword.wh-acd_short}} for analysis. Check your application settings to ensure you're using the proper endpoint, credentials, http headers, etc. |
| Monitor the occurrence of 5xx errors. | Frequent 5xx Responses | When 5xx errors occur, there's an issue with the service whereby it cannot successfully process input. These errors are usually temporary, but may require switching over to another region in the event of a severe regional outage. See [Disaster recovery](/docs/wh-acd?topic=wh-acd-troubleshoot#troubleshoot_deploy_timeout) for further details. |
| Monitor the occurrence of slow response time averages. | Slow Response Time Averages | An increase in average response times could result from additional annotators being deployed for analysis, an increase in the amount of data being analyzed, or increased service traffic at the time of analysis. |
Table 1. Pre-defined alerts

## Annotator for Clinical Data Service Predefined Dashboards

The following table outlines the pre-defined dashboards that you can use to monitor {{site.data.keyword.wh-acd_short}} metrics:

| Dashboard name        | Description    |
|-----------------------|----------------|
| `Annotator for Clinical Data Service` | Dashboard visualizing important {{site.data.keyword.wh-acd_short}} metrics. |
Table 2. Pre-defined dashboards

The *Default* dashboard can't be changed. You can copy the dashboard so that you can make changes to suit your requirements.

When you start your dashboard, some metrics might display a `Data Load Error` warning icon. This warning is because not enough time has elapsed to create the data. When data is available, the warning sign goes away and the metric is populated.

## Metrics available by Service Plan

| Metric Name |
|-----------|
| [API call time](#ibm_clinical_data_annotator_api_time_seconds) |
| [API request size](#ibm_clinical_data_annotator_api_request_size_bytes) |
| [Number of API calls](#ibm_clinical_data_annotator_api_calls_count) |
Table 1: Metrics Available by Plan Names

### API call time

The time of an API call in seconds

| Metadata | Description |
|----------|-------------|
| `Metric Name` | `ibm_clinical_data_annotator_api_time_seconds`|
| `Metric Type` | `gauge` |
| `Value Type`  | `second` |
| `Segment By` | `Service instance, API Resource, HTTP verb` |
Table 2: API call time metric metadata

### API request size

The size of the API request payload in bytes

| Metadata | Description |
|----------|-------------|
| `Metric Name` | `ibm_clinical_data_annotator_api_request_size_bytes`|
| `Metric Type` | `gauge` |
| `Value Type`  | `byte` |
| `Segment By` | `Service instance, API Resource, HTTP verb` |
Table 3: API request size metric metadata

### Number of API calls

The total number of calls for an API in ACD

| Metadata | Description |
|----------|-------------|
| `Metric Name` | `ibm_clinical_data_annotator_api_calls_count`|
| `Metric Type` | `counter` |
| `Value Type`  | `none` |
| `Segment By` | `Service instance, API Resource, HTTP verb, API return code` |
Table 4: Number of API calls metric metadata

## Attributes for Segmentation

### Global Attributes

The following attributes are available for segmenting all of the metrics listed above

| Attribute | Attribute Name | Attribute Description |
|-----------|----------------|-----------------------|
| `Cloud Type` | `ibm_ctype` | The cloud type is a value of public, dedicated or local |
| `Location` | `ibm_location` | The location of the monitored resource - this may be a region, data center or global |
| `Scope` | `ibm_scope` | The scope is the account, organization or space GUID associated with this metric |
| `Service name` | `ibm_service_name` | Name of the service generating this metric |

### Additional Attributes

The following attributes are available for segmenting one or more attributes as described in the reference above.  Please see the individual metrics for segmentation options.

| Attribute | Attribute Name | Attribute Description |
|-----------|----------------|-----------------------|
| `API Resource` | `ibm_acd_api_resource` | The resource portion of the URI on the API call |
| `API return code` | `ibm_acd_api_rc` | The API return code of the API request |
| `HTTP verb` | `ibm_acd_api_verb` | The HTTP verb of the API request |
| `Service instance` | `ibm_service_instance` | The service instance segment identifies the instance the metric is associated with |
