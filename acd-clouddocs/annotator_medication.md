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

# Medications
{: #medications}

The Medications annotator identifies information that is related to medications and how they are administered to the patient (dosage, frequency, route, etc).
{: shortdesc}

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

* aci.MedicationInd

## aci.MedicationInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.MedicationInd</td></tr>
<tr><td>sectionSurfaceForm</td><td>Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is `document`.</td></tr>
<tr><td>sectionNormalizedName</td><td>The normalized term for the section.</td></tr>
<tr><td>date</td><td>Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated.</td></tr>
<tr><td>dateInMilliseconds</td><td>It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC.</td></tr>
<tr><td>dateSource</td><td>Indicates where in the document or text the date value is identified. For example, `sentence` is one possible option for dateSource</td></tr>.
<tr><td>administration</td><td><table role="presentation"><tbody>
  <tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
  <tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
  <tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
  <tr><td>type</td><td>aci.SubstanceAdministration</td></tr>
  <tr><td>dosageValue</td><td>The text that represents out often the medication is administered.</td></tr>
  <tr><td>frequencyValue</td><td>The text that represents the dosage of the medication.</td></tr>
  <tr><td>route</td><td><table role="presentation"><tbody>
    <tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
    <tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
    <tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
    <tr><td>type</td><td>aci.DrugRoute</td></tr>
    <tr><td>normalized</td><td>The normalized term that represents the route.</td></tr>
    </tbody></table></td></tr>
  <tr><td>duration</td><td><table role="presentation"><tbody>
    <tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
    <tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
    <tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
    <tr><td>type</td><td>aci.Duration</td></tr>
    </tbody></table></td></tr>
</tbody></table></td></tr>
<tr><td>drug</td><td><table role="presentation"><tbody>
  <tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
  <tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
  <tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
  <tr><td>type</td><td>aci.Ind_Drug</td></tr>
  <tr><td>complex</td><td>Whether this a multi-drug medication.</td></tr>
  <tr><td>name1</td><td><table role="presentation"><tbody>
    <tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
    <tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
    <tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
    <tr><td>type</td><td>aci.DrugName</td></tr>
    <tr><td>cui</td><td>UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the medication information, this value may not be available.</td></tr>
    <tr><td>rxNormID</td><td>Also called the RXCUI which is a normalized id that is defined in the RxNorm standard and commonly used amongst different organizations. Depending on the source of the medication information, this value may not be available.</td></tr>
    <tr><td>drugSurfaceForm</td><td>The covered text that refers to the drug identified by the annotation.</td></tr>
    <tr><td>drugNormalizedName</td><td>The normalized term for the drug.</td></tr>
    </tbody></table></td></tr>
</tbody></table></td></tr>
</table>

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
            "administration": [
              {
                "coveredText": "orally once a day",
                "route": [
                  {
                    "coveredText": "orally",
                    "normalized": "intraoral route of administration",
                    "end": 25,
                    "type": "aci.DrugRoute",
                    "begin": 19
                  }
                ],
                "end": 36,
                "frequencyValue": "once a day",
                "type": "aci.SubstanceAdministration",
                "begin": 19
              }
            ],
            "cui": "C0025598",
            "drug": [
              {
                "coveredText": "Metformin",
                "cui": "C0025598",
                "complex": "false",
                "end": 18,
                "type": "aci.Ind_Drug",
                "begin": 9,
                "name1": [
                  {
                    "rxNormID": "6809",
                    "coveredText": "Metformin",
                    "cui": "C0025598",
                    "drugSurfaceForm": "Metformin",
                    "end": 18,
                    "drugNormalizedName": "metformin",
                    "type": "aci.DrugName",
                    "begin": 9
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```
