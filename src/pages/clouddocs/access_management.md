---

copyright:
  years: 2017, 2019
lastupdated: "2020-0903"

keywords: annotator clinical data, clinical data, annotation, certificates, SSL

subcollection: wh-acd

---

# Managing Access Roles

You can secure services within {{site.data.keyword.cloud_notm}} by allowing only users with specified access roles to complete certain actions.

## Platform access roles

You can use platform access roles to enable users to complete tasks on platform resources, such as provisioning or de-provisioning instances in your {{site.data.keyword.cloud_notm}} account.

| Action | Role
|:----------|:---------------|
| View instances of {{site.data.keyword.wh-acd_short}} | Administrator, Operator, Editor |
| Provision an instance of {{site.data.keyword.wh-acd_short}} | Administrator, Editor |
| De-provosion an instance of {{site.data.keyword.wh-acd_short}} | Administrator, Editor |

Table 1.  Predefined access roles

## Service access roles

You can use service access roles to enable users to perform service actions in the form of HTTP requests.

| Action | Role |
|:---------------|:--------------------|
| GET /wh-acd | Manager, Writer, Reader |
| POST /analyze | Manager, Writer, Reader |
| POST/PUT/DELETE /flow and /profiles | Manager, Writer |
| DELETE /user_data | Manager |

Table 2. Actions that are mapped to service access roles

For more information about user roles and permissions, see [User roles](/docs/iam?topic=iam-userroles#userroles).
