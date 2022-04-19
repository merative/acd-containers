---
title: "Attribute Detection"
excerpt: "."
categories: Annotators
slug: annotator_attribute_detection
toc: true
---
<!-- ---

copyright:
  years: 2015, 2019
lastupdated: "2019-03-07"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Attribute Detection -->

The attribute detection annotator provides support for domain specific attributes and associated values to be discovered in unstructured clinical text. Attribute values are identified by promoting relevant concept, concept values, and clinical annotations (e.g. procedures) to generate a higher-level concept in which consumers can define the name, possible values, and value ranges to suit the needs of their solution.

Similar to the [concept detection](wh-acd?topic=wh-acd-concept_detection) annotator, the attribute detection annotator may attach the medical codes for applicable concepts; e.g. NCI, ICD-9, ICD-10, LOINC, MeSH, RxNorm, SNOMED CT, and CPT codes. Attribute detection can also provide two additional medical codes (CCS code and HCC Code) made available by the [cancer](wh-acd?topic=cancer) and [symptom disease](wh-acd?topic=wh-acd-symptom_disease) annotators. The consumers can elect to have the set of medical codes associated with the attribute by specifying the optional configuration parameter to return the medical codes.

The attribute detection annotator also supports identification of qualifiers on the discovered attribute values. A qualifier is typically an adjective that describes the attribute. For example, an attribute that identifies a medical condition may have qualifiers related to whether the condition is active or whether it is part of the patient's prior history.

Annotator for Clinical Data provides several predefined attribute sets that can be used to identify general medical related attributes.

## Predefined Attribute Sets

| Attribute Set | Description |
|:---------------|:-----------------|
| general_medical_v1.0 | Clinical attributes that represent the patient characteristics commonly used by physicians during a medical examination including demographics, symptoms, diseases, and procedures. Included in the general_medical_v1.0 and default_profile_v1.0 profiles. |
| general_labs_v1.0 | Clinical attributes that represent the laboratory measurements commonly used by physicians. Included in the general_medical_v1.0 and default_profile_v1.0 profiles. |
| general_cancer_v1.0 | Clinical Attributes that focus on cancer patient disease characteristics including the cancer type, disease progression, staging, tumor markers, and treatments. Included in the general_cancer_v1.0 profile. |

Table 1. Attribute Sets

## Configurations

| Configuration | Description |
|:--------------------|:-------------------|
| attribute_set | he name of the desired attribute set to leverage when running the attribute detection annotator. Multiple attribute sets can be designated for a given request. |
| inference_rules | The name of a derived attribute rule set that will be used for deriving additional attributes based on the attributes discovered by the **attribute_set** parameter. |
| qualifier_set | The name of the desired attribute qualifier set to leverage when running the attribute detection annotator. Multiple qualifier sets can be designated for a given request. The **detect_qualifiers** parameter must also be set to `true`. |
| detect_qualifiers | When true, attribute annotations will include qualifiers as defined in the qualifier set identified on the **qualifier_set** parameter. |
| include_optional_fields | Specify additional fields from the underlying concepts in the attribute values. Use `medical_codes` to return medical code fields in the attribute annotations. |

Table 2. Configurations

### Dependencies

The attribute detection annotator detects attributes from previously detected concepts and concept values. Configurations defined within the attribute sets determine which concepts and concept values to promote to attributes. The concept value annotator is needed as a dependency to associate values from the unstructured text with a detected attribute. The concept value annotator should be designated to run prior to attribute detection in the flow.

The attribute detection annotator will propagate contextual information from the underlying concepts and concept values to the discovered attribute, such as whether the concept is negated or what section the attribute appears in. The contextual annotators (negation, hypothetical, disambiguation, or section) should be designated to run prior to attribute detection in the flow.

#### Annotation Types

* Attribute Value

### Attribute Value

| Fields | Description |
|:-------------------|:-----------------------|
| name | The configured name of the detected attribute. |
| preferredName | The normalized or preferred name of the underlying medical concept promoted to the attribute. |
| values | Any values associated with the detected attribute. Each value can contain the following information: <br /> **value** - the value associated with the attribute <br /> **unit** - the unit of measure <br /> **frequency** - the frequency associated with the value <br /> **duration** - the duration associated with the value <br /> **dimension** - the dimension associated with the value <br /> **modality** - the modality associated with the value |
| qualifiers | Any qualifiers associated with the detected attribute. Each qualifier can contain the following information: <br /> **qualifier** - the name of the qualifier <br /> **value** - the value associated with the qualifier |
| source | The attribute configuration set source from which the attribute was detected. |
| sourceVersion | The version of the attribute configuration set source from which the attribute was detected. |
| concept | Reference to the medical concept related to this attribute. |
| conceptValue | Reference to the medical concept value related to this attribute. |
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |

Table 3. Fields

### Sample Response

Sample response from the attribute detection annotator for the text: `Study participants must not have an active or untreated brain metastases.`

This example illustrates contextual information (negated and hypothetical) and includes optional medical codes and qualifiers.

```javascript
{
  "unstructured": [
    {
      "text": "Study participants must not have an active or untreated brain metastases.",
      "data": {
        "attributeValues": [
          {
            "name": "Disease",
            "preferredName": "Metastatic malignant neoplasm to brain",
            "values": [
              {
                "value": "Disease"
              }
            ],
            "qualifiers": [
              {
                "value": "true",
                "qualifier": "Active",
                "begin": 36,
                "end": 42
              },
              {
                "value": "false",
                "qualifier": "Treated",
                "begin": 46,
                "end": 55
              }
            ],
            "source": "General Medical",
            "sourceVersion": "v1.0",
            "concept": {
              "uid": 2
            },
            "begin": 56,
            "end": 72,
            "coveredText": "brain metastases",
            "negated": true,
            "hypothetical": false,
            "icd10Code": "C79.31",
            "nciCode": "C3813",
            "snomedConceptId": "94225005"
          }
        ]
      }
    }
  ]
}
]
```
