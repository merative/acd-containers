---

copyright:
  years: 2020
lastupdated: "2020-04-21"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Responsibilities for Annotator for Clinical Data

Learn about the management responsibilities and terms and conditions that you have when you use IBM Watson Annotator for Clinical Data Service. For a high-level view of the service types in IBM Cloud and the breakdown of responsibilities between the customer and IBM for each type, see Shared responsibilities for IBM Cloud offerings.

Review the following sections for the specific responsibilities for you and for IBM when you use IBM Watson Annotator for Clinical Data Service. For the overall terms of use, see IBM Cloud Terms and Notices.

## Disaster recovery

| Task | IBM Responsibilities | Your Responsibilities |
|----------|-----------------------|--------|
| <ul><li>Host service in multiple regions</li><li>Load-balance requests across multiple data centers per region</li><li>Back up user configuration data daily</li></ul> | <ul><li>Host service in multiple regions</li><li>Load-balance requests across multiple data centers per region</li><li>Back up user configuration data daily</li></ul>  | <ul><li>Back up service configuration artifacts: annotator flows, profiles, cartridges.<ul><li>For annotator flows and profiles, use the GET /flows/{id} and GET /profiles/{id} API calls to retrieve and backup these configurations.</li><li>For cartridge artifacts, export the cartridge source from the {{site.data.keyword.wh-acd_short}} Configuration Editor and backup the files.</li></ul></li><li>Provision service instances in multiple regions</li><li>In the event one region becomes unavailable, restore configuration artifacts from backup or keep configuration artifacts in sync across regions</li><li>Update the service endpoint and api key in your solution to begin leveraging the service in an alternate region</li></ul> |
Table 1. Responsibilites for disaster recovery
