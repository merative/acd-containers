---
title: "Overview"
excerpt: "Overview."
categories: Using ACD
slug: overview
toc: true
---
<!-- ---

copyright:
  years: 2020
lastupdated: "2020-04-01"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Overview -->

Annotator for Clinical Data is designed to find medical concepts, [medical codes](/clouddocs/medical_codes/), and contextual information in unstructured text. It provides turnkey annotators as well as highly customizable annotators that you can tune specifically for your application needs.  The Unified Medical Language System ([UMLS](https://www.nlm.nih.gov/research/umls/) is the primary source for concepts and medical codes. Annotator for Clinical Data can also work with user-provided ontologies beyond UMLS.  

To illustrate the basic function of Annotator for Clinical Data, let's look at a simple example.  Imagine that we have the following small snippet of text:

```
There were no signs of ulceration
```

The resulting concept over `ulceration` will contain medical codes along with contextual information about the concept (note in this example, the concept is negated):

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

## Data isolation

### Public multi-tenant instances

**User configuration data:** User configuration data is stored in Cloud Object Storage. This data is isolated by tenant at the service layer.

**User unstructured text:** Requested analysis of unstructured text is processed in-memory. The input text is not persisted. Requests are isolated at the service layer.

### Dedicated instances

**User configuration data:** User configuration data is stored in Cloud Object Storage. This data is isolated at the service layer.

**User unstructured text:** Requested analysis of unstructured text is processed in-memory. The input text is not persisted. Requests are isolated at the Kubernetes pod layer.

## Compute isolation

**Public multi-tenant instances:** The service is accessed via public endpoints. The service will access all dependencies via private endpoints. In these instances the control plane of the service is shared across tenants.

**Dedicated instances:** The service can be accessed via public and/or private endpoints. Review [Public and private network endpoints](/about/overview/) for details. The service will access all dependencies via private endpoints. In these instances the control plane of the service is isolated in separate pods for each tenant.

## Available annotators

The following annotators are available for detecting and coding medical concepts within unstructured data.

### Attributes

Attributes are higher order concepts composed of multiple pieces of information found in a document.  An example of this might be understanding if a patient is overweight or not.  Given some example text, we would like to know if the patient is overweight or not.

```
The patient is a 37 year old male who is 6 feet tall and weighs 170 lbs.
```

You can create custom [concept values](/clouddocs/annotator_concept_value/) to extract and normalize the patient's height and weight.  With that information, you can create inference rules in Annotator for Clinical Data to combine that information into a single attribute that we'll call `NORMAL_WEIGHT`.  Custom attributes like this are a powerful way to distill unstructured text into actionable insights.

For more information, see [Attributes](/clouddocs/annotator_attribute_detection/).

### Concepts

The concept annotator finds UMLS or custom concepts in unstructured text.

For more information, see [Concepts](/clouddocs/annotator_concept_detection/).

### Concept value

The concept value annotator creates composite attributes resulting from a medical concept and an associated value.  It supports scalar values as well as value ranges.  

```
The patient is a 37 year old male who is 6 feet tall and weighs 170 lbs.
```

In this example, the combination of `height` with `6 feet` is an example of how concept values work.

For more information, see [Concept Value](/clouddocs/annotator_concept_value/).

## Contextual annotators

Contextual annotators use the surrounding context of the document to provide a deeper understanding of concepts.

### Negation

Identifies spans of text with an implied negative meaning.  For example: _There were no signs of ulceration._

For more information, see [Negation](/clouddocs/annotator_negation_detection/).

### Hypothetical

Identifies spans of text are the object of a hypothetical statement.  For example: _We discussed the pros and cons of chemotherapy._

For more information, see [Hypothetical](/clouddocs/annotator_hypothetical_detection/).

### Concept disambiguation

Determines the validity of UMLS concepts detected in a document.

For more information, see [Disambiguation](/clouddocs/annotator_concept_disambiguation/).

### Spell check

Medically aware spell checker that can be integrated into an API call.

For more information, see [Spell Check](/clouddocs/annotator_spell_check/).

### Turn-key annotators

 Annotator for Clinical Data provides a set of prebuilt annotators targeted at specific medical domains.

* [Allergy](/clouddocs/annotator_allergy/) _(deprecated)_
* [Cancer](/clouddocs/annotator_cancer/) _(deprecated)_
* [Ejection Fraction](/clouddocs/annotator_ejection_fraction/) _(deprecated)_
* [Lab values](/clouddocs/annotator_lab_values)
* [Living assistance](/clouddocs/annotator_living_assistance/) _(deprecated)_
* [Medications](/clouddocs/annotator_medication/)
* [Named entities](/clouddocs/annotator_named_entities/)
* [Procedures](/clouddocs/annotator_procedure/)
* [Sections](/clouddocs/annotator_sections/)
* [Smoking](/clouddocs/annotator_smoking/) _(deprecated)_
* [Symptoms & diseases](/clouddocs/annotator_symptom_disease/)

### Clinical insights

Clinical insights are a collection of models and cartridge configuration that provide contextual information about key clinical attributes (medication, diagnosis, and procedure) for patient-centric clinical notes.

For more information, see [Clinical Insights](/clouddocs/clinical_insights_overview/).
