---
title: "Logging and Monitoring"
excerpt: "."
categories: troubleshooting
slug: logging-monitoring
toc: true
---

You can monitor status or troubleshoot issues with your installation in the following ways:

* View the ACD logs by configuring a logging dashboard
* View pod status and logs
* Log in to a pod to investigate its status

## Configuring a Logging Dashboard

Openshift supports many solutions for collection and visualization of logs.  Below  are several examples that illustrate the views required for monitoring and debugging ACD deployments.

### A Note About Tenant and Correlation Identifiers in ACD Logs

ACD outputs its log entries as JSON objects.  Of special note within the JSON structure is the "mdc" object which generally contains two keys.
* correlationId: a UUID used to correlate all log entries for an ACD invocation across all annotators.  This can be helpful in performing root cause analysis when problems occur.
* tenantId:  The unique identifier for a specific tenant if ACD is being utilized in a multi-tenant manner.  In a single tenant environment it will always be "defaultTenant".

### Using the Openshift Cluster Logging Operator

The Openshift cluster logging operator allows for deploying an Elasticsearch, Fluentd, Kibana (EFK) stack to collect and visualize logs from applications.  Due to the preconfigured nature of the EFK components, the sample views for ACD are limited to basic string queries using Kibana's Lucene query syntax.  For instructions on setting up the logging operator itself, see the [Openshift documentation](https://docs.openshift.com/container-platform/latest/logging/cluster-logging.html) for your Openshift release.

View | Lucene Query
----------------------------|-----------------------------
All ACD logs  | `kubernetes.container_name:ibm-wh-acd-*`
All non-status API calls| `kubernetes.container_name:"ibm-wh-acd-acd" AND "api_time" NOT "\"resource\"\:\"status\""`
ALL Analyze API calls | `kubernetes.container_name:"ibm-wh-acd-acd" AND "\"resource\":\"analyze\"" AND "\"api_verb\":\"POST\""`
ACD 5XX responses |   `kubernetes.container_name:"ibm-wh-acd-acd" AND "\"api_rc\":500" OR "\"api_rc\"\:501" OR "\"api_rc\"\:503" OR "\"api_rc\"\:504"`
ACD 4XX responses (user errors)  | `kubernetes.container_name:"ibm-wh-acd-acd" AND "\"api_rc\":400" OR "\"api_rc\"\:403" OR "\"api_rc\"\:404" OR "\"api_rc\"\:409" OR "\"api_rc\"\:413"`
ACD runtime exceptions | `kubernetes.container_name:"ibm-wh-acd-*" AND exception`

* To filter out logs for automated verification testing that occurs during pod startup, add `NOT  "\"correlationId\"\:\"junit-*"` to the query string.
* If your cluster contains multiple deployments of ACD in different namespaces, add `AND kubernetes.namespace_name:"<namespace>"` to view the logs for only one deployment.
* To view logs filtered by correlationId, include `"\"correlationId\":\"<correlation_id>\""`.
* In a multi-tenant ACD depoyment, add `"\"tenantId\":\"<tenant_id>\""` to see only log entries related to a specific tenant.

### Using IBM Log Analysis on a Red Hat OpenShift on IBM Cloud Cluster (ROKS)

A ROKS cluster can be configured to automatically forward cluster to logs to an instance of the IBM Log Analysis service in the same IBM Cloud account. Instructions for setup can be found in the logging topic of [the ROKS documentation](https://cloud.ibm.com/docs/openshift?topic=openshift-health#openshift_logging).   Once logs are being collected, create the following views for ACD.

View | Log Analysis Query
----------------------------|-----------------------------
All ACD logs  | `app:ibm-wh-acd`
All non-status API calls| `app:ibm-wh-acd api_time:* -resource:status`
ALL Analyze API calls | `app:ibm-wh-acd-acd resource:ANALYZE api_verb:POST`
ACD 5XX Responses |   `app:ibm-wh-acd api_rc:>499`
ACD 4XX Responses (user errors)  | `app:ibm-wh-acd api_rc:>399 api_rc:<500`
ACD runtime exceptions | `app:ibm-wh-acd exception`

* To filter out logs for automated verification testing that occurs during pod startup, add `-mdc.correlationId:junit` to the query string.
* If your cluster contains multiple deployments of ACD in different namespaces, add `namespace:<namespace>` to view the logs for only one deployment.
* To view logs filtered by correlationId, include `mdc.correlationId:<correlation_id>`.
* In a multi-tenant ACD depoyment, add `mdc.tenantId:<tenant_id>` to see only log entries related to a specific tenant.

### Other logging solutions

Other log collection and visualization solutions may be used as long as they can be configured with similar views as described above.  This includes native log solutions in supported clouds as well as forwarding to an external log aggregator using the Openshift Cluster Logging Operator's [log forwarding support](https://docs.openshift.com/container-platform/4.7/logging/cluster-logging-external.html)

## View Pod Status and Logs

All Openshift objects can also be accessed by running the `oc` command-line tool.

To list the objects, run the `oc get` command followed by the types of object to retrieve, for example: pods, services, deployments, or secrets. A useful option is the `-w (watch)` option. The watch option keeps the command in a pending state, showing how the pods change over time. It also follows the pods through the initialization, waiting, and running phases.

An example of `oc get`, to list the names and status of the pods in the specified namespace:

`oc get pods -w -n <namespace>`

When a pod is running, you can read the log of that pod by running the following command:

`oc logs <pod-name> -n <namespace>` where pod-name is the name of the pod you want to query.

You can use the `-f (follow)` option to leave the command open and show the log updating in real time.

## Log in to a Pod

Like any other Docker container when a pod is in running status, you can log in to it to conduct a more detailed investigation. The commands that you use depend on the pod, but the following command should work because bash is generally available:

`kubectl exec -it <pod-name> -n <namespace> /bin/bash`

The command opens a bash session within the pod.
