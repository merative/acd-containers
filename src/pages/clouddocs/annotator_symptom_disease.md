---
title: "Symptoms & Diseases"
excerpt: "."
categories: Annotators
slug: annotator_symptom_disease
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Symptoms & Diseases -->

This annotator identifies symptoms and diseases mentioned in the text. It also identifies related text that describes the symptom or disease.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.


### Annotation Types

* aci.SymptomDiseaseInd

### aci.SymptomDiseaseInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.SymptomDiseaseInd |
| date | Indicates the date related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated. |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |
| dateSource | Indicates where in the document or text the date value is identified. For example, <q>sentence</q> is one possible option for dateSource |
| snomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the symptom or disease. |
| ccsCode | Clinical Classification System (CCS) code is used to categorize the symptom and diseases such that it can be used for further analysis. |
| hccCode | Hierarchical Condition Categories (HCC) code is primarily used by Medicare and Medicaid. |
| cui | UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the symptom/disease information, this value may not be available. |
| modality | There are three potential values for this feature: positive, negative, and potential.  Positive modality means there is a high probability that the identified text is related to symptoms or diseases.  Negative modality means that the identified text is not a symptom or a disease.  Potential modality means there is some likelihood that the identified text is related to symptoms or diseases. |
| icd9Code | ICD stands for International Classification of Diseases.  The number 9 is a revision number for this code set. |
| icd10Code | ICD stands for International Classification of Diseases.  The number 10 is a revision number for this code set. |
| symptomDiseaseSurfaceForm | The covered text that refers to the sympton or disease identified by the annotation. For example, in text <q>He had a persistent cough.</q>, the symptom is <q>persistent cough</q>. |
| symptomDiseaseSurfaceFormNormalizedName | The normalized term for the sympton or disease. For instance, for the term <q>roll-in shower bench</q>, the normalized form can be <q>shower bench</q>. |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is <q>document</q>. |
| sectionNormalizedName | The normalized term for the section. |
| modifiers | Modifiers represents text that describes the disease or symptom in more detail or provides additional context. |

---

#### Modifers

| Feature | Description |
|:--------|-------------|
| type | aci.SiteInd - Identifies the related body site or location. |
| type | aci.ModifierGroupInd - General modifiers that further describe the symptom or disease such as severe, low, high, or mild. |
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Measurement - Identifies the cancer grade which can help determine the rate of tumor growth. |
| gradeValue | The value of the grade. |
| siteNormalizedName | The normalized name for the site from UMLS. |
| compound | Whether this a multi-site term. |

| Feature | Description |
|:--------|-------------|
| type | aci.ModifierGroupInd - General modifiers that further describe the symptom or disease such as severe, low, high, or mild. |
| type | aci.ModifierGroupInd - General modifiers that further describe the symptom or disease such as severe, low, high, or mild. |
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |

### Sample Response

Sample response from the symptom disease annotator for the text: `He has severe cramping and pain in his left leg due to diabetic neuropathy.`

```
{
  "unstructured": [
    {
      "text": "He has severe cramping and pain in his left leg due to diabetic neuropathy.",
      "data": {
        "SymptomDiseaseInd": [
          {
            "type": "aci.SymptomDiseaseInd",
            "begin": 7,
            "end": 22,
            "coveredText": "severe cramping",
            "icd9Code": "729.82",
            "icd10Code": "R25.2",
            "modality": "positive",
            "symptomDiseaseSurfaceForm": "cramping",
            "cui": "C0026821",
            "dateInMilliseconds": " ",
            "snomedConceptId": "55300003",
            "modifiers": [
              {
                "coveredText": "severe",
                "end": 13,
                "type": "aci.ModifierGroupInd",
                "begin": 7
              }
            ],
            "ccsCode": "211",
            "symptomDiseaseNormalizedName": "cramp"
          },
          {
            "type": "aci.SymptomDiseaseInd",
            "begin": 27,
            "end": 47,
            "coveredText": "pain in his left leg",
            "modality": "positive",
            "symptomDiseaseSurfaceForm": "pain",
            "dateInMilliseconds": " ",
            "modifiers": [
              {
                "coveredText": "his left leg",
                "end": 47,
                "siteNormalizedName": "structure of left lower leg",
                "type": "aci.SiteInd",
                "snomedConceptId": "48979004",
                "begin": 35,
                "compound": "false"
              }
            ],
            "symptomDiseaseNormalizedName": "pain"
          },
          {
            "type": "aci.SymptomDiseaseInd",
            "begin": 55,
            "end": 74,
            "coveredText": "diabetic neuropathy",
            "icd9Code": "355.9,250.60",
            "icd10Code": "E14.4,G63.2,E11.40",
            "modality": "positive",
            "symptomDiseaseSurfaceForm": "diabetic neuropathy",
            "cui": "C0011882",
            "dateInMilliseconds": " ",
            "snomedConceptId": "230572002",
            "ccsCode": "50",
            "symptomDiseaseNormalizedName": "diabetic neuropathy",
            "hccCode": "18"
          }
        ]
      }
    }
  ]
}
```
