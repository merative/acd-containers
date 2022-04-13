---

copyright:
  years: 2017, 2019
lastupdated: "2020-0903"

keywords: annotator clinical data, clinical data, annotation, certificates, SSL

subcollection: wh-acd

---

{:new_window: target="_blank"}
{:shortdesc: .shortdesc}
{:screen: .screen}
{:pre: .pre}
{:table: .aria-labeledby="caption"}
{:codeblock: .codeblock}
{:tip: .tip}
{:note: .note}
{:important: .important}
{:deprecated: .deprecated}
{:download: .download}

# Managing Access Roles
{: #managing-access-roles}

You can secure services within {{site.data.keyword.cloud_notm}} by allowing only users with specified access roles to complete certain actions.
{: shortdesc}

## Platform access roles
{: #platform-access-roles}

You can use platform access roles to enable users to complete tasks on platform resources, such as provisioning or de-provisioning instances in your {{site.data.keyword.cloud_notm}} account.

| Action | Role
|:----------|:---------------|
| View instances of {{site.data.keyword.wh-acd_short}} | Administrator, Operator, Editor |
| Provision an instance of {{site.data.keyword.wh-acd_short}} | Administrator, Editor |
| De-provosion an instance of {{site.data.keyword.wh-acd_short}} | Administrator, Editor |

{: caption="Table 1. Actions that are mapped to platform access roles" caption-side="top"}

## Service access roles
{: #service-access-roles}

You can use service access roles to enable users to perform service actions in the form of HTTP requests.

| Action | Role |
|:---------------|:--------------------|
| GET /wh-acd | Manager, Writer, Reader |
| POST /analyze | Manager, Writer, Reader |
| POST/PUT/DELETE /flow and /profiles | Manager, Writer |
| DELETE /user_data | Manager |

{: caption="Table 2. Actions that are mapped to service access roles" caption-side="top"}

For more information about user roles and permissions, see [User roles](/docs/iam?topic=iam-userroles#userroles).
