---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:caption: .caption}
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

# Customizing
{: #customizing}

The {{site.data.keyword.wh-acd_short}} Configuration Editor supports extensive customization of the annotators as well as the ability to preview the customizations and export them in the form of a cartridge (zip file) that can be deployed directly to the service via the `/cartridges` APIs.

The configuration editor facilitates the following customizations:

| Customization | Description |
|----|----|
| Dictionaries | A set of terms describing a unique concept that is matched against the provided text to be analyzed. |
| Derived Concepts | Rules for deriving concepts when one or more other concepts or tokens appears in the surrounding context. |
| Filters | Conditional rules for omitting undesired annotations from the service response. |
| Clinical Attributes | Configurable annotations built upon one or more other annotations. Optionally, semantically linked values in the surrounding context can be captured and associated with the attribute. |
| Derived Clincal Attributes | Conditional logic and expressions for deriving new attributes based on values associated with other attributes. |
| Attribute Qualifiers | Configurations for detecting qualifying terms in the immediate context of an attribute and capturing the qualifiers as a field within the output attribute annotation. |
| Ontological Relations | Ontology configurations for extracting ontological relations between concepts cooccurring within the same sentence. |
| CPT Code Mapping | Mapping configurations for outputting CPT codes from the concept and procedure annotators. |
{: caption="Table 1. Customizations facilitated by the configuration editor" caption-side="top"}

[Contact your IBM representative](https://www.ibm.com/account/reg/us-en/signup?formid=MAIL-watsonhealthna) to learn more about leveraging the configuration editor to customize the behavior of the service.

## Cartridge Deployment
{: #deploy_cartridges}

1. The consumer uses the {{site.data.keyword.wh-acd_short}} Configuration Editor to create a new cartridge (or modify an existing one) and customizes the contents (artifacts) of the cartridge to their domain. After that, the consumer will **Export** the cartridge in order to save a snapshot of the cartridge.
2. The consumer deploys the cartridge snapshot (a zip file) to  {{site.data.keyword.wh-acd_short}} using _POST /v1/cartridges_ API. A successful request for creating a cartridge will return with HTTP <q>202 ACCEPTED</q> response code and will include the path to the resource, e.g., /v1/cartridges/cartridge_id in the response body and the response header. The resource path can be used in _GET /v1/cartridges/catridgeId_ API to obtain the overall deployment status. In the following curl example, the consumer's cartridge file is `/path/to/name_of_cartridge_file.zip`.

    ```Curl
 curl -X POST -u "apikey":"{apikey}" \
  --header "Accept:application/json" \
 --header "Content-Type:application/octet-stream" \
 --data-binary @/path/to/name_of_cartridge_file.zip \
 "{url}/v1/cartridges?version=2019-09-01"
    ```

Use the _POST /v1/cartridges_ operation for the initial deployment of a cartridge version and _PUT /v1/cartridges_ to redploy cartridge updates. Different pusblished versions of a cartridge (e.g. cartridge_v1.0, cartridge_v2.0) will need to be initially deployed via the POST operation and subsequently redeployed via the PUT operation.

3. The consumer redeploys a previously deployed cartridge version using the _PUT /v1/cartridges_ API. The cartridges id is extracted directly from the cartridge zip file. A successful request for updating the cartridge (re)deployment will result in a HTTP <q>202 ACCEPTED</q> response code and will include the path to the resource, e.g., /v1/cartridges/cartridge_id in the response body and the response header.  

    ```Curl
curl -X PUT -u "apikey":"{apikey}" \
--header "Accept:application/json" \
--header "Content-Type:application/octet-stream" \
--data-binary @/path/to/name_of_cartridge_file.zip \
"{url}/v1/cartridges?version=2019-09-01"
    ```

4.  The consumer retrieves a list of deployed cartridges for a given tenant using the _GET /v1/cartridges_ API. An empty list is returned if no catridges have been deployed.  

    ```Curl
curl -X GET -u "apikey":"{apikey}" \
--header "Accept:application/json" \
"{url}/v1/cartridges?version=2019-09-01"
    ```

5.  The consumer can view the status of a specific cartridge deployment by invoking the _GET /v1/cartridges/{id}_ API with the cartridge ID supplied as a path parameter . If the supplied ID does not exists, then a HTTP  <q> 404 Not Found </q> response code is returned. The following curl command returns the deployment status of the <q>cartridge_id</q>.

    ```Curl
curl -X GET -u "apikey":"{apikey}" \
--header "Accept:application/json" \
"{url}/v1/cartridges/cartridge_id?version=2019-09-01"
    ```

Replace `{apikey}` and `{url}` with the actual API key and URL in all sample codes above.


> The _/v1/catridges_ API is the recommended way for a cartridge deployment and is compatible with the legacy _/v1/deploy_ API. In many situations, the consumer has already deployed a cartridge using the _/v1/deploy_ API and the consumer can immediately update the same cartridge using the above POST and PUT operations on the _/v1/catridges_ API to initially create and to subsequently update the cartridge deployment.
>
>
> A typical _POST /v1/catridges_ operation creates and initializes a deployment for cartridge that has never been deployed to the system. For cartridges that have been previously deployed with the _/v1/deploy_ API, the _POST /v1/cartridges_ API will create, initialize, and update an existing cartridge deployment. Subsequent redeployments of a cartridge must use the _PUT /v1/cartridges_ API.

## Legacy Cartridge Deployment

1.  The consumer uses the {{site.data.keyword.wh-acd_short}} Configuration Editor to create a new cartridge (or modify an existing one) and customizes the contents (artifacts) of the cartridge to their domain. After that, the consumer will **Export** the cartridge in order to save a snapshot of the cartridge.
2.  The consumer deploys the cartridge snapshot (a zip file) to  {{site.data.keyword.wh-acd_short}} using _POST /v1/deploy_ API. In the following curl example, the consumer's cartridge file is `./my_cartridges/name_of_cartridge_file.zip`, and `update=false` means do not update the resource if it already exists. Specifying the **update=true** parameter on the deploy API to update an existing cartridge.

    Replace `{apikey}` and `{url}` with the actual API key and URL in the following example. A successful cartridge deploy will result in <q>201 Created</q> if it is a new resource, or <q>200 OK</q> if `update=true` was specified and the existing resource was updated.

    ```Curl
  curl -X POST -u "apikey:{apikey}" \
  --header “Content-Type: application/octet-stream” \
  --header "Accept: application/json" \
  --data-binary @./my_cartridges/name_of_cartridge_file.zip \
  "{url}/v1/deploy?update=false&version=2018-01-17"
```

> Some large cartridge deployments can exceed the request timeout thresholds defined in the DataPower gateways (usually after 2 mins). In that event, you may receive the following error response. See [Cartridge Deployment Timeout](/docs/wh-acd?topic=wh-acd-troubleshoot#troubleshoot_deploy_timeout) for additional considerations during the deployment of large cartridges.
