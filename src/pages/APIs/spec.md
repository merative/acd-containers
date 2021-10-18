---
title: "AcdService"
excerpt: "Acd status and spec."
categories: APIs
slug: status
toc: true
---

The Annotator for Clinical Data Container Edition is a Custom Resource Definition used to deploy and manage an instance of IBM Watson Annotator for Clinical Data Service.

<AnchorLinks>
  <AnchorLink>Spec</AnchorLink>
  <AnchorLink>Status</AnchorLink>
</AnchorLinks>

# Spec

## Properties

| Property | Description | Required | Default |
|----------|-------------|----------|---------|
| Annotators | Which annotators are deployed for the instance | Yes | See doc below |
| Configuration Storage | Persistent volume requests | Yes | See doc below |
| License | License acceptance and usage | Yes | None |
| Network Policy | Network security policies | Yes | Enabled |
| Replicas | Number of replica nodes in the cluster | Yes | 3 |
| Resources | Resource specifications for instance | No | See doc below |
| Tenant Header | Unique header for multi-tenancy | No | None |
| Version | Annotator for Clinical Data Container Edition version | Yes | None |

<AnchorLinks small>
  <AnchorLink>Annotators</AnchorLink>
  <AnchorLink>Configuration Storage</AnchorLink>
  <AnchorLink>License</AnchorLink>
  <AnchorLink>Network Policy</AnchorLink>
  <AnchorLink>Replicas</AnchorLink>
  <AnchorLink>Resources</AnchorLink>
  <AnchorLink>Tenant Header</AnchorLink>
  <AnchorLink>Version</AnchorLink>
</AnchorLinks>

## `Annotators`

### Description

The `Annotators` property tells the deployment which annotator pods should be created as part of the deployment.  At least one annotator need to be enabled and by default all annotators are enabled.

- `Advanced Care Insights` : discovers contextual information for problems, procedures, and medications identified in unstructured text
- `Attribute Detection` : discovers domain specific attributes and associated values to be discovered in unstructured clinical text
- `Concept Detection` : discovers matching terms from concept dictionaries
- `Concept Disambiguation` : ranks term revelency based on sentence and document level information
- `Concept Value Detection` : used with concept detection to discover values for matched dictionary concepts
- `Hypothetical Detection` : discovers spans of text that are the object of a hypothetical statement
- `Model Broker`: discovers key clinical concepts, such as medications, diagnoses, and procedures, with contextual scores.
- `Negation Detection` : discovers  the spans of text that are the object of a negation and also identifies the text that triggered the negation
- `Ontology` : allows user to manage custom ontologies / dictionaries
- `Spell Checker` : discovers misspelled words and phrases in a document and suggests corrections

### Example

```yaml
  Annotators:
    Advanced Care Insights:
      Enabled:  true
    Attribute Detection:
      Enabled:  true
    Concept Detection:
      Enabled:  true
    Concept Disambiguation:
      Enabled:  true
    Concept Value Detection:
      Enabled:  true
    Hypothetical Detection:
      Enabled:  true
    Model Broker:
      Enabled:  true
    Negation Detection:
      Enabled:  true
    Ontology:
      Enabled:  true
    Spell Checker:
      Enabled:  true
```

## `Configuration Storage`

### Description

The `Configuration Storage` property tells the deployment whether persistent storage is enabled and the type of storage being used.  There are two required fields to configuration storage.

- `Storage` : either File or S3 compatible storage.  

- ` File Storage` : whether persistent storage is enabled, default is true.  If persistent is enabled the following additional properties are available:
  #### PVC
  - `PVC storage size` : default 10 Gigabytes
  - `Supplemental Group ID` : only needs to be set if root(0) is not being used
  - `Existing PVC name` | name of the persistent volume claim
  - `Storage Class Name` : some storage options require specific storage class names

If S3 compatible (COS) is enabled these additional properties need to be set:
  #### S3 Storage
  - `Endpoint URL` : S3 Storage endpoint URL
  - `Location` : cloud region of storage
  - `Bucket` : name the bucket to use for storage

### Example

```yaml
  Configuration Storage:
    Backend:  file
    File:
      Persistent:  true
      Volume:
        Existing Claim Name:       /acd-pvc
        Size:                      10Gi
        Storage Class Name:        <xxx>
        Supplemental Group:        
        Use Dynamic Provisioning:  false
    s3:
      Bucket:        
      Endpoint URL:  
      Location:
```

## `License`

### Description

The `License` property contains two required field:

- `accept` : must be boolean `true` for the ACD prods to successfully start.
- `use` : the type of license being used.  Can be one of the following values:
  - `production`
  - `development`

### Example

```yaml
  License:
    Accept:  true
    Use:     Production
```

## `Network Policy`

### Description

The `Network Policy` property tells the deployment whether network security is enabled.  The default is true.

### Example

```yaml
  Network Policy:
    Enabled:  true
    Ingress:
      From Selectors:
```

## `Replicas`

### Description

The `Replicas` property tells the deployment how many replica pods to create for each annotator. The default is three replicas for each annotator.

### Example

```yaml
  Replicas:            3
```

## `Resources`

### Description

The `Resources` property defines the cpu, ephemeral storage, and memory for limits and requests.

#### CPU

The default CPU request is 100m.

It is worth noting that you can only request CPU, there is not a limit field, as the Annotation for Clinical Data Operator will set the limits CPU to the requests CPU.

#### Memory

You are able to set both requests and limits for memory.  The values must follow Kubernetes constraints.

#### Ephemeral Storage

You are able to set the storage for non-persisted or transient if persisted or S3 compatible storage is not being used.  The storage and all files created / managed within the storage are only present for the lifetime of the pod.

If this field is not provided, or parts of the resources object are left unset, the example below shows the default values(s) that will be used.

### Example

```yaml
API Version: wh-acd.ibm.com/v1
Name: acd-instance
Kind: Acd
Spec:
  Resources:
    Limits:
      Cpu:                
      Ephemeral Storage:  500Mi
      Memory:             4Gi
    Requests:
      Cpu:                100m
      Ephemeral Storage:  200Mi
      Memory:             4Gi
```

## `Tenant Header`

### Description

The `Tenant Header` property defines a header to include in a multi-tenant environment to isolate data from other tenants.

### Example

```yaml
  Tenant Header:  <my tenantid>
```

## `Version`

### Description

The `Version` property identifies the build of the operator that is deployed.

### Example

```yaml
  Version:  v2.0.202110010226
```

# Status

The Annotator for Clinical Data Container Edition is a Custom Resource Definition used to deploy and manage an instance of IBM Watson Annotator for Clinical Data Service.

### Example

```
$ oc get acd
NAME		INITIALIZED	    DEPLOYED			    VERSION			    AGE
Acd-instance	True		InstallSuccessful	V2.0.20211001225		5h8m

$ oc describe acd/acd-instance
...Status:
  Conditions:
    Last Transition Time:  2021-10-05T20:38:19Z
    Status:                True
    Type:                  Initialized
    Last Transition Time:  2021-10-05T20:38:24Z
    Message:               notes

    Reason:  InstallSuccessful
    Status:  True
    Type:    Deployed
```

## Conditions

The Annotation for Clinical Data Service supports Kubernetes [Conditions](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#typical-status-properties). These `Conditions` can be viewed as a snapshot of the current and most up-to-date status of the instance.

The `Iniitialized` condition will be set to `True` when all the pods are created for the desired number of replicas set by the instance specification.

The 'Deployed' condition will be set to `InstallSuccessful` when the images for the annotators have been deployed to their respective pods.
