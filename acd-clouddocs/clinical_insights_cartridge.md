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

# Clinical Insights Cartridge
{: #clinical_insights_cartridge}

The Clinical Insights Cartridge is a default configuration set that ships with {{site.data.keyword.wh-acd_short}} that uses the low level insight model scores to promote annotations that apply to the patient to one of the following known [attribute](/docs/wh-acd?topic=wh-acd-attribute_detection#attribute_detection) types.

1. Diagnosis
2. PotentialDiagnosis
3. PatientReportedCondition
4. TherapeuticProcedure
5. DiagnosticProcedure
6. PendingTherapeuticProcedure
7. PendingDiagnosticProcedure
8. PrescribedMedication
9. MedicationAdverseEvent
10. MedicationAllergy
11. AbnormalFinding
12. NormalFinding
13. LabValue

These attributes can be thought of as the result of a distillation step where all candidate annotations are considered, but only those that apply to the patient get promoted to attributes.

If you need different behavior than what the default cartridge provides, you can extend the default Clinical Insights Cartridge using the {{site.data.keyword.wh-acd_short}} Configuration Editor.  See the [Customizing](/docs/wh-acd?topic=wh-acd-customizing#customizing) section for more information.  Options for extending the cartridge include:

1. Adding your own candidate annotations from custom dictionaries.  For example, if there is a medication that the {{site.data.keyword.wh-acd_short}} does not annotate by default, you could add that to a custom dictionary and then ensure entries from your custom dictionary are scored by the insights medication model.

2. Changing the scoring thresholds used to promote candidate annotations to one of the attributes noted above.  Your application needs may necessitate different scoring thresholds than what the default cartridge provides.  You can extend the default cartridge and change the scoring thresholds used for each attribute noted above.
