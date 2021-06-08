---
title: "Logging and Monitoring"
excerpt: "."
categories: troubleshooting
slug: logging-monitoring
toc: true
---

You can monitor status or troubleshoot issues with your installation in the following ways:

* View the ACD logs using the dashboards
* View pod status and logs
* Log in to a pod to investigate its status

## View the Dashboards

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
