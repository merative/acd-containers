---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:caption: .caption}
{:important: .important}
{:note: .note}
{:deprecated: .deprecated}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}

# Analyzing Text
{: #analyze_text}

{{site.data.keyword.wh-acd_short}} detects medical concepts within unstructured data. When you send unstructured data to the service to be analyzed and designate the desired annotators to employ, the service will route your unstructured data through the designated annotators and return the medical concepts detected within your unstructured data.

How it works:
1. Designate which annotators to employ in analyzing your unstructured data. This designation is defined as an annotator flow. See [Annotator Flows] for more details.
2. Send your unstructured data along with the annotator flow to the service to extract the desired medical concepts.

**Example:** analyze request referencing a persisted flow

```bash
curl -X POST -u "apikey:{apikey}" \
--header "Content-Type: text/plain" \
--header "Accept: application/json" \
--data-binary "Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan." \
"{url}/v1/analyze/your_flow_id?version=2020-03-13"
```

When referencing a persisted flow in an analyze request, you can send plain text to the service for analysis.

**Example:** analyze request within flow included

```bash
curl -X POST -u "apikey:{apikey}" \
  --header "Content-Type: application/json" \
  --header "Accept: application/json" -d "{
  \"annotatorFlows\": [
    {
      \"flow\": {
        \"elements\": [
          {
            \"annotator\": {
              \"name\": \"concept_detection\"
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
      \"text\": \"Patient has lung cancer, but did not smoke. She may consider Cisplatin as part of a treatment plan.\"
    }
  ]
}" "{url}/v1/analyze?version=2020-03-13"
```

## Annotator flows
{: #flows}

Annotator flows define which annotators to employ on a given request and the order in which request data flows through the annotators. An annotator flow along with the unstructured data to be analyzed are the two required inputs for the service. Flows can either be defined dynamically as part of the request or persisted via the `/flows` APIs and referenced as a path parameter on an analyze request - e.g. `/analyze/{flow_id}`.

The `/analyze/{flow_id}` API supports text/plain requests wheres the `/analyze` API where the flow is defined within the request requires you define both the flow and unstructured data to be analyzed in json format.
{: tip}

The following predefined flows are provided with the service:

| Annotator Flow | Description |
|----|----|
|wh_acd.ibm_clinical_insights_v1.0_standard_flow | {{site.data.keyword.wh-acd_short}} provides a ready-to-use Clinical Insights flow that extracts clinically relevant information by performing deep contextual analysis of clinical notes. The Clinical Insights flow is a default configuration provided with Annotator for Clinical Data that produces clinical attributes for Prescribed Medications, Diagnoses, Therapeutic Procedures, and Diagnostic Procedures by contextually evaluating each type of clinical information to determine that it is both relevant and pertinent to the patient. See the [Clinical Insights](/docs/wh-acd?topic=wh-acd-clinical_insights_overview#clinical_insights_overview) documentation for a detailed explanation.<br/><br/>As new versions of the Clinical Insights flow are released, older versions will be deprecated and eventually retired. This is known as the version lifecycle. Annotator for Clinical Data will support two versions of the Clinical Insights flows, the current latest version and the previous version. This is known as an “n-1” version support scheme. Once an older version is marked as “deprecated”, a 90 day period will begin before the deprecated version is officially “retired” and no longer functional. The deprecated version will remain operational for a 90 day period before it is considered retired. Once a version has been retired, it will no longer be available and any attempts to use a retired version will fail.|
{: caption="Table 1. Predefined annotator flows" caption-side="top"}

### Creating flows

The `/flows` APIs are used to create and manage user-defined flows. Flows define both which annotators are to be employed in analyzed unstructured data as well as the order in which request data is routed through the annotator set. Request data is routed through the designated annotators serially. Many of the annotators are designed to act upon the output of other annotators - e.g. the concept detection annotator will pull in the section name of encompassing section annotations output by the section annotator. In order to take full advantage of this type of annotator cooperation, please follow the annotator ordering guidelines defined in the table below for the applicable annotators in your flow.

| Order | Annotators |
|----|----|
| 1 | section |
| 2 | <ul><li>concept_detection</li><li>allergy</li><li>bathing_assistance</li><li>cancer</li><li>dressing_assistance</li><li>eating_assistance</li><li>ejection_fraction</li><li>lab_value</li><li>medication</li><li>named_entities</li><li>procedure</li><li>seeing_assistance</li><li>smoking</li><li>symptom_disease</li><li>toileting_assistance</li><li>walking_assistance</li></ul> |
| 3 | disambiguation |
| 4 | concept_value |
| 5 | <ul><li>hypothetical</li><li>negation</li></ul> |
| 6 | relation |
| 7 | model_broker |
| 8 | attribute_detection |
{: caption="Table 2. Recommended annotator flow ordering" caption-side="top"}

## Unstructured Data Input
{: #unstructured_data_input}

By default, the unstructured data input sent to the service is not returned in the response and the following characters are encoded in the response to protect against cross-site scripting attacks in the event the output is rendered within a browser. If you want the unstructured data input sent back in the response and you do not want the following characters encoded, include the following query parameter on the analyze request `return_analyzed_text=true`.

## Response
{: #response}

A sample response is shown below when the default setting (i.e. return_analyzed_text=false) is used, i.e. when the encoding process is activated. Notice that the begin and the end field of the concepts are not affected by the character encoding.  Set return_analyzed_text=true to avoid the encoding results and to show the analyzed text in the response.  

```bash
{
    "unstructured": [
        {
            "data": {
                "conceptValues": [
                    {
                        "cui": "C0005893",
                        "preferredName": "Body mass index procedure",
                        "trigger": "greater than",
                        "value": "40",
                        "type": "ConceptValue",
                        "begin": 1,
                        "end": 9,
                        "coveredText": "BMI &gt; 40"
                    }
               ]
            }
        }
    ]
}
```
