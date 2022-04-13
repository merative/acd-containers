---

copyright:
  years: 2020
lastupdated: "2020-02-11"

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

# Clinical Insights Diagnosis Model
{: #clinical_insights_diagnosis}


The diagnosis model provides usage information and other features about the diagnosis.

![](images/diagnosis.png)

The demo application above shows an example of how to use the scores from the diagnosis model to create attributes.  In this example, stage II breast cancer has a high _explicit_ score and is promoted to an attribute.

The usage section of the JSON response indicates how a diagnosis applies to the patient.

## usage

<table>
<tr><th>Feature</th><th>Description</th></tr>

<tr><td>explicitScore</td><td>The diagnosis applies to the patient.</td></tr>
<tr><td>patientReportedScore</td><td>The diagnosis is reported by the patient.</td></tr>
<tr><td>discussedScore</td><td>The diagnosis does not apply to the patient.</td></tr>
</table>

## Other diagnosis features
<table>
<tr><th>Feature</th><th>Description</th></tr>
<tr><td>suspectedScore</td><td>The diagnosis is probable, but not necessarily confirmed.</td></tr>
<tr><td>symptomScore</td><td>The diagnosis is a symptom versus a primary condition.</td></tr>
<tr><td>traumaScore</td><td>The diagnosis is a physical trauma.</td></tr>
<tr><td>familyHistoryScore</td><td>The diagnosis applies to a family member and not the patient.</td></tr>
</table>

### Sample Response

Consider the following sample text.

_Pathologic evidence suggests that the patient has stage II breast cancer_

The clinical insights features for stage II breast cancer might look as follows:

```
"insightModelData": {
	"diagnosis": {
		"usage": {
			"explicitScore": 1,
			"patientReportedScore": 0,
			"discussedScore": 0
		},
		"suspectedScore": 0.517,
		"symptomScore": 0,
		"traumaScore": 0,
		"familyHistoryScore": 0
	}
}
```
