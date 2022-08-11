---
title: "Getting started with the ACD Service"
excerpt: "Getting started with the ACD Service."
categories: management
slug: getting-started
toc: true
---

The ACD service provides a robust set of REST APIs to generate clinical annotations over text and interact with persisted analytic artifacts.  To get started using the ACD service, see the Cloud API docs and examples for <span><a aria-current="" to="https://merative.github.io/acd-containers/apidocs/index.html?shell" href="https://merative.github.io/acd-containers/apidocs/index.html?shell" rel="noopener noreferrer" target="_blank" class="LeftNav-module--outboundLink">curl</a><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path><path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path></svg></span>. The ACD Service REST APIs can be called directly or with the [IBM Watson Annotator for Clinical Data Software Development Kits (SDKs)](/usage/sdks/).

### Deploying and updating the ACD-provided cartridges

ACD provides a set of predefined cartridges (containing ACD flow and profile configuration) as published [here](https://github.com/merative/acd-cartridges). Add the cartridges to your ACD deployment for reference and use as example configuration.  These provided cartrides are built using a reserved prefix and need to be placed into a special supertenant tenant storage location in the ACD configuration store and are available as read-only configurations to all tenants of the ACD instance.  An administrator can deploy or update these predefined cartridges by specifying this supertenant tenant id on a direct call to an ACD container as documented below.

The following steps are for the [Clinical Insights](/clouddocs/clinical_insights_overview/) cartridge.

#### 1. Download the zip of the [wh_acd.ibm_clinical_insights_v1.0](https://github.com/merative/wh-acd-cartridges/blob/master/cartridges/wh_acd.ibm_clinical_insights_v1.0.zip).

#### 2. Port-forward to connect to an ACD pod.

List the pod names.

```
oc get pod -n ${acd_namespace} | grep ibm-wh-acd-acd
```

Port-forward to an ACD pod. **Note that only an admin can do the port-forward and access the pods through localhost.**

```
oc port-forward ${pod_name} -n ${acd_namespace} 9443:9443
```

The terminal should hang here waiting to accept network traffic on the localhost port 9443.  Open a new terminal window to run the following steps.

#### 3. Use curl to deploy the cartridge.

In a new terminal window, run one of the following commands to deploy the cartridge.  Be sure to be in the directory where the cartridge zip file was downloaded to.

```
curl -k -X POST \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges?version=2020-09-29' \
    --header 'Content-Type: application/octet-stream' \
    --header 'Accept: application/json' \
    --header 'X-Watson-UserInfo: bluemix-instance-id=__ibm_supertenant__' \
    --data-binary @wh_acd.ibm_clinical_insights_v1.0.zip
```

**NOTE:** Use POST to create it the first time, or PUT to update a previously deployed or partially deployed cartridge.

The command above uses the default `X-Watson-UserInfo` header to specify the supertenant tenant id required to deploy or update these provided cartridges to the shared tenant configuration location. This is the default header and format used by ACD if no Tenant header (tenantHeader) value was set in the ACD deployment to support tenant isolation.   If you set a Tenant header value on the ACD instance you will use that header instead.  Using the OAuth proxy and multitenancy configuration with the X-Forwarded-User value as the tenantHeader you'd use this command instead with a different header.

```
curl -k -X POST \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges?version=2020-09-29' \
    --header 'Content-Type: application/octet-stream' \
    --header 'Accept: application/json' \
    --header 'X-Forwarded-User: __ibm_supertenant__' \
    --data-binary @wh_acd.ibm_clinical_insights_v1.0.zip
```

Note this **ibm_supertenant** is only required when deploying the provided cartridges which are shared across tenants.  Note also if you change the instance to add the OAuth proxy for authentication and mutitenancy later, you do not need to redeploy the clinical insights cartridge. If you update the instance later you will need to use the `X-Forwarded-User` header with a PUT command on curl, however.

**Deploying custom cartridges**
If you are deploying a custom cartridge rather than an ACD-provided cartridge, you would remove this header completely to have it placed into the defaultTenant configuration location, or if you are using ACD multitenancy (which requires a [security proxy](../../security/manage-access)), you should deploy and update your custom cartridges for each application (i.e. tenant) through the proxy route using the bearer token for the tenant and not use a port forward direct to an ACD container at all for deploying custom cartridges.

After the POST or PUT comes back, look at the returned JSON structure for a statusLocation field.
Use GET on the returned `statusLocation` to get status of the POST or PUT of the cartridge.

```
curl -k -X GET \
    --header 'Accept: application/json' \
    'https://localhost:9443/services/clinical_data_annotator/api/v1/cartridges/wh_acd.ibm_clinical_insights_v1.0?version=2021-03-15'
```

#### 4. Use the ACD APIs to get flows and post to analyze to analyze text.

Test ACD APIs to verify the cartridge was deployed using an externalized route to the ACD service.  In the examples below replace <route_host> with the hostname and path to the externalized route to ACD, or if you have a security proxy configured in front of ACD use that route instead and use the `--header 'Authorization: Bearer xxxxxxxxxxxxxxx'` header as required for the proxy.  If testing directly to a pod via port fowarding use localhost:9443 as the route host.  The -k option ignores the ssl cert and should be removed if you have a valid certificate on your route.

Get the flows:

```
curl -k -X GET \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer xxxxxxxxxxxxxxx' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/flows?version=2021-03-15'
```

Use POST to analyze text:

```
curl -k -X POST \
    --header 'Content-Type: text/plain' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer xxxxxxxxxxxxxxxxxx' \
    -d 'Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan.' \
    'https://<route_host>/services/clinical_data_annotator/api/v1/analyze/wh_acd.ibm_clinical_insights_v1.0_standard_flow?version=2020-03-31'
```
