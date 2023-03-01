---
title: "Clinical Insights Cartridge"
excerpt: "."
categories: Clinical Insights
slug: clinical_insights_cartridge
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2011, 2023               -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->

<!-- # Clinical Insights Cartridge -->

The Clinical Insights Cartridge is a default configuration set that ships with Annotator for Clinical Data that uses the low level insight model scores to promote annotations that apply to the patient to one of the following known [attribute](/clouddocs/annotator_attribute_detection/) types.

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

If you need different behavior than what the default cartridge provides, you can extend the default Clinical Insights Cartridge using the Annotator for Clinical Data Configuration Editor.  See the [Customizing](/usage/customizing/) section for more information.  Options for extending the cartridge include:

1. Adding your own candidate annotations from custom dictionaries.  For example, if there is a medication that the Annotator for Clinical Data does not annotate by default, you could add that to a custom dictionary and then ensure entries from your custom dictionary are scored by the insights medication model.

2. Changing the scoring thresholds used to promote candidate annotations to one of the attributes noted above.  Your application needs may necessitate different scoring thresholds than what the default cartridge provides.  You can extend the default cartridge and change the scoring thresholds used for each attribute noted above.
