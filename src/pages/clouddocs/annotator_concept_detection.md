---
title: "Concept Detection"
excerpt: "."
categories: Annotators
slug: annotator_concept_detection
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Concept Detection -->

The concept detection service detects medical concepts from unstructured data. The service provides concepts based on the Unified Medical Language System (UMLS). As of the 2018AA version of the UMLS library, the consumers can elect to have a set of [medical codes](/clouddocs/medical_codes/) associated with the UMLS concepts by specifying the optional configuration parameter to return the medical codes. When medical codes are requested, the UMLS concept annotations from concept detection will include the applicable medical codes as metadata within the annotations.

## Expanded Concepts

Concept detection provides an _expanded_ option that allows you to go beyond exact matching of surface forms in a dictionary. With **expanded** set to `true`, concept detection will learn from the dictionary entries you have specified and generalize to other ways that concepts can be expressed in text. This allows you to define a core set of surface forms without exhaustively listing every surface form for every concept. This becomes particularly important with compound ideas. Consider the following text:

`The patient broke his leg and hip when he fell outside his home.`

There are two different injuries expressed in this text that we want to capture - broken leg and broken hip.  Neither one will have a dictionary entry that covers the way the concept is expressed. In this example, concept detection would return the following concepts with **expanded** set `true`.

```
{
    "cui": "C0159852",
    "preferredName": "Fracture of tibia and fibula",
    "semanticType": "inpo",
    "source": "umls-expanded",
    "sourceVersion": "2018AA",
    "type": "umls.InjuryOrPoisoning",
    "begin": 12,
    "end": 25,
    "coveredText": "broke his leg",
    "icd10Code": "S82.90X?",
    "snomedConceptId": "414293001",
    "vocabs": "MTH,CHV,CCS,ICD9CM,SNOMEDCT_US,ICPC"
}

...

{
    "cui": "C0019557",
    "preferredName": "Hip Fractures",
    "semanticType": "inpo",
    "source": "umls-expanded",
    "sourceVersion": "2018AA",
    "type": "umls.InjuryOrPoisoning",
    "begin": 12,
    "end": 33,
    "coveredText": "broke his leg and hip",
    "loincId": "MTHU020794",
    "icd10Code": "S72.009?",
    "nciCode": "C26794,C35153",
    "snomedConceptId": "5913000,263225007",
    "meshId": "M0010366",
    "vocabs": "MTH,CHV,LNC,CSP,MSH,NCI,AOD,NCI_CTCAE,NDFRT,COSTAR,SNOMEDCT_US,DXP"
}
```

Expanded detection will look for diseases, conditions, abnormalities, injuries, and procedures defined in the UMLS dictionary that ships with Annotator for Clinical Data.
In addition, expanded detection will look for all of the concepts defined in custom dictionaries that are enabled for expanded detection in the cartridge configuration.

### Configurations

The following table lists parameters of the concept_detection service.

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Libraries | <ul><li>umls.latest</li><li>umls.2022AA</li><li>umls.2021AA</li><li>umls.2020AA <i>(deprecated - will be removed in 2023)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data.* |
| inference_rules | | The name of a derived concept rule set that will be used for deriving additional concepts based on the concepts discovered by the libraries specified. |
| filters | | The name of a concept filter that is used to remove unwanted concepts. |
| expanded | true/false | When true, the concept detection annotator will attempt to expand concept coverage beyond the surface forms explicitly listed in the specified library.  For example - if <q>broken collarbone</q> is a surface from for C0159658 (Fracture of clavicle), the expanded option would match textual representations of that concept like <q>broke my collarbone</q>.  This option is <i>false</i> by default. |
| include_optional_fields | medical_codes / source_vocabularies | Optional fields that should also be returned for each concept. If not specified, only the libary's default fields will be returned. |
| longest_span | true/false | When true <i>(default)</i>, only the concept with the longest text span will be returned if there are multiple concepts overlapping the same span of text. |

*The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

#### Annotation Types

* Concept

#### Concept

| Fields | Description |
|:-------|:------------|
| cui | Concept Unique ID (CUI). CUIs are used to uniquely identify concepts. |
| preferredName | Normalized name for the concept. |
| semanticType | Shorthand version of the UMLS semantic type. |
| source | The library source used for the detection of the concepts. |
| sourceVersion | he version of the library source used for the detection of the concepts. |
| type | The semantic type associated with the concept. |
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| cptCode | This code represents the type of procedure that is performed. CPT stands for Current Procedural Terminology. This code a standard terminology used by different members of medical society such as physicians, financial administrators, coders, and other organizations. This value is only available when a CPT Codes file is referenced in the profile. |
| sourceVocabularies | This provides the list of UMLS source vocabularies that contained the concept. This is provided when the **include_optional_fields** parameter is specified with a value of `source_vocabularies`. |

The following optional response fields are provided when the **include_optional_fields** parameter is specified with a value of `medical_codes`.

| Fields | Description |
|:-------|:------------|
| loincId | LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS. |
| NCI Code | The [NCI Thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NCI/) covers vocabulary for cancer-related clinical care, translational and basic research, and public information and administrative activities.  The value for this feature comes from UMLS. |
| snomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the cancer. |
| MeSHId | The [MeSH thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/MSH/) is a controlled vocabulary used for indexing, cataloging, and searching for biomedical and health-related information and documents.  The value for this feature comes from UMLS. |
| icd9Code | ICD stands for International Classification of Diseases.  The number 9 is a revision number for this code set. |
| icd10Code | ICD stands for International Classification of Diseases.  The number 10 is a revision number for this code set. |
| rxNormID | Also called the RXCUI which is a normalized id that is defined in the RxNorm standard and commonly used amongst different organizations. |

### Sample Response

Sample response from the concept detection annotator for the text: `She is taking Metformin for her type 2 diabetes.`

This example provides the optional medical codes and source vocabularies.

```javascript
{
  "unstructured": [
    {
      "text": "She is taking Metformin for her type 2 diabetes.",
      "data": {
        "concepts": [
          {
            "cui": "C0025598",
            "preferredName": "Metformin",
            "semanticType": "phsu",
            "source": "umls",
            "sourceVersion": "2018AA",
            "type": "umls.PharmacologicSubstance",
            "begin": 14,
            "end": 23,
            "coveredText": "Metformin",
            "rxNormId": "6809",
            "loincId": "LP33332-5,MTHU016062",
            "nciCode": "C61612",
            "snomedConceptId": "372567009,109081006",
            "meshId": "M0013535",
            "vocabs": "LNC,CSP,MSH,RXNORM,MTHSPL,NCI_NCI-GLOSS,CHV,ATC,NCI_FDA,NCI,LCH_NW,USPMG,NDFRT,SNOMEDCT_US,DRUGBANK,VANDF"
          },
          {
            "cui": "C0011860",
            "preferredName": "Diabetes Mellitus, Non-Insulin-Dependent",
            "semanticType": "dsyn",
            "source": "umls",
            "sourceVersion": "2018AA",
            "type": "umls.DiseaseOrSyndrome",
            "begin": 32,
            "end": 47,
            "coveredText": "type 2 diabetes",
            "loincId": "LA10552-0",
            "icd10Code": "E11.9",
            "nciCode": "C26747",
            "snomedConceptId": "44054006",
            "meshId": "M0006155",
            "vocabs": "MTH,NCI_NICHD,LNC,CSP,MSH,HPO,OMIM,COSTAR,CHV,MEDLINEPLUS,NCI,LCH_NW,NDFRT,SNOMEDCT_US,DXP"
          }
        ]
      }
    }
  ]
}
```
