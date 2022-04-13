---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:important: .important}
{:note: .note}
{:deprecated: .deprecated}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}

# Living Assistance (experimental)
{: #living_assistance}

The living assistance annotators identifies text that indicates if a patient needs assistance with daily activities.  There are six living assistance annotators that cover different types of assistance needs:  Bathing, dressing, eating, seeing, toileting, and walking.

## Bathing Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while bathing or taking shower. Additionally, the annotator will also identify patients who potentially needing help if the text mentions patient is having difficulty with a specific bathing task such as needing help washing feet.

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.BathingAssistanceInd

### aci.BathingAssistanceInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.BathingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He needs help cleaning his feet.`, the action implement is `feet`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity.  For example, in the text `He does not need a bath seat.`, the assistance device is `bath seat`.</td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He washes his back with difficulty.`, the primary action is `washes`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He needs help cleaning his feet.`, the secondary action is `cleaning`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

---

## Dressing Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while dressing.

<h4>Configrations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.DressingAssistanceInd

### aci.DressingAssistanceInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.DressingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `She is not able to put on her clothes.`, the action implement is `clothes`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity.  For example, in the text `He uses a shoe horn to put on his shoe.`, the assistance device is `shoe horn`.</td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `She needs help dressing.`, the primary action is `dressing`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `She is not able to put on her clothes.`, the secondary action is `put on`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

---

## Eating Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance consuming food. This will include any type of food consumption such as eating, drinking, chewing, swallowing, etc. Furthermore, the annotator will also identify difficulty using utensils as potentially needing help with eating such as `difficulty holding a fork and a knife`.

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.EatingAssistanceInd

### aci.EatingAssistanceInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.EatingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He uses a small cup with difficulty.`, the action implement is `cup`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity. For example, in the text `He uses a cup holder to drink.`, the assistance device is `cup holder`. </td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help eating.`, the primary action is `eating`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He uses a small cup with difficulty.`, the secondary action is `uses`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

---

## Seeing Assistance

This daily living activities annotator identifies text that indicates whether a patient has difficulty seeing. However, this annotator will not identify text if the patient uses assistive devices such as eye glasses or contact lenses to see properly.

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.SeeingAssistanceInd

### aci.SeeingAssistanceInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.SeeingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He opens his eyes with difficulty.`, the action implement is `eyes`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity. For example, in the text `He uses a screen reader.`, the assistance device is `reader`. </td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help seeing.`, the primary action is `seeing`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He opens his eyes with difficulty.`, the secondary action is `opens`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

---

## Toileting Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance in using toileting facilities. Note that the annotator will not identify needing help with activities that are done before or after the toileting activities such as walking to the bathroom or washing hands.

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.ToiletingAssistanceInd

### aci.ToiletingAssistanceInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.ToiletingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He needs help help raising the toilet seat.`, the action implement is `toilet seat`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity. For example, in the text `He needs a bedpan.`, the assistance device is `bedpan`. </td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He needs help using the bathroom.`, the primary action is `using the bathroom`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He needs help help raising the toilet seat.`, the secondary action is `raising`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

---

## Walking Assistance

This daily living activities annotator identifies text that indicates whether a patient needs any type of assistance while walking. The annotator will also identify text where patient may potentially need assistance walking such as when patient is unable to move a leg or bend a knee.

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</t>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>
</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.WalkingAssistance

### aci.walkingAssistance

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.walkingAssistanceInd</td></tr>
<tr><td>modality</td><td>Potenial values are: `fully dependent`, `semi dependent`, and `independent`.  If help is required or an assistance device is used with the activity then the modality will be `fully dependent`.  If help may or may not required with the activity the modality will be `semi dependent`.  If it can be determined that no help is required with the activity then the modality will be `independent`.</td></tr>
<tr><td>actionImplementSurfaceForm</td><td>The covered text that refers to objects that are associated with the secondary actions.  For example, in the text `He can't move his legs.`, the action implement is `legs`.</td></tr>
<tr><td>actionImplementNormalizedName</td><td>The normalized term for the action implement.</td></tr>
<tr><td>assistanceDeviceSurfaceForm</td><td>The covered text that refers to devices that provide assistance during the activity. For example, in the text `He can't walk without a cane.`, the assistance device is `cane`. </td></tr>
<tr><td>assistanceDeviceNormalizedName</td><td>The normalized term for the assistance device.</td></tr>
<tr><td>primaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with primary functions related to an activity. For example, in the text `He can't really walk.`, the primary action is `walk`.</td></tr>
<tr><td>primaryActionNormalizedName</td><td>The normalized term for the primary action.</td></tr>
<tr><td>secondaryActionSurfaceForm</td><td>The covered text that refers to the terms associated with actions that are related to the primary activity or an action associated with an implement.   For example, in the text `He can't move his legs.`, the secondary action is `move`.</td></tr>
<tr><td>secondaryActionNormalizedName</td><td>The normalized term for the secondary action.</td></tr>
</table>

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
