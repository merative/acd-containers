---

copyright:
  years: 2019
lastupdated: "2019-02-20"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:new_window: target="_blank"}
{:faq: data-hd-content-type='faq'}

# FAQs
{: #wh-acd-faqs}

## Can I process PHI _(Protected Health Information)_ data?

The service is HIPAA enabled and capable of processing PHI data. Review [Enabling the HIPAA Supported setting](/docs/wh-acd?topic=wh-acd-information-security#hipaa) prior to processing PHI data.

## Can I post multiple documents for processing within a single request?

Yes, you can define multiple text blocks within a json request submitted to the service.

*Example*

```javascript
{
  "unstructured": [
    {
      "text": "Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan."
    },
    {
      "text": "Optional additional text blocks - Patient was diagnosed with diabetes mellitus."
    }
  ]
}
```

## How can I remove undesired mention annotation matches?

You can define filter conditions both at the annotator level and globally to omit undesired mention annotations from the service response. In the case of global filters, annotations are filtered at the end of an annotator flow, before the response is returned. In the case of annotator level filters, annotations are filtered prior to the request proceeding to the next annotator in the flow. Review [annotation filtering](/docs/wh-acd?topic=wh-acd-filtering) for more details.

## If I pass in json instead of plain text in my request, does the json metadata count towards my 50K text limit per request?

No, only the text field values are counted towards the 50K text limit per request.

## How can I have my input text returned back in the response?

The input text is not returned in the response by default. However, if you wish to have the input text returned back in the response, you may do so by passing in the `return_analyzed_text=true` query parameter on /analyze API calls.

## Are the other annotators able to leverages corrected text from the spell checker annotator?

Yes, define the following parameter to the spell checker annotator to have spelling corrections applied to the text being processed by the ACD annotators, `apply_spell_corrections=true`.

## Which languages are supported for processing?

At this time, the nlp annotators provided by the service support English text.

## Which annotator flows are provided and maintained by the service?

The [wh_acd.ibm_clinical_insights_v1.0_standard_flow](/docs/wh-acd?topic=wh-acd-analyze_text#flows) annotator flow that's part of the [Clinical Insights](/docs/wh-acd?topic=wh-acd-clinical_insights_overview) capability is provided and maintained by the service.
