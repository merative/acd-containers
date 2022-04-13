---
title: "Cancer (Deprecated)"
excerpt: "."
categories: Annotators
slug: annotator_cancer
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Cancer (Deprecated) -->

Detects potential cancer disease terms such as adenocarcinoma carcinomatosis. Extra features that can be found by the annotator include: the actual name of the cancer, measurement, cancer grade, site, date, and modality.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |
The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.


## Annotation Types

*  aci.IcaCancerDiagnosisInd

### aci.IcaCancerDiagnosisInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.IcaCancerDiagnosisInd |
| modality | Potenial values are: `positive` and `negative`.  This based on whether the patient has or does not have the cancer identified. |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is `document`. |
| cancer | See aci.Cancer table below. |
| date | See aci.Date table below. |
| measurement | See aci.Measurement table below. |
| CancerGrade | See aci.CancerGrade table below. |
| site | See aci.SiteInd table below. |

Subtypes for aci.IcaCancerDiagnosisInd

#### aci.Cancer

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Cancer |
| coveredText | The text covered by an annotation as a string. |
| cancerSurfaceForm | Covered text that represents the cancer.   For example, in the text `He has lung cancer`, the cancerSurfaceForm is `lung cancer`. |
| cancerNormalizedName |  Normalized name for the cancer from the UMLS dictionary   For example, in the text `He has lung cancer`, the cancerSurfaceForm is `primary malignant neoplasm of lung`. |
| ccsCode | CCS stands for Clinical Classification System, used to categorize diagnosis and procedures such that it can be used for further analysis. |
| hccCode | HCC stands for Hierarchical Condition Categories and primarily used by Medicare and Medicaid. |
| icd9Code | ICD stands for International Classification of Diseases.  The number 9 is a revision number for this code set. |
| icd10Code | ICD stands for International Classification of Diseases.  The number 10 is a revision number for this code set. |
| snomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the cancer. |
| cui | UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the cancer information, this value may not be available. |
| morphologyCode | A value that describes the behavior of cancer from malignant to benign. |
| behavior | The code represents the type of growth such as benign, malignant, in situ, or uncertain.  This code only applies to cancer related disease.  See behavior code below. |
| behaviorSource | A code that will either come from morphology code, icd 9 code, or icd 10 code.

---

#### aci.Date

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Date |
| coveredText | The text covered by an annotation as a string. |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |

---

#### aci.Measurement

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Measurement |
| coveredText | The text covered by an annotation as a string. |
| dimension | Type of mesurement. For example, in the text `4.3mm tumor`, the dimension of measurement is `length`. |

---

#### aci.CancerGrade

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.CancerGrade |
| gradeValue | The value of the grade. |

---

#### aci.SiteInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.SiteInd |
| coveredText | The text covered by an annotation as a string. |
| gradeValue< | The value of the grade. |
| siteNormalizedName | The normalized name for the site from UMLS. |
| compound | Whether this a multi-site term. |
| nomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the site. |

---

#### Behavior Codes

| Code | Behavior |
|:-----|:---------|
| 0 | Benign |
| 1 | Unknown (uncertain if benign or malignant) |
| 2 | Insitu |
| 3 | Malignant (primary) |
| 6 | Malignant (metastatic or secondary site) |
| 9 | Malignant (uncertain if primary or metastatic)

### Sample Response

Sample response from the cancer annotator for the text: `She was previously treated for adenocarcinoma of the colon.`

```
{
  "unstructured": [
    {
      "text": "She was previously treated for adenocarcinoma of the colon.",
      "data": {
        "IcaCancerDiagnosisInd": [
          {
            "begin": 31,
            "end": 58,
            "coveredText": "adenocarcinoma of the colon",
            "type": "aci.IcaCancerDiagnosisInd",
            "site": [
              {
                "coveredText": "the colon",
                "end": 58,
                "siteNormalizedName": "colon structure",
                "type": "aci.SiteInd",
                "snomedConceptId": "71854001",
                "begin": 49,
                "compound": "false"
              }
            ],
            "modality": "positive",
            "cancer": [
              {
                "icd10Code": "C80.9,C80.1",
                "cancerSurfaceForm": "adenocarcinoma",
                "cancerNormalizedName": "malignant adenomatous neoplasm",
                "type": "aci.Cancer",
                "snomedConceptId": "443961001",
                "ccsCode": "43",
                "icd9Code": "199.1",
                "coveredText": "adenocarcinoma",
                "cui": "C0001418",
                "behaviorSource": "icd-10",
                "end": 45,
                "behavior": "3",
                "begin": 31,
                "hccCode": "12"
              }
            ]
          }
        ]
      }
    }
  ]
}
```
