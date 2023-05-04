---
title: "Release notes"
excerpt: "."
categories: Help
slug: release-notes
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2019, 2023               -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


<!-- # Release notes -->

The following sections document the new features and changes that were included for each release of the Annotator for Clinical Data service.

## May 2023

- Fixed a problem introduced in the April release that affected ACD concurrent processing.

## April 2023

- The naming convention for environment variables has been changed from com_ibm_watson_health_* to clinical_data_annotator_\*. Any deployment that was setting com_ibm_watson_health_* environment variables should switch to the clinical_data_annotator_* naming convention.
- The following experimental annotators have been deprecated. They will be removed at some point in the future.
    - Allergy, Bathing Assistance, Cancer, Dressing Assistance, Eating Assistance, Ejection Fraction, Seeing Assistance, Smoking, Toileting Assistance,  and Walking Assistance.
- Fixed an exception in the Concept Detection service that could occur in concept inferencing processing when the text does not contain punctuation. This problem would result in ACD returning a 500 exception.
- Fixed an exception in the Negation Detection service that could occur if a negation annotation was created without a trigger and a negation filter attempted to filter based on trigger information. This problem would result in ACD returning a 500 exception.
- Improved the internal processing of ACD when a micro-service is unavailable. This should result in fewer ACD 500 exceptions. 
- Derived concept changes:
    - Added support for propagating embedded custom values in a derived concept value.
    - Added support for propagating medical codes for derived concept values.
    - Added support for deriving a custom value.
    - Added support to allow the covered text or preferred name of a selected concept in a derived concept to populate a field on the output annotation.
- Attribute changes:
    - Added support for matching an attribute over a derived concept value backed by an ACI Medication or ACI Lab Value annotation.
    - Added support to find secondary annotations in a derived concept value from the derived from trail (not by matching CUIs).
    - Added support to allow matching CUI from the derived concept value.
    - Added support to propagate fields from the derived concept value first and use the secondary annotation as a fallback option.
    - Added support to promote dimension, frequency, and duration to the attribute if they exist in a derived concept value annotation.
- Configuration Editor
    - Added support to include linked attributes when exporting dictionary concepts.
    - Integrated attribute search in the dictionary and UMLS concept views
    - Context menus have been added to concept identifier and type tag fields to allow cut, paste, and delete of individual tags.
    - A warning message is shown if a flow contains a deprecated service.   
- Added warning messages logged at runtime when a processed ACD flow contains deprecated services.
- Updated the documentation to reflect the new Merative ACD product branding.
- ACD Prometheus metrics changes:
    - The Prometheus PodMonitor is now created by default. 
    - The ACD metric clinical_data_annotator_api_calls_count renamed to clinical_data_annotator_api_calls_count_total
    - See the [documentation](https://merative.github.io/acd-containers/troubleshooting/logging-monitoring/#enabling-and-configuring-acd-prometheus-metrics) for details.
- ACD SDK Version 2 Announcement:
    - Version 2 is now considered the supported version of the ACD SDK. Code changes are required to migrate from Version 1 to Version 2. Migrating from Version 1 to Version 2 is recommended, as Version 1 will be deprecated.  Refer to the following for more information:
    - ACD Java SDK
        - [Readme](https://github.com/merative/acd-java-sdk/blob/master/README.md)
        - [Migration documentation](https://github.com/merative/acd-java-sdk#migrating-from-version-1xx)
        - [API documentation](https://merative.github.io/acd-containers/apidocs/index.html?java#annotator-for-clinical-data-acd)
    - ACD Python SDK
        - [Readme](https://github.com/merative/acd-python-sdk/blob/master/README.md)
        - [Migration documentation](https://github.com/merative/acd-python-sdk#migrating-from-version-1xx)
        - [API documentation](https://merative.github.io/acd-containers/apidocs/index.html?python#annotator-for-clinical-data-acd)

## January 2023

- Fixed a problem in how filters were processed by the Negation and Hypothetical Detection services.  In a multi-threaded environment this could result in an exception or filters not being processed correctly.
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
