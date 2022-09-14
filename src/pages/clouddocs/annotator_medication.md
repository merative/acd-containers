---
title: "Medications"
excerpt: "."
categories: Annotators
slug: annotator_medication
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Medications -->

The Medications annotator identifies information that is related to medications and how they are administered to the patient (dosage, frequency, route, etc).

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.MedicationInd

## aci.MedicationInd

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.MedicationInd |
| snomedConceptId | Numerical code provided by the SNOMED dictionaries that represents the symptom or disease. |
| cui | UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the symptom/disease information, this value may not be available. |
| loincId | LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS. |
| nciCode | The [NCI Thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NCI/) covers vocabulary for cancer-related clinical care, translational and basic research, and public information and administrative activities.  The value for this feature comes from UMLS. |
| meshId | The [MeSH thesaurus](https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/MSH/) is a controlled vocabulary used for indexing, cataloging, and searching for biomedical and health-related information and documents.  The value for this feature comes from UMLS. |
| rxNormID | Also called the RXCUI which is a normalized id that is defined in the RxNorm standard and commonly used amongst different organizations. Depending on the source of the medication information, this value may not be available. |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is `document`. |
| sectionNormalizedName | The normalized term for the section. |
| date | Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated. |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |
| dateSource | Indicates where in the document or text the date value is identified. For example, `sentence` is one possible option for dateSource |.
| administration | See aci.SubstanceAdministration table below. |
| drug | See aci.Ind_Drug table below. |
 ___

### aci.SubstanceAdministration

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

___

#### aci.Ind_Drug

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Ind_Drug |
| complex | Whether this a multi-drug medication. |
| name1 | See drug name feature table below. |

___

#### aci.DrugRoute

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.DrugRoute |
| normalized | The normalized term that represents the route. |

___

#### aci.Duration

|  Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.Duration |

___

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

Sample response from the Medications annotator for the text: `He takes Metformin orally once a day.`

```
{
 "unstructured": [
   {
      "text": "He takes Metformin orally once a day.",
     "data": {
       "MedicationInd": [
         {
            "type": "aci.MedicationInd",
            "begin": 9,
            "end": 36,
            "coveredText": "Metformin orally once a day",
            "loincId": "MTHU060554,LP33332-5",
            "rxNormID": "6809",
            "nciCode": "C61612",
           "administration": [
             {
                "coveredText": "orally once a day",
                "frequencyValue": "once a day",
                "end": 36,
               "route": [
                 {
                    "coveredText": "orally",
                    "end": 25,
                    "type": "aci.DrugRoute",
                    "begin": 19,
                    "normalized": "intraoral route of administration"
                  }
                ],
                "type": "aci.SubstanceAdministration",
                "begin": 19
              }
            ],
            "cui": "C0025598",
            "snomedConceptId": "372567009,109081006",
            "meshId": "M0013535",
           "drug": [
             {
                "coveredText": "Metformin",
                "cui": "C0025598",
                "complex": "false",
                "end": 18,
                "type": "aci.Ind_Drug",
               "name1": [
                 {
                    "rxNormID": "6809",
                    "coveredText": "Metformin",
                    "cui": "C0025598",
                    "drugSurfaceForm": "Metformin",
                    "drugNormalizedName": "metformin",
                    "end": 18,
                    "type": "aci.DrugName",
                    "begin": 9
                  }
                ],
                "begin": 9
              }
            ]
          }
        ]
      }
    }
  ]
}
```
