---

copyright:
  years: 2015, 2019
lastupdated: "2019-02-20"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:tsSymptoms: .tsSymptoms}
{:tsCauses: .tsCauses}
{:tsResolve: .tsResolve}
{:new_window: target="_blank"}
{:shortdesc: .shortdesc}
{:screen: .screen}
{:codeblock: .codeblock}
{:pre: .pre}
{:note:.deprecated}
{:troubleshoot: data-hd-content-type='troubleshoot'}

# Troubleshooting
{: #troubleshoot}

## Cartridge Deployment Timeout
{: troubleshoot_deploy_timeout}

Some large cartridge deployments can exceed the request timeout thresholds. In that event, you may receive the following error response:

```javascript
{
  "httpCode":"500",
  "httpMessage":"Internal Server Error",
  "moreInformation":"Failed to establish a backside connection"
}
```

This timeout occurs outside of  {{site.data.keyword.wh-acd_short}} and does not prevent your cartridge from being successfully deployed. You just won't get the itemized response confirming successful deployment of each individual artifact within your cartridge. If your cartridge deployment request times out, here are steps you can take to verify successful deployment after giving the process about 15 minutes to complete.

* For initial deployment of a cartridge, you can look for the creation of the default annotator flow to determine whether deployment has completed. The default annotator flow is the last artifact created during the deployment process and its existence signals completion of deployment in the initial deployment of a cartridge.

Sample request to retrieve flows for verifying completion of initial cartridge deployment:

```Curl
  curl -X GET -u "apikey:{apikey}" \
  --header "Accept: application/json" \
  "{url}/v1/flows?version=2017-10-13"
```
{: pre}


* For updates to a previously deployed cartridge and to verify successful deployment of a cartridge in general upon a deployment request timeout, run some sample text through the _POST /v1/analyze_ API and verify that the response adheres to the configurations defined within your cartridge.

## Missing Medical Codes
{: troubleshoot_medical_codes}

Medical codes are supported as of the 2018AA version of the UMLS library. Ensure you are using the 2018AA or higher version of UMLS. For the [concept detection](/docs/wh-acd?topic=wh-acd-concept_detection#concept_detection) and [attribute detection](/docs/wh-acd?topic=wh-acd-attribute_detection#attribute_detection) annotators, ensure you have specified the optional configuration parameter to return the medical codes in your flow definition. 
