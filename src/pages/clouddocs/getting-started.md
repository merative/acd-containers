---
title: "Getting started tutorial"
excerpt: "."
categories: ACD Service Documentation
slug: getting-started
toc: true

copyright:
  years: 2011, 2020
lastupdated: "2020-03-31"

keywords: annotator clinical data, clinical data, annotation, getting started tutorial, IBM Cloud, annotator for clinical data

subcollection: wh-acd

---

<!-- Name your file `getting-started.md` and include it in the Learn nav group in your toc file. -->
# Getting started tutorial

This short tutorial introduces the {{site.data.keyword.wh-acd_full_notm}} with example requests and links to additional resources.

## Before you begin

- Create an instance of the service:
    1.  Go to the [Annotator for Clinical Data](https://cloud.ibm.com/catalog/services/wh-acd) page in the IBM Cloud Catalog.
    <!-- 1.  Go to the [{{site.data.keyword.wh-acd_short}} ![External link icon](../../icons/launch-glyph.svg "External link icon")](https://cloud.ibm.com/catalog/services/wh-acd){: new_window} page in the IBM Cloud Catalog. -->
    2.  Sign up for a free IBM Cloud account or log in.
    3.  Click **Create**.
- Copy the credentials to authenticate to your service instance:
    1.  On the **Manage** page, click **Show** to view your credentials.
    2.  Copy the `API Key` and `URL` values.
- Make sure that you have the `curl` command.
    - Test whether `curl` is installed. Run the following command on the command line. If the output lists the `curl` version with SSL support, you are set for the tutorial.

        ```sh
        curl -V
        ```
        {: pre}

    - If necessary, install a version with SSL enabled from [curl.haxx.se](https://curl.haxx.se/){: external}. Add the location of the file to your PATH environment variables if you want to run `curl` from any command-line location.

## Step 1. Analyze plain text with predefined annotator flow

Run the following command to analyze plain text with a predefined [Clinical Insights](/docs/wh-acd?topic=wh-acd-clinical_insights_overview#clinical_insights_overview) annotator flow.
<!-- <span class="hide-dashboard">Replace `{apikey}` and `{url}` with your service credentials.</span> -->

```sh
curl -X POST -u "apikey:{apikey}" \
--header "Content-Type: text/plain" \
--header "Accept: application/json" \
--data-binary "Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan." \
"{url}/v1/analyze/wh_acd.ibm_clinical_insights_v1.0_standard_flow?version=2020-03-31"
```
{: pre}

The next step demonstrates how to dynamically pass in an annotator flow alongside the unstructured text to be analyzed.

## Step 2. Analyze text with dynamic annotator flow passed in on the request

The second example passes unstructured text as JSON input to the analyze API using a predefined flow that identifies concepts using the concept_detection annotator and clinical attributes using the attribute_detection annotator.

```sh
curl -X POST -u "apikey:{apikey}" \
--header "Content-Type: application/json" \
--header "Accept: application/json" \
-d "{
  \"annotatorFlows\": [
  {
    \"flow\": {
      \"elements\": [
        {
          \"annotator\": {
            \"name\": \"cancer\"
          }
        },
        {
          \"annotator\": {
            \"name\": \"negation\"
           }
        }
      ],
      \"async\": false
    }
  }
  ],
   \"unstructured\": [
    {
      \"text\": \"Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan.\"     
    }
   ]
  }" \
  "{url}/v1/analyze?version=2020-03-31"
```

## Next steps

* Learn more about the API in the [API reference](https://cloud.ibm.com/apidocs/wh-acd).
