---

copyright:
  years: 2020
lastupdated: "2020-11-11"

keywords: data encryption in {{site.data.keyword.wh-acd_short}}, data storage for {{site.data.keyword.wh-acd_short}}, bring your own keys for {{site.data.keyword.wh-acd_short}}, BYOK for {{site.data.keyword.wh-acd_short}}, key management for {{site.data.keyword.wh-acd_short}}, key encryption for {{site.data.keyword.wh-acd_short}}, personal data in {{site.data.keyword.wh-acd_short}}, data deletion for {{site.data.keyword.wh-acd_short}}, data in {{site.data.keyword.wh-acd_short}}, data security in {{site.data.keyword.wh-acd_short}}

subcollection: wh-acd

---

# Securing your data in Annotator for Clinical Data

To ensure that you can securely manage your data when you use Annotator for Clinical Data, it is important to know exactly what data is stored and encrypted and how you can delete any stored personal data. Data encryption by using customer-managed keys is supported by using IBM Cloud Object Store (COS) and IBM Cloud Key Management Service with Annotator for Clinical Data.


## How your data is stored and encrypted in Annotator for Clinical Data

User configuration data is encrypted and stored in Cloud Object Store using Key Manageemnt Service. For more information on Cloud Object Store's integration with Key Management Service visit [Object Storage's encryption documentation.](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-encryption)

Annotator for Clinical Data does not store the unstructured data submitted to the /analyze APIs for analysis. The only user data stored is the optional configuration data submitted in the form of a cartridge to the /deploy API as well as an any profiles or flows a user may optionally define outside of a cartridge deployment.

## Protecting your sensitive data in Annotator for Clinical Data

You can add a higher level of encryption protection and control to your data at rest (when it is stored) and data in motion (when it is transported) by enabling integration with Cloud Object Store and Key Management Service.

The data that you store in IBM Cloud is encrypted at rest by using a randomly generated key. If you need to control the encryption keys, you can integrate Cloud Object Store and Key Management Service. This process is commonly referred to as Bring your own keys (BYOK). With Cloud Object Store and Key Management Service you can create, import, and manage encryption keys. You can assign access policies to the keys, assign users or service IDs to the keys, or give the key access only to a specific service.


### About customer-managed keys

Cloud Object Store uses envelope encryption to implement customer-managed keys. Envelope encryption describes encrypting one encryption key with another encryption key. The key used to encrypt the actual data is known as a data encryption key (DEK). The DEK itself is never stored but is wrapped by a second key that is known as the key encryption key (KEK) to create a wrapped DEK. To decrypt data, the wrapped DEK is unwrapped to get the DEK. This process is possible only by accessing the KEK, which in this case is your root key that is stored in Key Management Service.

Key Management Service keys are secured by FIPS 140-2 Level 3 certified cloud-based hardware security modules (HSMs).


### Enabling customer-managed keys for Annotator for Clinical Data

Customer-managed keys for Annotator for Clinical Data depends on the following setup:

1. Key Management Service setup

   1.1. Create or reuse a Key Management Service instance. You must be the account owner or administrator.

   1.2. Create or reuse a root key.

2. Cloud Object Store setup

   2.1. Create or reuse a Cloud Object Storeinstance with a dedicated bucket. This must exist in the same account as the Key Management Service instance. You must have at least the viewer role. For performance, the bucket must reside in the same region as the Annotator for Clinical Data instance.

   2.2. Use Identity and Access Management (IAM) to authorize access between the Cloud Object Store instance and Key Management Service instance.

3. Annotator for Clinical Data setup

   3.1. Create or reuse a Cloud Object Store instance. This must exist in the same account as the Annotator for Clinical Data instance. You must have at least the viewer role.

   3.2. Use IAM to grant the Annotator for Clinical Data instance access to Cloud Object Store instance.

   3.3. Call the [Resource Controller update resource instance API](https://cloud.ibm.com/apidocs/resource-controller/resource-controller#update-resource-instance) to switch the Annotator for Clinical Data} instance to using the Cloud Object Store instance.

Setting the Annotator for Clinical Data instance to use customer-managed bucket and keys.
```
curl -X PATCH https://resource-controller.cloud.ibm.com/v2/resource_instances/{id} \
    -H 'Authorization: Bearer {token}' \
    -H 'Content-Type: application/json' \
    -d '{"parameters": {
           "bucket_name": "<COS Bucket Name>"}
        }'
```

Resetting the Annotator for Clinical Data instance to use provided IBM Cloud environment's bucket.
```
curl -X PATCH https://resource-controller.cloud.ibm.com/v2/resource_instances/{id} \
    -H 'Authorization: Bearer {token}' \
    -H 'Content-Type: application/json' \
    -d '{"parameters": {
           "bucket_name": ""}
        }'
```


### Working with customer-managed keys for Annotator for Clinical Data

Customer-managed keys provide a number of functions including temporarily or permanently preventing access to customer owned configuration data. If access is removed, the Annotator for Clinical Data instance will be unable to successfully process requests that require this configuration data. For more details on preforming these key tasks, visit the [Watson and IBM Cloud documentation](https://cloud.ibm.com/docs/watson?topic=watson-keyservice#keyservice-using).


## Deleting your data in Annotator for Clinical Data

APIs for deleting user configuration data (flows, profiles, or all data for an instance) are provided and can be found under the [Annotator for Clinical Data API reference](https://cloud.ibm.com/apidocs/wh-acd).


### Deleting Annotator for Clinical Data instances

The Annotator for Clinical Data data retention policy describes how long your data is stored after you delete the service. The data retention policy is included in the Annotator for Clinical Data service description, which you can find in the [IBM Cloud Terms and Notices](/docs/overview?topic=overview-terms).
