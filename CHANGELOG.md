# Changelog

All notable changes to this project will be documented in this file.

See Annotator for Clinical Data [release notes](https://github.com/merative/acd-containers/blob/master/src/pages/clouddocs/release-notes.md) for latest features.

See [Annotator for Clinical Data Configuration Editor Bundle](https://github.com/merative/acd-containers/tree/master/config-editor) for the full list of Configuration Editor versions available. When upgrading, you are encouraged to keep the ACD Container Edition and the ACD Configuration Editor versions aligned.

## Releases from Merative

### v2.0 - build v2.0.202305021827

- Refresh of Annotator for Clinical Data Service and each of its annotators.
- Refresh of the Annotator for Clinical Data Configuration Editor [bundle](https://github.com/merative/acd-containers/blob/master/config-editor/config-editor-2023050xxxxx.tar).
- When upgrading, v2.0.202305021827 replaces either v2.0.202301181807 or v2.0.202304241329.

### v2.0 - build v2.0.202304241329

- Refresh of Annotator for Clinical Data Service and each of its annotators.
- Red Hat OpenShift Container Platform (OCP) 4.10 or later supported.
- When upgrading, v2.0.202304241329 replaces v2.0.202301181807.

### v2.0 - build v2.0.202301181807

- Upgrade support using Openshift Operator Lifecycle Manager.
- Refresh of Annotator for Clinical Data Service and each of its annotators.
- ACD license use type for the Configuration Editor added. See [License Tracking](https://merative.github.io/acd-containers/installing/license-tracking/) documentation.
- Red Hat OpenShift Container Platform (OCP) 4.8 or later supported.
- When upgrading, v2.0.202301181807 replaces v2.0.202210180304.

### v2.0 - build v2.0.202210180304

- Initial release of Merative Annotator for Clinical Data Container Edition

## Releases from IBM

### v2.0 - build v2.0.202206131755

- Refresh of Annotator for Clinical Data Service and each of its annotators.

### v2.0 - build v2.0.202204121438

- Refresh of Annotator for Clinical Data Service and each of its annotators.
- Revert prior changes to align with entitled registry multiple geography support. Continue to use cp.icr.io as the domain for entitled images.
- When using the upgrade path, this update replaces version v2.0.202201172016, skipping the v2.0.202202212213 update.
- **NOTICE: Redeploy custom cartridges if using multitenancy.** This is required due to a change in handling special characters written out to the artifact store, such as those in a tenant ID. This is only required if using custom cartridges and multiple tenants, and should be done immediately after this upgrade.

### v2.0 - build v2.0.202202212213

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Improved medication adverse event model with associatedAdverseEvent modifier links.
- Align with changes to entitled registry, moving from cp.icr.io to icr.io

### v2.0 - build v2.0.202201172016

- Refresh of Annotator for Clinical Data Service and each of its annotators

### v2.0 - build v2.0.202111232118

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Initial release of substance use models for clinical insights.

### v2.0 - build v2.0.202110211739

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Added support for UMLS 2021AA. UMLS 2018AA has been removed and 2019AA is now deprecated (will be removed in 2022 when we add support for UMLS 2022AA).

### v2.0 - build v2.0.202110010226

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Added support for disambiguation filters.

### v2.0 - build v2.0.202109100417

- Security update

### v2.0 - build v2.0.202109011707

- Openshift Operator Lifecycle Manager integration for upgrades
- Refresh of Annotator for Clinical Data Service and each of its annotators

### v2.0 - build v2.0.202106231922

- Initial Release of Annotator for Clinical Data Container Edition
