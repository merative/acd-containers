---

copyright:
  years: 2021
lastupdated: "2021-11-09"

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

# Substance Use Illicit Drug Model (Experimental)
{: #substance_use_illicit_drug}

The substance use illicit drug model provides information about the illicit drug usage that applies to the patient.

![](images/illicit_drug.png)

The demo application above shows an example of how to use the scores from the substance use illicit drug model to create attributes.  In this example, "cocaine use" has a high _use_ and _abuse_ scores and is promoted to a DrugAbuse attribute by the cartridge scoring rules. The example also has a high _stopped_ score which results in a value of _former_ for the DrugAbuse attribute.

The usage section of the JSON response indicates how the substance use illicit drug applies to a patient.

## usage

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>useScore</td><td>Evidence that there has been illicit drug use by the patient.</td></tr>
<tr><td>noneScore</td><td>Evidence that there has been no illicit drug use by the patient.</td></tr>
<tr><td>discussedScore</td><td>Other mentions of illicit drugs that do not directly apply to the patient (For example:  "Patient was counseled about the dangers of using recreational drugs.")</td></tr>
</table>

## useStatus

<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>stoppedScore</td><td>Evidence that the patient is a former illicit drug user.</td></tr>
<tr><td>neverScore</td><td>Evidence that the patient has never used illicit drugs.</td></tr>
</table>

## useDimension

<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>medicalScore</td><td>Evidence that the drug has been used for medical purposes.</td></tr>
<tr><td>abuseScore</td><td>Evidence that there is illicit drug abuse by the patient.</td></tr>
</table>

## Other illicit drug features
<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>exposureScore</td><td>The patient has been exposed to second-hand illicit drugs, such as in utero or through second-hand marijuana smoke.</td></tr>
<tr><td>nonPatientScore</td><td>The illicit drug use does not apply to the patient. (For example: "She has a family history of polysubstance abuse.")</td></tr>
</table>


Note that additional features, such as the status and dimension events, only look at local context clues and do not try to reason across large distances in the text or multiple documents.  

### Sample Response

Consider the following sample text.

_He has a history of cocaine use, but quit 10 years ago._

The clinical insight features for "cocaine use" might look as follows:

```
"insightModelData": {
  "illicitDrug": {
    "usage": {
      "useScore": 1,
      "noneScore": 0,
      "discussedScore": 0
    },
    "useStatus": {
      "stoppedScore": 1,
      "neverScore": 0
    },
    "useDimension": {
      "medicalScore": 0,
      "abuseScore": 1
    },
    "exposureScore": 0,
    "nonPatientScore": 0
  }
}
```
