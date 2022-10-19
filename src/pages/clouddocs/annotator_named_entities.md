---
title: "Named Entities"
excerpt: "."
categories: Annotators
slug: annotator_named_entities
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Named Entities -->

Annotates spans of text that are named entities: person names, medical institutions, organizations, locations, emails, and phone numbers.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.EmailAddressInd
* aci.LocationInd
* aci.PersonInd
* aci.US_PhoneNumberInd
* aci.MedicalInstitutionInd
* aci.OrganizationInd

## aci.EmailAddressInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.EmailAddressInd |

---

## aci.LocationInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.LocationInd |

---

## aci.PersonInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.PersonInd |

---

## aci.US_PhoneNumberInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.US_PhoneNumberInd |

---

## aci.MedicalInstitutionInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.MedicalInstitutionInd |

---

## aci.OrganizationInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.OrganizationInd |

## Sample Response

Sample response from the Named Entities annotator for the text: `The patient was seen at Pine Springs Community Hospital last year for his condition.`

```
{
  "unstructured": [
    {
      "text": "The patient was seen at Pine Springs Community Hospital last year for his condition.",
      "data": {
        "MedicalInstitutionInd": [
          {
            "type": "aci.MedicalInstitutionInd",
            "begin": 24,
            "end": 55,
            "coveredText": "Pine Springs Community Hospital"
          }
        ],
        "OrganizationInd": [
          {
            "type": "aci.OrganizationInd",
            "begin": 24,
            "end": 55,
            "coveredText": "Pine Springs Community Hospital"
          }
        ]
      }
    }
  ]
}
```
