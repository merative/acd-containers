---
title: "Software Development Kits"
excerpt: "Software Development Kits"
categories: usage
slug: sdks
toc: true
---

IBM Watson Annotator for Clinical Data has software development kits (SDK) in multiple languages for interacting with the ACD Service REST APIs.

To authenticate to IBM Watson Annotator for Clinical Data Container Edition, you pass a **bearer token** in the credentials.  If you have provided secure access to your ACD service instance via the Openshift OAuth service (see [Managing Access to ACD](https://ibm.github.io/acd-containers/security/manage-access/)), you will use the token that you created on the service account as your bearer token.  

## Annotator for Clinical Data SDKs in Github

Find details about installing and using the SDKs. 
 
- [Java SDK](https://github.com/IBM/whcs-java-sdk)

- [Python SDK](https://github.com/IBM/whcs-python-sdk)

- [Node SDK](https://github.com/IBM/whcs-node-sdk)

- [Go SDK](https://github.com/IBM/whcs-go-sdk)

## Examples

In the following examples, replace:
- `{version}` with ACD Service API version, e.g. 2021-06-01
- `{url}` with URL of OAuth proxy route, e.g. https://proxy-ibm-wh-acd-oauth-proxy.apps.youserver.com/services/clinical_data_annotator/api
- `{token}` with bearer token, e.g. edJhb......M1g

### Java SDK Authentication

```
import com.ibm.cloud.sdk.core.security.BearerTokenAuthenticator;
import com.ibm.watson.health.acd.v1.AnnotatorForClinicalData;

AnnotatorForClinicalData acdService = new AnnotatorForClinicalData({version},
				"AnnotatorForClinicalData", new BearerTokenAuthenticator({token}));
acdService.setServiceUrl({url});
```

### Java SDK Authentication and Disabling SSL Verification (not recommended)

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

### Python SDK Authentication

```
from ibm_cloud_sdk_core.authenticators import BearerTokenAuthenticator
import ibm_whcs_sdk.annotator_for_clinical_data as acd

acd_service = acd.AnnotatorForClinicalDataV1(
    authenticator=BearerTokenAuthenticator(bearer_token={token}),
    version={version}
    )
acd_service.set_service_url({url})
```

### Python SDK Authentication and Disabling SSL Verification (not recommended)

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

### Node SDK Authentication

```
const AnnotatorForClinicalDataAcdV1 = require('ibm-whcs-services/annotator-for-clinical-data/v1');
const core = require('ibm-cloud-sdk-core');
const { BearerTokenAuthenticator } = core;

const acdService = new AnnotatorForClinicalDataAcdV1({
  version: '{version}',
  authenticator: new BearerTokenAuthenticator({
    bearerToken: '{token}'
    }),
  serviceUrl: '{url}'
});
```

### Node SDK Authentication with Disabling SSL Verification (not recommended)

```
const AnnotatorForClinicalDataAcdV1 = require('ibm-whcs-services/annotator-for-clinical-data/v1');
const core = require('ibm-cloud-sdk-core');
const { BearerTokenAuthenticator } = core;

const acdService = new AnnotatorForClinicalDataAcdV1({
  version: '{version}',
  authenticator: new BearerTokenAuthenticator({
    bearerToken: '{token}'
    }),
  serviceUrl: '{url}',
  disableSslVerification: true,
});
```

### Go SDK Authentication

```
import (
  "github.com/IBM/go-sdk-core/core"
  "github.com/IBM/whcs-go-sdk/annotatorforclinicaldataacdv1"
)

func main() {
  ACD, err = annotatorforclinicaldataacdv1.NewAnnotatorForClinicalDataAcdV1(&annotatorforclinicaldataacdv1.AnnotatorForClinicalDataAcdV1Options{
                URL:     "{url}",
                Version: core.StringPtr("{version}"),
                Authenticator: &core.BearerTokenAuthenticator{
                    BearerToken:                 "{token}",
        },
    })
  if err != nil {
    panic(err)
  }
}
```

### Go SDK Authentication with Disabling SSL Verification (not recommended)

```
import (
  "github.com/IBM/go-sdk-core/core"
  "github.com/IBM/whcs-go-sdk/annotatorforclinicaldataacdv1"
)

func main() {
  ACD, err = annotatorforclinicaldataacdv1.NewAnnotatorForClinicalDataAcdV1(&annotatorforclinicaldataacdv1.AnnotatorForClinicalDataAcdV1Options{
                URL:     "{url}",
                Version: core.StringPtr("{version}"),
                Authenticator: &core.BearerTokenAuthenticator{
                    BearerToken:                 "{token}",
        },
    })
  if err != nil {
    panic(err)
  }
  ACD.DisableSSLVerification()
}
```

