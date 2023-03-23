---
title: "FAQs"
excerpt: "FAQs."
categories: Using ACD
slug: faqs
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->

<!-- ---

copyright:
  years: 2019
lastupdated: "2019-02-20"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # FAQs -->

## Can I post multiple documents for processing within a single request?

Yes, you can define multiple text blocks within a JSON request submitted to the service.

### Example:

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

You can define filter conditions both at the annotator level and globally to omit undesired mention annotations from the service response. In the case of global filters, annotations are filtered at the end of an annotator flow, before the response is returned. In the case of annotator level filters, annotations are filtered prior to the request proceeding to the next annotator in the flow. Review [annotation filtering](/clouddocs/filtering/) for more details.

## If I pass in JSON instead of plain text in my request, does the JSON metadata count towards my 50K text limit per request?

No, only the text field values are counted towards the 50K text limit per request.

## How can I have my input text returned back in the response?

The input text is not returned in the response by default. However, if you wish to have the input text returned back in the response, you may do so by passing in the `return_analyzed_text=true` query parameter on _analyze_ API calls.

## Are the other annotators able to leverage corrected text from the spell checker annotator?

Yes, define the following parameter to the spell checker annotator to have spelling corrections applied to the text being processed by the ACD annotators, `apply_spell_corrections=true`.

## Which languages are supported for processing?

At this time, the NLP annotators provided by the service support English text.

## Which annotator flows are provided and maintained by the service?

The [acd.acd_clinical_insights_v1.0_standard_flow](/usage/overview/) annotator flow that is part of the [Clinical Insights](/clouddocs/clinical_insights_overview/) capability is provided and maintained by the service.
