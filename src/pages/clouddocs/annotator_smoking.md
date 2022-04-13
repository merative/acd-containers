---
title: "Smoking (Deprecated)"
excerpt: "."
categories: Annotators
slug: annotator_smoking
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Smoking (Deprecated) -->

The smoking annotator identifies whether the patient is a current or former smoker. Furthermore, it identifies the amount and substance(s) being smoked as well as the rate and duration of the smoking habit.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.SmokingInd

##$ aci.SmokingInd

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.SmokingInd |
| amount | Contains the amount of the smoking substance specified in the text.  For example, one pack, 2 to 3 packs, etc. |
| current | Indicates whether the patient is a current smoker.  The values of this feature are true or false. True indicates that the patient is a current smoker. False indicates that the patient has history of smoking and is not presently smoking. |
| duration | Indicates how long the patient has been smoking.  For example, <q>for 10 years</q>. |
| modality | Determines the likeliness of the annotation. Modality for the text <q>smokes daily</q> is <q>positive</q> while the modality for the text <q>never smoked</q> is <q>negative</q>. |
| participation | Indicates the participant that is related to the annotation.  For instance, when a SmokingInd annotation is identified, the participation feature indicates whether the SmokingInd is related to a patient, surroundings, or a family member of the patient.  The three possible values are <q>patient</q>, <q>environmental</q>, and <q>family</q>. |
| rate | Indicates the rate at which the patient smokes.  For example, in the text <q>smokes 1 pack a week</q>, the rate value will be <q>a week</q>. |
| sectionSurfaceForm | Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is <q>document</q>. |
| sectionNormalizedName | The normalized term for the section. |
| smokeTermSurfaceForm | The covered text that indicates the action for the smoking activity. For example, in text <q>He smokes 2 packs a day</q>, the smoke term  is <q>smokes</q>. |
| smokeTermNormalizedName | The normalized term for the smoke term. |
| smokeSubstanceSurfaceForm | The covered text that refers to the substance being smoked. For example, in text <q>He smokes 2 packs cigarettes a day</q>, the smoke substance is <q>cigarettes</q>. |
| smokeSubstanceNormalizedName | The normalized term for the smoke substance. |
| illicitDrugSurfaceForm | The covered text that refers to the substance being smoked if it is an illicit drug. |
| illicitDrugNormalizedName | The normalized term for the illicit drug substance. |

### Sample Response

Sample response from the Smoking annotator for the text: `The patient smokes 2 packs of cigarettes per week.`

```
{
  "unstructured": [
  {
   "text": "The patient smokes 2 packs of cigarettes per week.",
   "data": {
     "SmokingInd": [
       {
         "type": "aci.SmokingInd",
         "begin": 12,
         "end": 49,
         "coveredText": "smokes 2 packs of cigarettes per week",
         "participation": "patient",
         "amount": "2 packs",
         "current": "true",
         "modality": "positive",
         "rate": "per week",
         "smokeSubstanceSurfaceForm": "cigarettes",
         "smokeTermSurfaceForm": "smokes",
         "smokeTermNormalizedName": "smoke",
         "smokeSubstanceNormalizedName": "cigarettes"
       }
     ]
   }
  }]
}
```
