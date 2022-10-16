---
title: "Uninstalling IBM Watson ACD"
excerpt: "Uninstalling IBM Watson ACD."
categories: installing
slug: uninstalling
toc: true
---
_Note: The following instructions, including the cloudctl command line utility, are for uninstalling IBM Watson Annotator for Clinical Data Container Edition.  For uninstalling Merative Annotator for Clinical Data Container Edition, refer [here](/installing/uninstalling/)._

IBM Watson Annotator for Clinical Data Container Edition should be uninstalled using the same interface that was used to install. The uninstall can be done using either the OpenShift Container Platform web console or the command line.

The order of the uninstall is important. Delete the ACD service instance first, then delete the operator. If the operator was installed into all namespaces, ensure all ACD service instances are deleted before deleting the operator.

Follow the uninstall steps for the ACD service and operator before deleting a project or namespace. Failure to do so may result in resources left in a terminating state. See the [Troubleshooting Uninstall](/troubleshooting/troubleshooting-uninstall/) section for more info.

To check for installed ACD instances, use the following command:

```
oc get acds --all-namespace
```

## Uninstalling using the OpenShift Container Platform web console

See [Uninstalling using the OpenShift Container Platform web console](http://localhost:8000/installing/uninstalling/#uninstalling-using-the-openshift-container-platform-web-console).

## Uninstalling using Command line

### 1. Uninstall the ACD service.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory clinicalDataAnnotatorOperator \
    --action deleteCustomResources \
    --tolerance 1
```

### 2. Uninstall the ACD operator.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action uninstallOperator \
    --tolerance 1
```

### 3. Delete namespace

To remove the namespace run the following:

```
oc delete namespace <namespace>
```

## Uninstalling the IBM operator catalog

To remove the catalog run the following:

```
oc delete catalogsource ibm-operator-catalog -n openshift-marketplace
```

**Note:** This catalog resource provides access to many operators, one of which is the Annotator for Clinical Data Container Edition operator. Before deleting the catalog source, ensure you want to remove the full catalog. If you need to reinstall, see [Installing the IBM operator catalog](/installing/installing/#installing-the-ibm-operator-catalog).
