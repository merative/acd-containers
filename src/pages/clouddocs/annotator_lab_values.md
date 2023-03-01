---
title: "Lab Values"
excerpt: "."
categories: Annotators
slug: annotator_lab_values
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2011, 2023               -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->

<!-- # Lab Values -->

The purpose of the Lab Value annotator is to annotate the value associated with lab measurements and tests. The annotator uses lab measurements and test defined in the [Logical Observation Identifiers Names and Codes (LOINC)](https://loinc.org/) database. This database is a universal standard for identifying medical laboratory observations.  

Only the value of the measurement or test is covered by the annotation's span. To determine what test or measurement is associated with the value use the **labTypeNormalizedName** and **labTypeSurfaceForm** fields in the annotation. The Lab Value annotator is written to only handle single values or fractional values composed of two single values.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2022AA</li><li>umls.2021AA</li><li>umls.2020AA <i>(deprecated - will be removed in 2023)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

<h4>Annotation Types</h4>

* aci.LabValueInd

## aci.LabValueInd

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.LabValueInd |
| date | Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated. |
| dateInMilliseconds | It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC. |
| dateSource | Indicates where in the document or text the date value is identified. For example, `sentence` is one possible option for dateSource. |
| labTypeSurfaceForm | Covered text that represents the lab.   For example, in the text `Upright BP is 120/80 mmHg`, the labTypeSurfaceForm is `BP`. |
| labTypeNormalizedName | Normalized name for the lab from the UMLS dictionary or user provided whitelist.   For example, in the text `Upright BP is 120/80 mmHg`, the labTypeNormalizedName is `Blood pressure`. |
| labValue | Value of the lab type.  For example, in the text `Upright BP is 120/80 mmHg`, the lab value is 120/80. |
| loincId | LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS. |
| lowValue | Minimum value for the lab when the lab value falls within a range or expected to be at minimum value.  For example, in the text `Upright BP is 120/80 mmHg`, the low value is 80. |
| measurementUnit | See aci.MeasurementUnit feature table below. |
| position | Position of the patient while a lab test was performed.  For example, in the text `Upright BP is 120/80 mmHg`, the position is Upright. |

---

### aci.MeasurementUnit

| Feature | Description |
|:--------|:------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.MeasurementUnit |
| dimension | Type of mesurement. For example, in the text `Upright BP is 120/80 mmHg`, the dimension of measurement is `pressure`. |
| compound | Value of `true` when there is a numerator or denomenator present. |
| numerator | The first value of a compound measurement. |
| denomenator | The second value of a compound mesurement. |

### Sample Response

Text: `B.P. 118/76 (sitting) 120/80 (standing).`

```
"LabValueInd": [
   {
       "type": "aci.LabValueInd",
       "begin": 5,
       "end": 11,
       "coveredText": "118/76",
       "loincId": "18684-1",
       "lowValue": "76",
       "dateInMilliseconds": " ",
       "labTypeSurfaceForm": "B.P.",
       "labTypeNormalizedName": "Blood pressure",
       "labValue": "118",
       "position": "sitting"
   },
   {
       "type": "aci.LabValueInd",
       "begin": 22,
       "end": 28,
       "coveredText": "120/80",
       "loincId": "18684-1",
       "lowValue": "80",
       "dateInMilliseconds": " ",
       "labTypeSurfaceForm": "B.P.",
       "labTypeNormalizedName": "Blood pressure",
       "labValue": "120",
       "position": "standing"
   }
]
```

Text: `pulse: 84`

```
"LabValueInd": [
     {
         "type": "aci.LabValueInd",
         "begin": 7,
         "end": 9,
         "coveredText": "84",
         "dateInMilliseconds": " ",
         "labTypeSurfaceForm": "pulse",
         "labTypeNormalizedName": "pulse",
         "labValue": "84"
     }
 ]
```

Text: `temperature 20.1 degrees celsius`

```
"LabValueInd": [
     {
         "type": "aci.LabValueInd",
         "begin": 12,
         "end": 16,
         "coveredText": "20.1",
         "loincId": "8310-5",
         "dateInMilliseconds": " ",
         "labTypeSurfaceForm": "temperature",
         "labTypeNormalizedName": "Body temperature",
         "labValue": "20.1",
         "measurementUnit": [
             {
                 "coveredText": "degrees celsius",
                 "end": 32,
                 "type": "aci.MeasurementUnit",
                 "begin": 17,
                 "dimension": "temperature",
                 "compound": "false"
             }
         ]
     }
 ]
```
