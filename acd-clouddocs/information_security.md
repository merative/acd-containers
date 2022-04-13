---

copyright:
  years: 2015, 2019
lastupdated: "2019-05-29"

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}

# Information security
{: #information-security}

IBM is committed to providing our clients and partners with innovative data privacy, security and governance solutions.
{: shortdesc}

**Notice:**
Clients are responsible for ensuring their own compliance with various laws and regulations, including the European Union General Data Protection Regulation. Clients are solely responsible for obtaining advice of competent legal counsel as to the identification and interpretation of any relevant laws and regulations that may affect the clients’ business and any actions the clients may need to take to comply with such laws and regulations.

The products, services, and other capabilities described herein are not suitable for all client situations and may have restricted availability. IBM does not provide legal, accounting or auditing advice or represent or warrant that its services or products will ensure that clients are in compliance with any law or regulation.

If you need to request GDPR support for {{site.data.keyword.cloud}} {{site.data.keyword.watson}} resources that are created

-   In the European Union (EU), see [Requesting support for IBM Cloud Watson resources created in the European Union](/docs/services/watson?topic=watson-gdpr-sar#request-EU).
-   Outside of the EU, see [Requesting support for resources outside the European Union](/docs/services/watson/?topic=watson-gdpr-sar#request-non-EU).

## European Union General Data Protection Regulation (GDPR)
{: #gdpr}

IBM is committed to providing our clients and partners with innovative data privacy, security and governance solutions to assist them on their journey to GDPR compliance.

Learn more about IBM's own GDPR readiness journey and our GDPR capabilities and offerings to support your compliance journey [here ![External link icon](../../icons/launch-glyph.svg "External link icon")](http://www.ibm.com/gdpr){: new_window}.

## Health Insurance Portability and Accountability Act (HIPAA)
{: #hipaa}

{{site.data.keyword.wh-acd_short}} is a US Health Insurance Portability and Accountability Act (HIPAA) enabled service and can be used for passing PHI data for analysis.  PHI data should not be stored in any configuration data.  To enable your IBM Cloud account for HIPAA see [enabling account for HIPAA](/docs/account?topic=account-enabling-hipaa){: external}.

## Deleting User Data
{: #gdpr-in-service}

{{site.data.keyword.wh-acd_short}} does not store the unstructured data submitted to the /analyze APIs for analysis. The only user data stored is the optional configuration data submitted in the form of a cartridge to the /deploy API as well as an any profiles or flows a user may optionally define outside of a cartridge deployment. Cartridge artifacts, flows, and profiles are persisted centrally and distributed to service nodes and cached locally on the node. Delete APIs are provided for flows and profiles and there is a delete /user_data API available for removing persisted user data associated with an service instance. Deprovisioning your service instance will remove all instance specific data artifacts from the master database within 7 days as well as from the local cache on all service nodes. Backups of user data are created daily for disaster recovery; these backups are deleted after 60 days.
