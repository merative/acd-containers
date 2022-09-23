---
title: "Verifying your installation"
excerpt: "Verifying."
categories: installing
slug: verifying
toc: true
---

## Verifying the ACD Operator

List the pods deployed and look for the operator pod showing it is ready with a status of running.

```
oc get pods --namespace <namespace> | grep controller
```

## Verifying the ACD Service

List the pods deployed and look for the deployment pods showing ACD and all microservices ready with a status of running. The ACD macroservice pod waits for all its microservice pods to report ready before it becomes ready so it will be the last one to reach a ready state. List only the ACD macroservice pod by searching for "acd-acd".

```
oc get pods --namespace <namespace>
oc get pods --namespace <namespace> | grep acd-acd
```

## Calling the ACD Status API

Port-forward to the ACD pod retrieved in the previous step. **Note that only an admin can do the port-forward and access the pods through localhost.**

```
oc port-forward <pod_name> -n <namespace> 9443:9443 &
```

The terminal window should return to the command prompt with the port-forward running in the background waiting to accept network traffic on the localhost port 9443. (You may have to press enter again to get back to the command prompt.) Note that we used the ampersand (&; a control operator) at the end of the command. The shell assigns a number to the job and displays this job number after a smaller number between brackets. Note the job number returned. Once you are done running the curl command to verify status, you can end the port-forward using that job number.

Example output:

```
$ oc port-forward ibm-wh-acd-acd-66bc5786-7rrc7 -n acd-test 9443:9443 &
[1] 93053

```

With the port-forward process running in the background, call the ACD status API. Confirm `serviceState` is `OK`.

```
curl -k 'https://localhost:9443/services/clinical_data_annotator/api/v1/status'
```

Example output:

```
$ curl -k 'https://localhost:9443/services/clinical_data_annotator/api/v1/status'
Handling connection for 9443
{"version":"2021-06-23T16:41:19Z","upTime":"0d 01:01:19","serviceState":"OK","hostName":"ibm-wh-acd-acd-66bc5786-7rrc7","requestCount":254,"maxMemoryMb":3072,"commitedMemoryMb":3072,"inUseMemoryMb":632,"availableProcessors":16,"concurrentRequests":0,"maxConcurrentRequests":1,"totalRejectedRequests":0,"totalBlockedRequests":0
```

To end the port-forward job, run the following, where `93053` would be the port-forward job id from the previous example output. You can also use the `jobs` command to get the port-forward process job id.

```
kill <port-forward job id>
```

### Next Steps

* If pods are not starting, see the [Troubleshooting ACD instances](/troubleshooting/troubleshooting-acd-instances/) section in the Troubleshooting documentation.
* Once all the pods have started with a status of running and you verified the status with the ACD status API, continue on to [Getting Started](/usage/getting-started/) with ACD.
* For more details on management or configuration of your ACD instance, see [ACD Configuration Management](/management/configuring).
