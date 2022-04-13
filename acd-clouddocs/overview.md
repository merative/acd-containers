---

copyright:
  years: 2020
lastupdated: "2020-04-01"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}

# Overview
{: #overview}

**Notice:** {{site.data.keyword.wh-acd_short}} is currently in Limited Availability. Please contact your IBM sales representative for details.

The {{site.data.keyword.wh-acd_short}} is designed to find medical concepts, [medical codes](/docs/wh-acd?topic=wh-acd-medical_codes#medical_codes), and contextual information in unstructured text. It provides turn key annotators as well as highly customizable annotators that you can tune specifically for your application needs.  The Unified Medical Language System ([UMLS](https://www.nlm.nih.gov/research/umls/)) is the primary source for concepts and medical codes. {{site.data.keyword.wh-acd_short}} can also work with user provided ontologies beyond UMLS.  

To illustrate the basic function of  {{site.data.keyword.wh-acd_short}}, let's look at a simple example.  Imagine that we have the following small snippet of text:

```
There were no signs of ulceration
```

The resulting concept over ulceration will contain medical codes along with contextual information about the concept - in this example, the concept is negated.

```
{
    "cui": "C3887532",
    "preferredName": "Ulceration",
    "semanticType": "patf",
    "source": "umls",
    "sourceVersion": "2018AA",
    "type": "umls.PathologicFunction",
    "begin": 23,
    "end": 33,
    "coveredText": "ulceration",
    "negated": true,
    "nciCode": "C25757",
    "snomedConceptId": "263913002",
    "vocabs": "MTH,NCI_CDISC,NCI_FDA,NCI,OMIM,SNOMEDCT_US,NCI_NCI-GLOSS"
}
```

{: shortdesc}

## Data Isolation

### Public Multi-tenant Instances

**User Configuration Data:** User configuration data is stored in Cloud Object Storage. This data is isolated by tenant at the service layer.

**User Unstructured Text:** Requested analysis of unstructured text is processed in-memory. The input text is not persisted. Requests are isolated at the service layer.

### Dedicated Instances

**User Configuration Data:** User configuration data is stored in Cloud Object Storage. This data is isolated at the service layer.

**User Unstructured Text:** Requested analysis of unstructured text is processed in-memory. The input text is not persisted. Requests are isolated at the Kubernetes pod layer.

## Compute Isolation

**Public Multi-tenant Instances:** the service is accessed via public endpoints. The service will access all dependencies via private endpoints. In these instances the control plane of the service is shared across tenants.

**Dedicated Instances:** the service can be accessed via public and/or private endpoints. Review [Public and private network endpoints](/docs/wh-acd?topic=watson-public-private-endpoints) for details. The service will access all dependencies via private endpoints. In these instances the control plane of the service is isolated in separate pods for each tenant.

## Available Annotators

The following annotators are available for detecting and coding medical concepts within unstructured data.

### Attributes
{: #attribues}

Attributes are higher order concepts composed of multiple pieces of information found in a document.  An example of this might be understanding if a patient is overweight or not.  Given some example text, we would like to know if the patient is overweight or not.

```
The patient is a 37 year old male who is 6 feet tall and weighs 170 lbs.
```

You can create custom [concept values](/docs/wh-acd?topic=wh-acd-concept_value#concept_value) to extract and normalize the patient's height and weight.  With that information, you can create inference rules in {{site.data.keyword.wh-acd_short}} to combine that information into a single attribute that we'll call `NORMAL_WEIGHT`.  Custom attributes like this are a powerful way to distill unstructured text into actionable insights.

For more information, see [Attributes](/docs/wh-acd?topic=wh-acd-attribute_detection#attribute_detection).

### Concepts
{: #concepts}

The concept annotator finds UMLS or custom concepts in unstructured text.

For more information, see [Concepts](/docs/wh-acd?topic=wh-acd-concept_detection#concept_detection).

### Concept Value
{: #conceptValue}

The concept value annotator creates composite attributes resulting from a medical concept and an associated value.  It supports scalar values as well as value ranges.  

```
The patient is a 37 year old male who is 6 feet tall and weighs 170 lbs.
```

In this example, the combination of `height` with `6 feet` is an example of how concept values work.

For more information, see [Concept Value](/docs/wh-acd?topic=wh-acd-concept_value#concept_value).

## Contextual Annotators

Contextual annotators use the surrounding context of the document to provide a deeper understanding of concepts.

### Negation
{: #negation}

Identifies spans of text with an implied negative meaning.  For example: _There were no signs of ulceration._

For more information, see [Negation](/docs/wh-acd?topic=wh-acd-negation_detection#negation_detection).

### Hypothetical
{: #hypothetical}

Identifies spans of text are the object of a hypothetical statement.  For example: _We discussed the pros and cons of chemotherapy._

For more information, see [Hypothetical](/docs/wh-acd?topic=wh-acd-hypothetical_detection#hypothetical_detection).

### Concept Disambiguation
{: #disambiguation}

Determines the validity of UMLS concepts detected in a document.

For more information, see [Disambiguation](/docs/wh-acd?topic=wh-acd-concept_disambiguation#concept_disambiguation).

### Spell Check
{: #spell_check_summary}

Medically aware spell checker that can be integrated into an API call.

For more information, see [Spell Check](/docs/wh-acd?topic=wh-acd-spell_check#spell_check).

### Turn Key Annotators
{: #turnKeyAnnotators}

 {{site.data.keyword.wh-acd_short}} provides a set of prebuilt annotators targeted at specific medical domains.

* [Allergy](/docs/wh-acd?topic=wh-acd-allergies#allergies) _(experimental)_
* [Cancer](/docs/wh-acd?topic=wh-acd-cancer#cancer) _(experimental)_
* [Ejection Fraction](/docs/wh-acd?topic=wh-acd-ejection_fraction#ejection_fraction) _(experimental)_
* [Lab Values](/docs/wh-acd?topic=wh-acd-lab_values#lab_values)
* [Living Assistance](/docs/wh-acd?topic=wh-acd-living_assistance#living_assistance) _(experimental)_
* [Medications](/docs/wh-acd?topic=wh-acd-medications#medications)
* [Named Entities](/docs/wh-acd?topic=wh-acd-named_entities#named_entities)
* [Procedures](/docs/wh-acd?topic=wh-acd-procedure#procedure)
* [Sections](/docs/wh-acd?topic=wh-acd-sections#sections)
* [Smoking](/docs/wh-acd?topic=wh-acd-smoking#smoking) _(experimental)_
* [Symptoms & Diseases](/docs/wh-acd?topic=wh-acd-symptom_disease#symptom_disease)

### Clinical Insights
{: #clinicalInsightsSummary}

Clinical insights are a collection of models and cartridge configuration that provide contextual information about key clinical attributes (medication, diagnosis, and procedure) for patient centric clinical notes.

For more information, see [Clinical Insights](/docs/wh-acd?topic=wh-acd-clinical_insights#clinical_insights_overview).
