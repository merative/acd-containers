---
title: "Software Development Kits"
excerpt: "Software Development Kits"
categories: usage
slug: sdks
toc: true
---

IBM Watson Annotator for Clinical Data has software development kits (SDK) in multiple languages for interacting with the ACD Service REST APIs, or to directly call the APIs, see the examples in the exported PDF documentation for <span><a aria-current="" to="https://merative.github.io/acd-containers/apidocs/index.html?shell" href="https://merative.github.io/acd-containers/apidocs/index.html?shell" rel="noopener noreferrer" target="_blank" class="LeftNav-module--outboundLink">curl</a><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path><path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path></svg></span>.

To authenticate to IBM Watson Annotator for Clinical Data Container Edition, you pass a **bearer token** in the credentials.  If you have provided secure access to your ACD service instance via the Openshift OAuth service (see [Managing Access to ACD](/security/manage-access/)), you will use the token that you created on the service account as your bearer token.  For access to an unsecured ACD service instance, the bearer token used for the credentials can be a dummy token.  

## Annotator for Clinical Data SDKs in Github

Find details about installing and using the SDKs.

- [Java SDK](https://github.com/merative/whcs-java-sdk)
  - See examples provided in the API Reference for <span><a aria-current="" to="https://merative.github.io/acd-containers/apidocs/index.html?java" href="https://merative.github.io/acd-containers/apidocs/index.html?java" rel="noopener noreferrer" target="_blank" class="LeftNav-module--outboundLink">Java</a><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path><path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path></svg></span>. See also the Java SDK [javadoc](https://merative.github.io/whcs-java-sdk/docs/latest/).

- [Python SDK](https://github.com/merative/whcs-python-sdk)
  - See examples provided in the API Reference for <span><a aria-current="" to="https://merative.github.io/acd-containers/apidocs/index.html?python" href="https://merative.github.io/acd-containers/apidocs/index.html?python" rel="noopener noreferrer" target="_blank" class="LeftNav-module--outboundLink">Python</a><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13,14H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h5v1H3v10h10V8h1v5C14,13.6,13.6,14,13,14z"></path><path d="M10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z"></path></svg></span>.

## Examples

In the following examples, replace:

- `{version}` is the ACD Service API version, e.g. 2021-06-01
- `{url}` is either:
  - OAuth proxy route URL if secured access, e.g. https://proxy-ibm-wh-acd-oauth-proxy.apps.youserver.com/services/clinical_data_annotator/api
  - Direct route URL if unsecured, e.g. https://route-acd-route.apps.youserver.com/services/clinical_data_annotator/api
- `{token}` is either:
  - bearer token of OAuth proxy route, e.g. `edJhb......M1g`
  - dummy token, e.g. `dummy`

### Java SDK

#### Authentication

```
import com.ibm.cloud.sdk.core.security.BearerTokenAuthenticator;
import com.ibm.watson.health.acd.v1.AnnotatorForClinicalData;

AnnotatorForClinicalData acdService = new AnnotatorForClinicalData({version},
				"AnnotatorForClinicalData", new BearerTokenAuthenticator({token}));
acdService.setServiceUrl({url});
```

#### Authentication and Disabling SSL Verification (not recommended)

```
import com.ibm.cloud.sdk.core.security.BearerTokenAuthenticator;
import com.ibm.watson.health.acd.v1.AnnotatorForClinicalData;
import com.ibm.cloud.sdk.core.http.HttpConfigOptions;

AnnotatorForClinicalData acdService = new AnnotatorForClinicalData({version},
                                "AnnotatorForClinicalData", new BearerTokenAuthenticator({token}));
acdService.setServiceUrl({url});
HttpConfigOptions options = new HttpConfigOptions.Builder().disableSslVerification(true).build();
acdService.configureClient(options);
```

### Python SDK

#### Authentication

```
from ibm_cloud_sdk_core.authenticators import BearerTokenAuthenticator
import ibm_whcs_sdk.annotator_for_clinical_data as acd

acd_service = acd.AnnotatorForClinicalDataV1(
    authenticator=BearerTokenAuthenticator(bearer_token={token}),
    version={version}
    )
acd_service.set_service_url({url})
```

#### Authentication and Disabling SSL Verification (not recommended)

```
from ibm_cloud_sdk_core.authenticators import BearerTokenAuthenticator
import ibm_whcs_sdk.annotator_for_clinical_data as acd

acd_service = acd.AnnotatorForClinicalDataV1(
    authenticator=BearerTokenAuthenticator(bearer_token={token}),
    version={version}
    )
acd_service.set_service_url({url})
acd_service.set_disable_ssl_verification(True)
```
