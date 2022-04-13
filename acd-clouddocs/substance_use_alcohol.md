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

# Substance Use Alcohol Model (Experimental)
{: #substance_use_alcohol}

The substance use alcohol model provides information about the alcohol usage that applies to the patient.

![](images/alcohol.png)

The demo application above shows an example of how to use the scores from the substance use alcohol model to create attributes.  In this example, "drinks alcohol" has a high _use_ score and is promoted to an AlcoholUse attribute by the cartridge scoring rules. The example also has a high _light_ score which results in promotion of an AlcoholUseLevel attribute with a value of _light_.

The usage section of the JSON response indicates how the alcohol usage applies to a patient.

## usage

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>useScore</td><td>Evidence that there has been alcohol use by the patient.</td></tr>
<tr><td>noneScore</td><td>Evidence that there has been no alcohol use by the patient.</td></tr>
<tr><td>discussedScore</td><td>Other mentions of alcohol that do not directly apply to the patient (For example:  "Do not drink alcohol while taking narcotic pain medication.")</td></tr>
</table>

## useStatus

<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>stoppedScore</td><td>Evidence that the patient is a former alcohol user.</td></tr>
<tr><td>neverScore</td><td>Evidence that the patient has never consumed alcohol.</td></tr>
</table>

## useQualifier

<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>lightScore</td><td>Evidence that the patient is a light consumer of alcohol.</td></tr>
<tr><td>moderateScore</td><td>Evidence that the patient is a moderate consumer of alcohol.</td></tr>
<tr><td>heavyScore</td><td>Evidence that the patient is a heavy consumer of alcohol.</td></tr>
<tr><td>abuseScore</td><td>Evidence that the patient has abused alcohol.</td></tr>
</table>

## Other alcohol features
<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>exposureScore</td><td>The patient has been exposed to second-hand alcohol usage, such as in utero.</td></tr>
<tr><td>nonPatientScore</td><td>The alcohol use mentioned does not apply to the patient. (For example: "Patient's father was an alcoholic".)</td></tr>
</table>


Note that additional features, such as the status and qualifier events, only look at local context clues and do not try to reason across large distances in the text or multiple documents.  

### Sample Response

Consider the following sample text.

_She drinks alcohol occasionally._

The clinical insight features for "drinks alcohol" might look as follows:

```
"insightModelData": {
  "alcohol": {
    "usage": {
      "useScore": 1,
      "noneScore": 0,
      "discussedScore": 0
    },
    "useStatus": {
      "stoppedScore": 0,
      "neverScore": 0
    },
    "useQualifier": {
      "lightScore": 1,
      "moderateScore": 0,
      "heavyScore": 0,
      "abuseScore": 0
    },
    "exposureScore": 0,
    "nonPatientScore": 0
  }
}
```
