---

copyright:
  years: 2020
lastupdated: "2020-11-11"

keywords: data encryption in {{site.data.keyword.wh-acd_short}}, data storage for {{site.data.keyword.wh-acd_short}}, bring your own keys for {{site.data.keyword.wh-acd_short}}, BYOK for {{site.data.keyword.wh-acd_short}}, key management for {{site.data.keyword.wh-acd_short}}, key encryption for {{site.data.keyword.wh-acd_short}}, personal data in {{site.data.keyword.wh-acd_short}}, data deletion for {{site.data.keyword.wh-acd_short}}, data in {{site.data.keyword.wh-acd_short}}, data security in {{site.data.keyword.wh-acd_short}}

subcollection: wh-acd

---

{:external: target="_blank" .external}
{:shortdesc: .shortdesc}
{:screen: .screen}
{:pre: .pre}
{:table: .aria-labeledby="caption"}
{:codeblock: .codeblock}
{:tip: .tip}


# Securing your data in {{site.data.keyword.wh-acd_short}}
{: #mng-data}

To ensure that you can securely manage your data when you use {{site.data.keyword.wh-acd_short}}, it is important to know exactly what data is stored and encrypted and how you can delete any stored personal data. Data encryption by using customer-managed keys is supported by using {{site.data.keyword.cos_short}} (COS) and {{site.data.keyword.keymanagementservicelong_notm}} with {{site.data.keyword.wh-acd_short}}.
{: shortdesc}


## How your data is stored and encrypted in {{site.data.keyword.wh-acd_short}}
{: #data-storage}

User configuration data is encrypted and stored in {{site.data.keyword.cos_short}} using {{site.data.keyword.keymanagementserviceshort}}. For more information on {{site.data.keyword.cos_short}}'s integration with {{site.data.keyword.keymanagementserviceshort}} visit [{{site.data.keyword.cos_short}}'s encryption documentation](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-encryption).

{{site.data.keyword.wh-acd_short}} does not store the unstructured data submitted to the /analyze APIs for analysis. The only user data stored is the optional configuration data submitted in the form of a cartridge to the /deploy API as well as an any profiles or flows a user may optionally define outside of a cartridge deployment.

## Protecting your sensitive data in {{site.data.keyword.wh-acd_short}}
{: #data-encryption}

You can add a higher level of encryption protection and control to your data at rest (when it is stored) and data in motion (when it is transported) by enabling integration with {{site.data.keyword.cos_short}} and {{site.data.keyword.keymanagementserviceshort}}.

The data that you store in {{site.data.keyword.cloud_notm}} is encrypted at rest by using a randomly generated key. If you need to control the encryption keys, you can integrate {{site.data.keyword.cos_short}} and {{site.data.keyword.keymanagementserviceshort}}. This process is commonly referred to as Bring your own keys (BYOK). With {{site.data.keyword.cos_short}} and {{site.data.keyword.keymanagementserviceshort}} you can create, import, and manage encryption keys. You can assign access policies to the keys, assign users or service IDs to the keys, or give the key access only to a specific service.


### About customer-managed keys
{: #about-encryption}

{{site.data.keyword.cos_short}} uses envelope encryption to implement customer-managed keys. Envelope encryption describes encrypting one encryption key with another encryption key. The key used to encrypt the actual data is known as a data encryption key (DEK). The DEK itself is never stored but is wrapped by a second key that is known as the key encryption key (KEK) to create a wrapped DEK. To decrypt data, the wrapped DEK is unwrapped to get the DEK. This process is possible only by accessing the KEK, which in this case is your root key that is stored in {{site.data.keyword.keymanagementserviceshort}}.

{{site.data.keyword.keymanagementserviceshort}} keys are secured by FIPS 140-2 Level 3 certified cloud-based hardware security modules (HSMs).


### Enabling customer-managed keys for {{site.data.keyword.wh-acd_short}}
{: #using-byok}

Customer-managed keys for {{site.data.keyword.wh-acd_short}} depends on the following setup:

1. {{site.data.keyword.keymanagementserviceshort}} setup

   1.1. Create or reuse a {{site.data.keyword.keymanagementserviceshort}} instance. You must be the account owner or administrator.

   1.2. Create or reuse a root key.

2. {{site.data.keyword.cos_short}} setup

   2.1. Create or reuse a {{site.data.keyword.cos_short}} instance with a dedicated bucket. This must exist in the same account as the {{site.data.keyword.keymanagementserviceshort}} instance. You must have at least the viewer role. For performance, the bucket must reside in the same region as the {{site.data.keyword.wh-acd_short}} instance.

   2.2. Use Identity and Access Management (IAM) to authorize access between the {{site.data.keyword.cos_short}} instance and {{site.data.keyword.keymanagementserviceshort}} instance.

3. {{site.data.keyword.wh-acd_short}} setup

   3.1. Create or reuse a {{site.data.keyword.cos_short}} instance. This must exist in the same account as the {{site.data.keyword.wh-acd_short}} instance. You must have at least the viewer role.

   3.2. Use IAM to grant the {{site.data.keyword.wh-acd_short}} instance access to {{site.data.keyword.cos_short}} instance.

   3.3. Call the [Resource Controller update resource instance API](https://cloud.ibm.com/apidocs/resource-controller/resource-controller#update-resource-instance) to switch the {{site.data.keyword.wh-acd_short}} instance to using the {{site.data.keyword.cos_short}} instance.

Setting the {{site.data.keyword.wh-acd_short}} instance to use customer-managed bucket and keys.
```
curl -X PATCH https://resource-controller.cloud.ibm.com/v2/resource_instances/{id} \
    -H 'Authorization: Bearer {token}' \
    -H 'Content-Type: application/json' \
    -d '{"parameters": {
           "bucket_name": "<COS Bucket Name>"}
        }'
```

Resetting the {{site.data.keyword.wh-acd_short}} instance to use provided IBM Cloud environment's bucket.
```
curl -X PATCH https://resource-controller.cloud.ibm.com/v2/resource_instances/{id} \
    -H 'Authorization: Bearer {token}' \
    -H 'Content-Type: application/json' \
    -d '{"parameters": {
           "bucket_name": ""}
        }'
```


### Working with customer-managed keys for {{site.data.keyword.wh-acd_short}}
{: #working-with-keys}

Customer-managed keys provide a number of functions including temporarily or permanently preventing access to customer owned configuration data. If access is removed, the {{site.data.keyword.wh-acd_short}} instance will be unable to successfully process requests that require this configuration data. For more details on preforming these key tasks, visit the [Watson and IBM Cloud documentation](https://cloud.ibm.com/docs/watson?topic=watson-keyservice#keyservice-using).


## Deleting your data in {{site.data.keyword.wh-acd_short}}
{: #data-delete}

APIs for deleting user configuration data (flows, profiles, or all data for an instance) are provided and can be found under the [{{site.data.keyword.wh-acd_short}} API reference](https://cloud.ibm.com/apidocs/wh-acd).


### Deleting {{site.data.keyword.wh-acd_short}} instances
{: #service-delete}

The {{site.data.keyword.wh-acd_short}} data retention policy describes how long your data is stored after you delete the service. The data retention policy is included in the {{site.data.keyword.wh-acd_short}} service description, which you can find in the [{{site.data.keyword.cloud_notm}} Terms and Notices](/docs/overview?topic=overview-terms).
