---
title: "Procedures"
excerpt: "."
categories: Annotators
slug: annotator_procedure
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Procedures -->

The procedure annotator identifies different types of medical procedures such as surgery, biopsy, echocardiogram, ultrasound, MRI, and so forth.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2022AA</li><li>umls.2021AA</li><li>umls.2020AA <i>(deprecated - will be removed in 2023)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.ProcedureInd

### aci.ProcedureInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.ProcedureInd |
| date | Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated. |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |
| dateSource | Indicates where in the document or text the date value is identified. For example, <q>sentence</q> is one possible option for dateSource |.
| snomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the procedure. |
| loincId | LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS. |
| nciCode | The [NCI Thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NCI/) covers vocabulary for cancer-related clinical care, translational and basic research, and public information and administrative activities.  The value for this feature comes from UMLS. |
| meshId | The [MeSH thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/MSH/) is a controlled vocabulary used for indexing, cataloging, and searching for biomedical and health-related information and documents.  The value for this feature comes from UMLS. |
| cptCode | This code represents the type of procedure that is performed. CPT stands for Current Procedural Terminology. This code a standard terminology used by different members of medical society such as physicians, financial administrators, coders, and other organizations. |
| cui | UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the procedure information, this value may not be available. |
| procedureSurfaceForm | The covered text that refers to the procedure identified by the annotation. For example, in text <q>He had a blood pressure test.</q>, the procedure is <q>blood pressure</q>. |
| procedureNormalizedName | The normalized term for the procedure. For example, in text <q>He had a blood pressure test.</q>, the procedure is <q>blood pressure taking</q>. |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is <q>document</q>. |
| sectionNormalizedName | The normalized term for the section. |

### Sample Response

Sample response from the Procedures annotator for the text: `She started chemotherapy April 8th.`

```javascript
{
  "unstructured": [
    {
      "text": "She started chemotherapy April 8th.",
      "data": {
        "ProcedureInd": [
          {
            "type": "aci.ProcedureInd",
            "begin": 12,
            "end": 24,
            "coveredText": "chemotherapy",
            "date": "April 8th",
            "loincId": "LA6172-6,MTHU010425",
            "nciCode": "C15632",
            "cui": "C3665472",
            "dateSource": "sentence",
            "dateInMilliseconds": "1649376000000",
            "snomedConceptId": "363688001,367336001",
            "procedureSurfaceForm": "chemotherapy",
            "procedureNormalizedName": "chemotherapy"
          }
        ]
      }
    }
  ]
}
```
