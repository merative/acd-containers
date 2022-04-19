# Changelog

All notable changes to this project will be documented in this file.

See Annotator for Clinical Data [release notes](https://cloud.ibm.com/docs/wh-acd?topic=wh-acd-release-notes) for latest features.

## Releases

## v2.0 - build v2.0.202204121438

- Refresh of Annotator for Clinical Data Service and each of its annotators.
- Revert prior changes to align with entitled registry multiple geography support. Continue to use cp.icr.io as the domain for entitled images.
- When using the upgrade path, this update replaces version v2.0.202201172016, skipping the v2.0.202202212213 update.
- **NOTICE: Redeploy custom cartridges if using multitenancy.** This is required due to a change in handling special characters written out to the artifact store, such as those in a tenant ID. This is only required if using custom cartridges and multiple tenants, and should be done immediately after this upgrade.

## v2.0 - build v2.0.202202212213

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Improved medication adverse event model with associatedAdverseEvent modifier links.
- Align with changes to entitled registry, moving from cp.icr.io to icr.io

## v2.0 - build v2.0.202201172016

- Refresh of Annotator for Clinical Data Service and each of its annotators

## v2.0 - build v2.0.202111232118

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Initial release of substance use models for clinical insights.

## v2.0 - build v2.0.202110211739

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Added support for UMLS 2021AA. UMLS 2018AA has been removed and 2019AA is now deprecated (will be removed in 2022 when we add support for UMLS 2022AA).

## v2.0 - build v2.0.202110010226

- Refresh of Annotator for Clinical Data Service and each of its annotators
  - Added support for disambiguation filters.

## v2.0 - build v2.0.202109100417

- Security update

## v2.0 - build v2.0.202109011707

- Openshift Operator Lifecycle Manager integration for upgrades
- Refresh of Annotator for Clinical Data Service and each of its annotators

## v2.0 - build v2.0.202106231922

- Initial Release of Annotator for Clinical Data Container Edition

[Released]: https://github.com/ibm/repo-template/compare/v0.0.1...HEAD
[2.0.0]: https://github.com/ibm/repo-template/releases/tag/v0.0.1
