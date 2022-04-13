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

# Substance Abuse Treatment Model (Experimental)
{: #substance_abuse_treatment}

The substance abuse treatment model provides information about any treatment for substance abuse problems (alcohol or illicit drugs) that apply to the patient.

![](images/substance_abuse_treatment.png)

The demo application above shows an example of how to use the scores from the substance abuse treatment model to create attributes.  In this example, "methadone program" has a high _treatment_ score and is promoted to a SubstanceAbuseTreatment attribute by the cartridge scoring rules. The example also has a high _compliance_ score and therefore the attribute is assigned a value of _compliance_.

The usage section of the JSON response indicates how substance abuse treatment applies to a patient.

## treatment

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>treatmentScore</td><td>There is evidence of substance abuse treatment about the patient, including treatment for either alcohol abuse or illicit drug abuse.</td></tr>
<tr><td>discussedScore</td><td>Evidence that substance abuse treatment has been discussed with the patient.</td></tr>
<tr><td>compliance</td><td>Evidence that the patient has been compliant with substance abuse treatment.</td></tr>
</table>

## Other substance abuse treatment features
<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>nonPatientScore</td><td>The substance abuse treatment mentioned does not apply to the patient. (For example: "Her father attends AA meetings.")</td></tr>
</table>

## Sample Response

Consider the following sample text.

_History of polysubstance abuse, in a methadone program._

The clinical insight features for "methadone maintenance" might look as follows:

```
"insightModelData": {
  "substance": {
    "treatment": {
      "discussedScore": 0,
      "complianceScore": 0.999
    },
    "treatmentScore": 1,
    "nonPatientScore": 0
  }
}
```
