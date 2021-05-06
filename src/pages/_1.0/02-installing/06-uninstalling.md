---
title: "Uninstalling ACD"
excerpt: "Uninstalling ACD."
categories: installing
slug: uninstalling
toc: true
---

ACD should be uninstalled using the same interface that was used to install.

## Uninstalling using Openshift Operator Catalog

## Uninstalling using Command line

### 1. Uninstall the ACD service.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperator \
    --action deleteCustomResources \
    --tolerance 1
```

### 2. Uninstall the ACD operator.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action uninstallOperatorNative \
    --tolerance 1
```
