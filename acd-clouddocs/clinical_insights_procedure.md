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

# Clinical Insights Procedure Model
{: #clinical_insights_procedure}

The procedure model provides information about how the procedure applies to the the patient and other classification information about the procedure.

![](images/procedure.png)

The demo application above shows an example of how to use the scores from the procedure model to create attributes.  In this example, Chemotherapy has a high _discussed_ score and is not promoted to an attribute.  Radiotherapy does apply to the patient in this example and is promoted to an attribute.

The usage section of the JSON response indicates how a procedure applies to a patient.

## usage

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>explicitScore</td><td>The procedure has been done.</td></tr>
<tr><td>pendingScore</td><td>The procedure has been scheduled or is highly recommended by a physician.</td></tr>
<tr><td>discussedScore</td><td>Other mentions of the procedure that do not directly apply to the patient.</td></tr>
</table>


## task

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>therapeuticScore</td><td>This procedure is meant to treat a condition.</td></tr>
<tr><td>diagnosticScore</td><td>This procedure is meant to diagnose a condition.</td></tr>
<tr><td>surgicalTaskScore</td><td>This procedure is a subtask of a larger surgical process.</td></tr>
<tr><td>clinicalAssessmentScore</td><td>This procedure is a physician's evaluation of a patient.</td></tr>
<tr><td>labTestScore</td><td>This procedure is a lab test.</td></tr>
</table>

## type

<table>
<tr><th>Feature</th><th>Description</th></tr>
</tr><td>deviceScore</td><td>The procedure involves an implanted device.</td></tr>
<tr><td>materialScore</td><td>The procedure involves grafts or other material implants.</td></tr>
<tr><td>medicationScore</td><td>The procedure involves the administration of a medication.</td></tr>
<tr><td>conditionManagementScore</td><td>An ongoing procedure to manage a long term condition.</td></tr>
<tr><td>procedureScore</td><td>Any other type of procedure.</td></tr>
</table>

## Sample Response

Consider the following sample text.

_Chemotherapy with Cisplatin was not an option for his type of cancer._

The clinical insight features for Chemotherapy might look as follows:

```
"insightModelData": {
	"procedure": {
		"usage": {
			"explicitScore": 0.035,
			"pendingScore": 0.002,
			"discussedScore": 0.963
		},
		"task": {
			"therapeuticScore": 0.999,
			"diagnosticScore": 0,
			"surgicalTaskScore": 0.001,
			"clinicalAssessmentScore": 0
		},
		"type": {
			"deviceScore": 0,
			"materialScore": 0,
			"medicationScore": 0.994,
			"procedureScore": 0.005,
			"conditionManagementScore": 0
		}
	}
}
```
