---
title: "Release notes"
excerpt: "."
categories: Help
slug: release-notes
toc: true
---

<!-- ---

copyright:
  years: 2019, 2021
lastupdated: "2019-09-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Release notes -->

The following sections document the new features and changes that were included for each release of the Annotator for Clinical Data service.

## January 2023

- Added support for UMLS 2022AA. UMLS 2019AA has been removed and 2020AA is now deprecated (will be removed in 2023 when we add support for UMLS 2023AA).
- Added support to control whether the Hypothetical service uses internal triggers.
- Added support for the ACD debug flag in the ACD Python SDK.
- The prometheus metric names and label names for the ACD service have been changed to remove IBM from the names. The ACD metric names are documented [here.](https://merative.github.io/acd-containers/troubleshooting/logging-monitoring/#acd-metrics)

## October 2022

- Added support for defining groups of concept dictionaries for a cartridge that should participate together during longest span processing.
- Speed improvements to the clinical insight models.
- Improvements to the adverse drug event detection models.
- Added support for Clinical Associations, linking associated diagnoses, procedures, and sites in clinical text.

## June 2022

- Concept detection, medication, procedure, and symptom disease annotators now support medical code mappings. A Medical Code mapping represents a mapping of a UMLS Concept Identifier (CUI) to a medical code. This mapping provides the medical code for a term identified within the unstructured text.
- Added support for greedy temporal linking in the temporal models.
- Added support to symptom disease, procedure, cancer, and allergy annotators to output the complete set of medical codes that concept detection supports.

## February 2022

- Improved medication adverse event model with associatedAdverseEvent modifier links.

## November 2021

- Initial release of substance use models for clinical insights.

## October 2021

- Added support for UMLS 2021AA. UMLS 2018AA has been removed and 2019AA is now deprecated (will be removed in 2022 when we add support for UMLS 2022AA).

## August 2021

- Added support for disambiguation filters.

## June 2021

- Annotator for Clinical Data Service container edition GA.
- Added relative date support to the temporal models.

## May 2021

- Added support for custom fields in concept dictionaries.

## March 2021

- Allow custom dictionaries to be enabled for expanded concept detection.

## February 2021

- Added support for vocabulary customization in the spell check service.

## November 2020

- Initial release of temporal models.

## August 2020

- Initial release of normality models for clinical insights.

## July 2020

- Added support for UMLS 2020AA. UMLS 2017AA has been removed and 2018AA is now deprecated _(will be removed in 2021 when we add support for UMLS 2021AA)._

## April 2020

- Initial release of clinical insight models for Diagnosis, Medication, and Procedure

## October 2019

- Asynchronous (non-blocking) cartridge deployment APIs with persisted deployment status.

## September 2019

- Added ability to apply spelling corrections from the spell check annotator for use by all service annotators.

## August 2019

- Added support for UMLS 2019AA. UMLS 2016AB has been truncated and UMLS 2017AA is now deprecated _(will be removed in 2020 when we add support for UMLS 2020AA)._

## June 2019

- When spelling corrections from the spell check annotator are present, the concept detection annotator will leverage those spelling corrections for entity detection.
- The IBM Watson Annotator for Clinical Data Service is now available in the IBM Cloud US South location for approved internal IBM solution providers.
- Support for attribute detection over derived concepts with longest span.

## Service API versioning

API requests require a version parameter that takes the date in the format version=YYYY-MM-DD. Send the version parameter with every API request.

When we change the API in a backwards-incompatible way, we release a new minor version. To take advantage of the changes in a new version, change the value of the version parameter to the new date. If you're not ready to update to that version, don't change your version date.
