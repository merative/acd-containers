---
title: "Uninstalling ACD"
excerpt: "Uninstalling ACD."
categories: installing
slug: uninstalling
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


ACD should be uninstalled using the same interface that was used to install. The uninstall can be done using either the OpenShift Container Platform web console or the command line.

The order of the uninstall is important. Delete the ACD service instance first, then delete the operator. If the operator was installed into all namespaces, ensure all ACD service instances are deleted before deleting the operator.

Follow the uninstall steps for the ACD service and operator before deleting a project or namespace. Failure to do so may result in resources left in a terminating state. See the [Troubleshooting Uninstall](/troubleshooting/troubleshooting-uninstall/) section for more info.

To check for installed ACD instances, use the following command:

```
oc get acds --all-namespace
```

## Uninstalling using the OpenShift Container Platform web console

### 1. Uninstall the ACD service.

1. Log in to the OpenShift Container Platform [web console](https://docs.openshift.com/container-platform/4.7/web_console/web-console.html) using your login credentials.
1. Expand the **Operators** dropdown and select **Installed Operators** to open the **Installed Operators** page.
1. Expand the **Project** dropdown and select the project the operator is installed in. Select the **Annotator for Clinical Data** link in the **Provided APIs** column.
1. Click **More options** icon on the right side of row showing the instance to be deleted.
1. Click the **Delete Acd** menu option to open the delete confirmation panel.
1. Check that the namespace and instance name are correct and click **Delete** to shutdown the associated pods and delete the ACD service instance.
1. Check uninstallation progress by expanding **Workloads** and selecting **Pods** in the left navigation menu.
Confirm all the ACD instance pods show  Terminating status and then are removed from the list.

Note that the operator pod will remain, if it was installed into the same namespace. Uninstall it next.

### 2. Uninstall the ACD operator.

1. Log in to the OpenShift Container Platform [web console](https://docs.openshift.com/container-platform/4.7/web_console/web-console.html) using your login credentials.
1. Expand the **Operators** dropdown and select **Installed Operators** to open the **Installed Operators** page.
1. Expand the **Project** dropdown and select the project the operator is installed in. For cluster-wide operators, select the `openshift-operators` project.
1. Click **More options** icon on the right side of row showing the operator to be deleted.
1. Click the **Uninstall Operator** menu option to open the delete confirmation panel.
1. Note the warning about removing the operator's managed resources first. You should always uninstall the ACD instance before uninstalling the operator. If ready to proceed, check that the namespace and instance name are correct and click **Uninstall** to delete the ACD operator.
1. Check uninstallation progress by expanding **Workloads** and selecting **Pods** in the left navigation menu.
Confirm the ACD operator pod shows Terminating status and then is removed from the list.

### 3. Delete the namespace created for ACD.

**Important**: Do not delete any of the default or system namespaces, such as those used when the ACD operator is installed for all namespaces (some examples of these are: default, kube-system, kube-public, and openshift-operators).

1. Log in to the OpenShift Container Platform [web console](https://docs.openshift.com/container-platform/4.7/web_console/web-console.html) using your login credentials.
1. Expand the **Home** dropdown and select **Projects** to open the list of projects.
1. Click **More options** icon on the right side of row showing the project to be deleted.
1. Click the **Delete Project** menu option to open the delete confirmation panel.
1. Check that the namespace is correct and confirm deletion by entering the project name into the text box. Click **Delete** to delete the project.

## Uninstalling using command line

If the IBM `cloudctl` interface was used for install, refer here for instructions on [uninstalling ACD from the command line](/installing/uninstalling-ibm/).
