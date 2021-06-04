---
title: "Getting started with the ACD Service"
excerpt: "Getting started with the ACD Service."
categories: management
slug: getting-started
toc: true
---

To get started using the ACD service, see the [IBM Cloud API docs](https://cloud.ibm.com/apidocs/wh-acd) and examples. The REST APIs can be called directly or with one of the SDKs provided as documented in the API documentation.

### Deploying and updating the ACD provided cartidges

ACD provides a set of predefined cartridges (ACD flow and profile configuration) as published [here](https://github.com/IBM/wh-acd-cartridges). Add the cartridges to your ACD deployment for reference and use as example configuration.  These provided cartrides are built using a reserved prefix and need to be placed into a special supertenant tenant storage location in the ACD configuration store and are available as read-only configurations to all tenants of the ACD instance.  An administrator can deploy or updated these by specifying this tenant on a direct call to an acd container as documented below.

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
    --data-binary @wh_acd.ibm_clinical_insights_v1.0.zip
```

Use POST to create it the first time, or PUT to update it later.

The example shows the default `X-Watson-UserInfo` header to specify the supertenant tenant id required to deploy or change these ACD provided cartridges to the shared tenant configuration location. This is the default header and format used by ACD if no Tenant header (tenantHeader) value was set in the ACD deployment to support tenant isolation use that header and remove the bluemix-instance-id prefix.  If you set a Tenant header value on the ACD instance you will use that header instead.  For example, if using the OAuth proxy header with tenancy:

```
curl -k -X POST \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges?version=2020-09-29' \
    --header 'Content-Type: application/octet-stream' \
    --header 'Accept: application/json' \
    --header 'X-Forwarded-User: __ibm_supertenant__' \
    --data-binary @wh_acd.ibm_clinical_insights_v1.0.zip
```

Note this __ibm_supertenant__ is only required when deploying the ACD provided cartridges.

**Deploying custom cartridges**
If you are deploying a custom cartridge rather than an ACD provided catridge you would remove this header completely to have it placed into the defaultTenant configuration location or if you are using ACD multitenancy (which requires a security proxy) you should deploy and update your custom cartridges through the proxy route using the bearer token for the tenant and not use a port forward direct to an ACD container at all for deploying custom catridges.

After the POST or PUT comes back look at the returned JSON structure for a statusLocation field.
Use GET on the returned `statusLocation` to get status of the POST or PUT of the cartridge.

```
curl -k -X GET \
    --header 'Accept: application/json' \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges/wh_acd.ibm_clinical_insights_v1.0?version=2021-03-15'
```

#### 4. Use the ACD APIs to get flows and post to analyze to analyze text.

Test ACD apis to verify the cartridge was deployed using an externalized route to the ACD service.  In the examples below replace <route_host> with the hostname and path to the externalized route to ACD or if you have a security proxy configured in fornt of ACD use that route instead and use the `--header 'Authorization: Bearer xxxxxxxxxxxxxxx'` header as required for the proxy.

Get the flows:

```
curl -X GET \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer xxxxxxxxxxxxxxx' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/flows?version=2021-03-15'
```

Use POST to analyze text:

```
curl -X POST \
    --header 'Content-Type: text/plain' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer xxxxxxxxxxxxxxxxxx' \
    -d 'Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan.' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/analyze/wh_acd.ibm_clinical_insights_v1.0_standard_flow?version=2020-03-31'
```
