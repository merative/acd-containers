---
title: "Getting started with the ACD Service"
excerpt: "Getting started with the ACD Service."
categories: management
slug: getting-started
toc: true
---

To use the ACD service, deploy a sample cartridge that provides a predefined [Clinical Insights](https://cloud.ibm.com/docs/wh-acd?topic=wh-acd-clinical_insights_overview#clinical_insights_overview) annotator flow. Two sample cartridges are published [here](https://github.com/IBM/wh-acd-cartridges).

#### 1. Download the zip of the [wh_acd.ibm_clinical_insights_v1.0](https://github.com/IBM/wh-acd-cartridges/blob/master/cartridges/wh_acd.ibm_clinical_insights_v1.0.zip).

#### 2. Use curl to deploy the cartridge.

```
curl -k -X POST \
    'https://<route_host>/services/clinical_data_annotator/api/v1/cartridges?version=2020-09-29' \
    --header 'Content-Type: application/octet-stream' \
    --header 'Accept: application/json' \
    --header 'X-Watson-UserInfo: bluemix-instance-id=__ibm_supertenant__' \
    --data-binary @<cartridge.zip>
```

Use POST to create it the first time, or PUT to update it later.

The example shows the default `X-Watson-UserInfo` header applied when no authentication header is set for ACD, such as when an authorization proxy is not used.

When using an authentication header with a proxy, then the format differs for a specific header. Change the `X-Forwarded-User` to match what was used for the authentication proxy user.

`--header 'X-Forwarded-User: __ibm_supertenant__'`

Remove and don't set the `X-Watson-UserInfo` header if deploying a custom cartridge since that header will create the cartridge under the default supertenant account.

Use GET on the returned statusLocation to get status of the POST or PUT command.

```
curl -X GET \
    --header 'Accept: application/json' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/cartridges/wh_acd.ibm_clinical_insights_v1.0?version=2021-03-15'
```

#### 3. Use the ACD APIs to get flows and post to analyze to analyze text. Replace {url} with the hostname.

```
curl -X GET \
    --header 'Accept: application/json' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/flows?version=2021-03-15'

curl -X POST \
    --header 'Content-Type: text/plain' \
    --header 'Accept: application/json' \
    -d 'Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan.' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/analyze/wh_acd.ibm_clinical_insights_v1.0_standard_flow?version=2020-03-31'
```
