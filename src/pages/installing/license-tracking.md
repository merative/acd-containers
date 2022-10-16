---
title: "License Tracking"
excerpt: "."
categories: installing
slug: license-tracking
toc: true
---
_Note: For IBM Watson Annotator for Clinical Data Container Edition, the License Service is **required** to be running on your cluster in accordance with the pricing rule for IBM containerized software._

The IBM License Service provides monitoring and measuring license usage of ACD.  License usage is based on a Virtual Processing Core (VPC) metric. For ACD, it is the top-level pod `merative-acd-acd` that will be metered for VPC usage.  The usage will be the capacity of the node where this pod runs. For example, ACD running in a cluster with 16 CPU/node has license usage = 16 VPC. The ACD CPU limit can be adjusted by the number of replicas configured and the size of the nodes where ACD runs. For more information on configuration, see [Configuration](/management/configuring/).

## Overview

The IBM License Service collects and stores the license usage information which can be used for audit purposes and for tracking license consumption at the cluster level.
The solution works in the background and does not require any configuration.
Only one instance of the License Service is deployed per cluster.

Review [Validating if License Service is deployed on the cluster](#validating-if-license-service-is-deployed-on-the-cluster),
and use the License Service APIs to generate usage audit reports (see [License Service](https://www.ibm.com/docs/en/cpfs?topic=license-service) documentation).

## Deploying License Service

If [Validating if License Service is deployed on the cluster](#validating-if-license-service-is-deployed-on-the-cluster) determines that the License Service is not deployed on the cluster where you have deployed ACD,
or the License Service does not return a status of Running, refer to the information about License Service, including how to install, retrieve license usage data, and troubleshoot.
See the [License Service](https://www.ibm.com/docs/en/cpfs?topic=license-service) documentation.

If deploying the License Service to a disconnected or air-gapped cluster, see the [offline installation License Service](https://www.ibm.com/docs/en/cpfs?topic=software-offline-installation).

## Validating if License Service is deployed on the cluster

To ensure license reporting continuity, make sure that License Service is successfully deployed.
It is recommended to periodically verify whether it is active.

To validate whether License Service is deployed and running on the cluster, log into the Red Hat OpenShift Container Platform cluster and run the following command:

```bash
oc get pods --all-namespaces | grep ibm-licensing | grep -v operator
```

The following response is a confirmation of successful deployment:

```bash
1/1     Running
```

## Viewing license usage

The License Service is accessible via the ```ibm-licensing-service-instance``` route that is created as part of the License Service setup. ![ibm-licensing-service-instance](../../images/license_route.png) 

In order to run the report, the ```ibm-licensing-token``` secret's [token](https://www.ibm.com/docs/en/cpfs?topic=authentication-license-service-api-token#obtaining) must be retrieved and provided on the above service. Once run, the results will show the ACD usage.  For example: ![ACD usage](../../images/license_report.png)
   * **Note:**  If you upgraded from IBM Watson Annotator for Clinical Data Container Edition to Merative Annotator for Clinical Data Container Edition, your ACD usage report may still indicate "IBM Watson Annotator for Clinical Data Container Edition", however, the License Service is correctly collecting metrics for your Merative ACD usage.   

## Archiving license usage data

Remember to archive the license usage evidence before you decommission the cluster where ACD was deployed. Retrieve the audit snapshot for the period when ACD was on the cluster and store it in case of audit.

For more information about the licensing solution, see [License Service](https://www.ibm.com/docs/en/cpfs?topic=license-service) documentation.

For FAQs related to Container licensing, see [Container Licensing FAQs](https://www.ibm.com/software/passportadvantage/containerfaqov.html).
