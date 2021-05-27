---
title: "Getting started with the ACD Service"
excerpt: "Getting started with the ACD Service."
categories: management
slug: getting-started
toc: true
---

To get started using the ACD service, see the [IBM Cloud API docs](https://cloud.ibm.com/apidocs/wh-acd) and examples. The REST APIs can be called directly or with one of the SDKs provided as documented in the API documentation.

ACD provides a set of predefined cartridges (ACD flow and profile configuration) as published [here](https://github.com/IBM/wh-acd-cartridges). Add the cartridges to your ACD deployment for reference and use as example configuration.

The following steps are for the [Clinical Insights](https://cloud.ibm.com/docs/wh-acd?topic=wh-acd-clinical_insights_overview#clinical_insights_overview) cartridge.

#### 1. Download the zip of the [wh_acd.ibm_clinical_insights_v1.0](https://github.com/IBM/wh-acd-cartridges/blob/master/cartridges/wh_acd.ibm_clinical_insights_v1.0.zip).

#### 2. Port-forward to connect to an ACD pod.

List the pod names.

```
oc get pod -n ${acd_namespace} | grep ibm-wh-acd
```

Port-forward to an ACD pod. **Note that only an admin can do the port-forward and access the pods through localhost.**

```
oc port-forward ${pod_name} -n ${acd_namespace} 9443:9443
```

#### 3. Use curl to deploy the cartridge.

```
curl -k -X POST \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges?version=2020-09-29' \
    --header 'Content-Type: application/octet-stream' \
    --header 'Accept: application/json' \
    --header 'X-Watson-UserInfo: bluemix-instance-id=__ibm_supertenant__' \
    --data-binary @<cartridge.zip>
```

Use POST to create it the first time, or PUT to update it later.

The example shows the default `X-Watson-UserInfo` header applied when no authentication header is set for ACD, such as when an authorization proxy is not used.

Remove and don't set the `X-Watson-UserInfo` header if deploying a custom cartridge since that header will create the cartridge under the default supertenant account.

Use GET on the returned `statusLocation` to get status of the POST or PUT command.

```
curl -k -X GET \
    --header 'Accept: application/json' \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges/wh_acd.ibm_clinical_insights_v1.0?version=2021-03-15'
```

#### 4. Use the ACD APIs to get flows and post to analyze to analyze text.

Replace <route_host> with the hostname.

You may need to provide a different authentication header if you have a security proxy configured in front of ACD on a route.

`--header 'Authorization: Bearer sha256~mfoB1wV0xxxxxxxxxxxxxxx'`

The user header format may differ. Change it to match what was used for the authentication proxy user, such as:

`--header 'X-Forwarded-User:<user>'`

Use GET to view the flows.

```
curl -X GET \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer sha256~mfoB1wV0xxxxxxxxxxxxxxx' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/flows?version=2021-03-15'
```

Use POST to analyze text.

```
curl -X POST \
    --header 'Content-Type: text/plain' \
    --header 'Accept: application/json' \
    --header 'X-Forwarded-User:<user>' \
    --header 'Authorization: Bearer sha256~mfoB1wV0xxxxxxxxxxxxxxx' \    
    -d 'Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan.' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/analyze/wh_acd.ibm_clinical_insights_v1.0_standard_flow?version=2020-03-31'
```
