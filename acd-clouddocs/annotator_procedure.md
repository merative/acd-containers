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

# Procedures
{: #procedure}

The procedure annotator identifies different types of medical procedures such as surgery, biopsy, echocardiogram, ultrasound, MRI, and so forth.
{: shortdesc}

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Values</th>
<th>Description</thd>
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

* aci.ProcedureInd

## aci.ProcedureInd

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.ProcedureInd</td></tr>
<tr><td>date</td><td>Indicates the date that is related to the event.  For instance, in a patient's medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated.</td></tr>
<tr><td>dateInMilliseconds</td><td>It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC.</td></tr>
<tr><td>dateSource</td><td>Indicates where in the document or text the date value is identified. For example, <q>sentence</q> is one possible option for dateSource</td></tr>.
<tr><td>snomedConceptId</td><td>Numerical code provided by the SNOMED dictionaries that represents the procedure.</td></tr>
<tr><td>cptCode</td><td>This code represents the type of procedure that is performed. CPT stands for Current Procedural Terminology. This code a standard terminology used by different members of medical society such as physicians, financial administrators, coders, and other organizations.</td></tr>
<tr><td>cui</td><td>UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the procedure information, this value may not be available.</td></tr>
<tr><td>procedureSurfaceForm</td><td>The covered text that refers to the procedure identified by the annotation. For example, in text <q>He had a blood pressure test.</q>, the procedure is <q>blood pressure</q>.</td></tr>
<tr><td>procedureNormalizedName</td><td>The normalized term for the procedure. For example, in text <q>He had a blood pressure test.</q>, the procedure is <q>blood pressure taking</q>.</td></tr>
<tr><td>sectionSurfaceForm</td><td>Medical documents have many sections such as patient's information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is <q>document</q>.</td></tr>
<tr><td>sectionNormalizedName</td><td>The normalized term for the section.</td></tr>
</table>

### Sample Response

Sample response from the Procedures annotator for the text: `She started chemotherapy April 8th.`

```javascript
{
  "unstructured": [
    {
      "text": "She started chemotherapy April 8th.",
      "data": {
        "ProcedureInd": [
          {
            "type": "aci.ProcedureInd",
            "begin": 12,
            "end": 24,
            "coveredText": "chemotherapy",
            "date": "April 8th",
            "cui": "C3665472",
            "dateSource": "sentence",
            "dateInMilliseconds": "1554681600000",
            "snomedConceptId": "367336001",
            "procedureSurfaceForm": "chemotherapy",
            "procedureNormalizedName": "chemotherapy"
          }
        ]
      }
    }
  ]
}
```
