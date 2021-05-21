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

## Remove secrets

To remove the secrets run the following:

```
oc delete secret cp.stg.icr.io \
                  --namespace <namespace>

oc delete secret ibm-wh-acd-as \
                  --namespace <namespace>
```
