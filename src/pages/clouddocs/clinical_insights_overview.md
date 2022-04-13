---
title: "Clinical Insights Overview"
excerpt: "."
categories: Clinical Insights
slug: clinical_insights_overview
toc: true
---
<!-- ---

copyright:
  years: 2020
lastupdated: "2020-02-11"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Clinical Insights Overview -->

The clinical insights feature is a ready-to-use annotation capability within Annotator for Clinical Data that provides contextual information for problems, procedures, and medications identified in unstructured text.  It is composed of two parts:

1. Models that provide domain-specific context for various types of clinical information (medication, diagnosis, procedure, and normality).
2. Ready-to-use cartridge that answers a simple question - is the given information relevant to the patient?

There is an online [demo application](https://acd-try-it-out.mybluemix.net/preview) for the clinical insights cartridge.

![demo app](../../images/demoApp.png)

The default attributes that are defined in the clinical insights cartridge can be customized.

You can use the Annotator for Clinical Data Configuration Editor to [customize attributes](/docs/wh-acd?topic=wh-acd-customizing#customizing) using the clinical insight model scores and other contextual information provided by {Annotator for Clinical Data.

## Models

Each model contributes contextual features to annotations that are either produced by standard {{site.data.keyword.wh-acd_short}} annotators or from custom annotations you create using the Annotator for Clinical Data Configuration Editor.  The Clinical Insights Models include:

1. [Medication](/docs/wh-acd?topic=wh-acd-clinical_insights_medication#clinical_insights_medication)
2. [Procedure](/docs/wh-acd?topic=wh-acd-clinical_insights_procedure#clinical_insights_procedure)
3. [Diagnosis](/docs/wh-acd?topic=wh-acd-clinical_insights_diagnosis#clinical_insights_diagnosis)
4. [Normality - Experimental](/docs/wh-acd?topic=wh-acd-clinical_insights_normality#clinical_insights_normality)
5. [Temporal - Experimental](/docs/wh-acd?topic=wh-acd-temporal_overview#temporal_overview)
6. [Substance Use - Experimental](/docs/wh-acd?topic=wh-acd-substance_use_overview#substance_use_overview)
