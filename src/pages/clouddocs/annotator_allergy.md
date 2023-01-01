---
title: "Allergies (Deprecated)"
excerpt: "."
categories: Annotators
slug: annotator_allergy
toc: true
---

<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Allergies (Deprecated) -->

Detects text that follows allergy keywords such as `allergies:` and `allergic to:``. Items following the keywords are annotated with the AllergyInd type. The annotation includes all types of allergies such as environmental, animal, medication, food, etc. If annotation includes a medication then information related to the medication is also returned.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2022AA</li><li>umls.2021AA</li><li>umls.2020AA <i>(deprecated - will be removed in 2023)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.AllergyMedicationInd
* aci.AllergyInd

#### aci.AllergyInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.AllergyInd |

---

#### aci.AllergyMedicationInd

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.AllergyMedicationInd |
| medication | See medication indicator feature table below. |

#### Subtypes for aci.AllergyMedicationInd

#### aci.MedicationInd

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.MedicationInd |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is 'document'. |
| sectionNormalizedName | The normalized term for the section. |
| date | Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |
| dateSource | Indicates where in the document or text the date value is identified. For example, 'sentence' is one possible option for dateSource. |
| administration | See administration table below. |
| drug | See drug feature table below. |

 ---

#### aci.SubstanceAdministration

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.SubstanceAdministration |
| dosageValue | The text that represents the dosage of the medication. |
| frequencyValue | The text that represents how often the medication is administered. |
| route | See route feature table below. |
| duration | See duration feature table below. |

---

#### aci.Ind_Drug

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Ind_Drug |
| complex | Whether this a multi-drug medication. |
| name1 | See drug name feature table below. |

---

#### aci.DrugRoute

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.DrugRoute |
| normalized | The normalized term that represents the route. |

---

#### aci.Duration

|  Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Duration |

---

#### aci.DrugName

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.DrugName |
| cui | UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the medication information, this value may not be available |
| rxNormID | Also called the RXCUI which is a normalized id that is defined in the RxNorm standard and commonly used amongst different organizations. Depending on the source of the medication information, this value may not be available. |
| drugSurfaceForm | The covered text that refers to the drug identified by the annotation. |
| drugNormalizedName | The normalized term for the drug.

### Sample Response

Sample response from the allergy annotator for the text: `The patient is allergic to Percocet and Tramadol.`

```
{
  "unstructured": [
    {
      "text": "The patient is allergic to Percocet and Tramadol.",
      "data": {
        "AllergyMedicationInd": [
          {
            "begin": 27,
            "end": 35,
            "coveredText": "Percocet",
            "type": "aci.AllergyMedicationInd",
            "medication": [
              {
                "coveredText": "Percocet",
                "cui": "C0086787",
                "end": 35,
                "type": "aci.MedicationInd",
                "begin": 27,
                "drug": [
                  {
                    "coveredText": "Percocet",
                    "cui": "C0086787",
                    "complex": "false",
                    "end": 35,
                    "type": "aci.Ind_Drug",
                    "begin": 27,
                    "name1": [
                      {
                        "rxNormID": "42844",
                        "coveredText": "Percocet",
                        "cui": "C0086787",
                        "drugSurfaceForm": "Percocet",
                        "end": 35,
                        "drugNormalizedName": "percocet",
                        "type": "aci.DrugName",
                        "begin": 27
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "begin": 40,
            "end": 48,
            "coveredText": "Tramadol",
            "type": "aci.AllergyMedicationInd",
            "medication": [
              {
                "coveredText": "Tramadol",
                "cui": "C0040610",
                "end": 48,
                "type": "aci.MedicationInd",
                "begin": 40,
                "drug": [
                  {
                    "coveredText": "Tramadol",
                    "cui": "C0040610",
                    "complex": "false",
                    "end": 48,
                    "type": "aci.Ind_Drug",
                    "begin": 40,
                    "name1": [
                      {
                        "rxNormID": "10689",
                        "coveredText": "Tramadol",
                        "cui": "C0040610",
                        "drugSurfaceForm": "Tramadol",
                        "end": 48,
                        "drugNormalizedName": "tramadol",
                        "type": "aci.DrugName",
                        "begin": 40
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "AllergyInd": [
          {
            "begin": 27,
            "end": 35,
            "coveredText": "Percocet",
            "type": "aci.AllergyInd"
          },
          {
            "begin": 40,
            "end": 48,
            "coveredText": "Tramadol",
            "type": "aci.AllergyInd"
          }
        ]
      }
    }
  ]
}
```
