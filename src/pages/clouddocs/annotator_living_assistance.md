---
title: "Living Assistance (Deprecated)"
excerpt: "."
categories: Annotators
slug: annotator_living_assistance
toc: true
---
<!-- ---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Living Assistance (Deprecated) -->

The living assistance annotators identifies text that indicates if a patient needs assistance with daily activities.  There are six living assistance annotators that cover different types of assistance needs:  Bathing, dressing, eating, seeing, toileting, and walking.

## Bathing Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while bathing or taking shower. Additionally, the annotator will also identify patients who potentially needing help if the text mentions patient is having difficulty with a specific bathing task such as needing help washing feet.

### Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.BathingAssistanceInd

#### aci.BathingAssistanceInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.BathingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He needs help cleaning his feet.`, the action implement is `feet`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity.  For example, in the text `He does not need a bath seat.`, the assistance device is `bath seat`. |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He washes his back with difficulty.`, the primary action is `washes`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He needs help cleaning his feet.`, the secondary action is `cleaning`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

---

## Dressing Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while dressing.

### Configrations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

### Annotation Types

* aci.DressingAssistanceInd

### aci.DressingAssistanceInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.DressingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `She is not able to put on her clothes.`, the action implement is `clothes`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity.  For example, in the text `He uses a shoe horn to put on his shoe.`, the assistance device is `shoe horn`. |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `She needs help dressing.`, the primary action is `dressing`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `She is not able to put on her clothes.`, the secondary action is `put on`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

---

## Eating Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance consuming food. This will include any type of food consumption such as eating, drinking, chewing, swallowing, etc. Furthermore, the annotator will also identify difficulty using utensils as potentially needing help with eating such as `difficulty holding a fork and a knife`.

### Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

#### Annotation Types

* aci.EatingAssistanceInd

#### aci.EatingAssistanceInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.EatingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He uses a small cup with difficulty.`, the action implement is `cup`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity. For example, in the text `He uses a cup holder to drink.`, the assistance device is `cup holder`.  |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help eating.`, the primary action is `eating`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He uses a small cup with difficulty.`, the secondary action is `uses`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

---

## Seeing Assistance

This daily living activities annotator identifies text that indicates whether a patient has difficulty seeing. However, this annotator will not identify text if the patient uses assistive devices such as eye glasses or contact lenses to see properly.

### Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

#### Annotation Types

* aci.SeeingAssistanceInd

### aci.SeeingAssistanceInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.SeeingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He opens his eyes with difficulty.`, the action implement is `eyes`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity. For example, in the text `He uses a screen reader.`, the assistance device is `reader`.  |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help seeing.`, the primary action is `seeing`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He opens his eyes with difficulty.`, the secondary action is `opens`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

---

## Toileting Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance in using toileting facilities. Note that the annotator will not identify needing help with activities that are done before or after the toileting activities such as walking to the bathroom or washing hands.

### Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

#### Annotation Types

* aci.ToiletingAssistanceInd

### aci.ToiletingAssistanceInd

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.ToiletingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He needs help help raising the toilet seat.`, the action implement is `toilet seat`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity. For example, in the text `He needs a bedpan.`, the assistance device is `bedpan`.  |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help using the bathroom.`, the primary action is `using the bathroom`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He needs help help raising the toilet seat.`, the secondary action is `raising`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

---

## Walking Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while walking. The annotator will also identify text where patient may potentially need assistance walking such as when patient is unable to move a leg or bend a knee.

### Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| Library | <ul><li>umls.latest</li><li>umls.2021AA</li><li>umls.2020AA</li><li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li></ul> | Defines the version of the UMLS library that is used when analyzing unstructured data. |

The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.

#### Annotation Types

* aci.WalkingAssistance

### aci.walkingAssistance

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | aci.walkingAssistanceInd |
| modality | Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`. |
| actionImplementSurfaceForm | The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He can't move his legs.`, the action implement is `legs`. |
| actionImplementNormalizedName | The normalized term for the action implement. |
| assistanceDeviceSurfaceForm | The covered text that refers to devices that provide assistance during the activity. For example, in the text `He can't walk without a cane.`, the assistance device is `cane`.  |
| assistanceDeviceNormalizedName | The normalized term for the assistance device. |
| primaryActionSurfaceForm | The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He can't really walk.`, the primary action is `walk`. |
| primaryActionNormalizedName | The normalized term for the primary action. |
| secondaryActionSurfaceForm | The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He can't move his legs.`, the secondary action is `move`. |
| secondaryActionNormalizedName | The normalized term for the secondary action. |

#### Sample Response

Sample response from the walking assistance annotator for the text: `He can't walk without a cane.`

```
{
  "unstructured": [
    {
      "text": "He can't walk without a cane.",
      "data": {
        "WalkingAssistanceInd": [
          {
            "type": "aci.WalkingAssistanceInd",
            "begin": 3,
            "end": 28,
            "coveredText": "can't walk without a cane",
            "hypothetical": false,
            "modality": "fully dependent",
            "assistanceDeviceNormalizedName": "cane",
            "assistanceDeviceSurfaceForm": "cane"
          }
        ]
      }
    }
  ]
}
```
