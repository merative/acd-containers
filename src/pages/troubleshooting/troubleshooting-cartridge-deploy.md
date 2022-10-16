---
title: "Troubleshooting Cartridge Deploy"
excerpt: "."
categories: troubleshooting
slug: troubleshooting
toc: true
---

## Cartridge deployment timeout

Some large cartridge deployments can exceed the request timeout thresholds. In that event, you may receive the following error response:

```javascript
{
  "httpCode":"500",
  "httpMessage":"Internal Server Error",
  "moreInformation":"Failed to establish a backside connection"
}
```

This timeout occurs outside of Annotator for Clinical Data and does not prevent your cartridge from being successfully deployed. You just won't get the itemized response confirming successful deployment of each individual artifact within your cartridge. If your cartridge deployment request times out, here are steps you can take to verify successful deployment after giving the process about 15 minutes to complete.

* For initial deployment of a cartridge, you can look for the creation of the default annotator flow to determine whether deployment has completed. The default annotator flow is the last artifact created during the deployment process and its existence signals completion of deployment in the initial deployment of a cartridge.

Sample request to retrieve flows for verifying completion of initial cartridge deployment:

```Curl
  curl -X GET --header "Authorization: Bearer xxxxxxxxxxxxxxx" \
  --header "Accept: application/json" \
  "<route_host>/v1/flows?version=2017-10-13"
```

* For updates to a previously deployed cartridge and to verify successful deployment of a cartridge in general upon a deployment request timeout, run some sample text through the _POST /v1/analyze_ API and verify that the response adheres to the configurations defined within your cartridge.
