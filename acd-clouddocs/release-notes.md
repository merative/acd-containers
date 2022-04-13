---

copyright:
  years: 2019, 2021
lastupdated: "2019-09-21"

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

# Release notes
{: #release-notes}

The following sections document the new features and changes that were included for each release of the {{site.data.keyword.wh-acd_short}} service.
{: shortdesc}

## February 2022
{: #february-2022}
- Improved medication adverse event model with associatedAdverseEvent modifier links.

## November 2021
{: #november-2021}
- Initial release of substance use models for clinical insights.

## October 2021
{: #october-2021}

- Added support for UMLS 2021AA. UMLS 2018AA has been removed and 2019AA is now deprecated (will be removed in 2022 when we add support for UMLS 2022AA).

## August 2021
{: #aug-2021}
- Added support for disambiguation filters.

## June 2021
{: #june-2021}
- {{site.data.keyword.wh-acd_short}} container edition GA.
- Added relative date support to the temporal models.

## May 2021
{: #may-2021}
- Added support for custom fields in concept dictionaries.

## March 2021
{: #march-2021}
- Allow custom dictionaries to be enabled for expanded concept detection.

## February 2021
{: #feb-2021}
- Added support for vocabulary customization in the spell check service.

## November 2020
{: #november-2020}

- Initial release of temporal models.

## August 2020
{: #august-2020}

- Initial release of normality models for clinical insights.

## July 2020
{: #july-2020}

- Added support for UMLS 2020AA. UMLS 2017AA has been removed and 2018AA is now deprecated _(will be removed in 2021 when we add support for UMLS 2021AA)._

## April 2020
{: #april-2020}

- Initial release of clinical insight models for Diagnosis, Medication, and Procedure

## October 2019
{: #october-2019}

- Asynchronous (non-blocking) cartridge deployment APIs with persisted deployment status.

## September 2019
{: #september-2019}

- Added ability to apply spelling corrections from the spell check annotator for use by all service annotators.

## August 2019
{: #august-2019}

- Added support for UMLS 2019AA. UMLS 2016AB has been truncated and UMLS 2017AA is now deprecated _(will be removed in 2020 when we add support for UMLS 2020AA)._

## June 2019
{: #june-2019}

- When spelling corrections from the spell check annotator are present, the concept detection annotator will leverage those spelling corrections for entity detection.
- The {{site.data.keyword.wh-acd_full}} is now available in the {{site.data.keyword.cloud}} US South location for approved internal IBM solution providers.
- Support for attribute detection over derived concepts with longest span.

# Service API versioning
{: #service-api-versioning}

API requests require a version parameter that takes the date in the format version=YYYY-MM-DD. Send the version parameter with every API request.

When we change the API in a backwards-incompatible way, we release a new minor version. To take advantage of the changes in a new version, change the value of the version parameter to the new date. If you're not ready to update to that version, don't change your version date.
