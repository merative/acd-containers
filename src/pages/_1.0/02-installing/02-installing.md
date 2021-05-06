---
title: "Installing ACD"
excerpt: "Installing IBM ACD."
categories: installing
slug: installing
toc: true
---

ACD can be installed through one of the following install paths:

1. (Default) Openshift Operator Catalog (Online)
2. Command line (Online)
3. Command line (Air-gapped)

## Installing using Openshift Operator Catalog (Online)

#### 1. (Optional) Create a image pull secret and service account (using template under op-cli directory) if installing from authenticated registry.

```
kubectl create secret docker-registry 'cp.icr.io' \
    --docker-server='cp.icr.io' \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<user@email> \
    --namespace=<target_namespace>
```

```
< case/ibm-wh-acd/inventory/whcsServiceClinicalDataAnnotatorOperatorSetup/files/op-cli/service_account.yaml  sed 's|REPLACE_SECRET|cp.icr.io|g' | oc apply --namespace<target_namespace> -f -
```

#### 2. Install the operator via Operator Life Cycle Manager (OLM)

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action installOperator \
    --tolerance 1
```

#### 3. Install the ACD service. By default, this will deploy 3 replicas of all ACD services. Include ``--args "--replicas 1"`` to install a 1 replica ACD instance.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperator \
    --action applyCustomResources \
    --tolerance 1
```

## Installing using command-line (Online)

#### 1. (Optional) Create image pull secret if installing operator from authenticated registry

```
kubectl create secret docker-registry 'cp.icr.io' \
    --docker-server='cp.icr.io' \
    --docker-username=<username> \
    --docker-password=<password> \
    --docker-email=<user@email> \
    --namespace=<target_namespace>
```

#### 2. Install the operator via command line specifying image pull secret as argument if installing from authenticated registry

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action installOperatorNative \
    --tolerance 1
```

Alternatively, the install script can create a image pull secret, when authenticated registry user and token are also provided as arguments

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action installOperatorNative \
    --args "--registry cp.icr.io --secret cp.icr.io --user <username> --pass <password>" \
    --tolerance 1
```

#### 3. Install the ACD service. By default, this will deploy 3 replicas of all ACD services. Include ``--args "--replicas 1"`` to install a 1 replica ACD instance.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperator \
    --action applyCustomResources \
    --tolerance 1
```

### Cluster without a Bastion

#### 1. Prepare a portable device

Prepare a portable device (such as laptop) that be used to download the case and images can be carried into the air gapped environment

* Verify that the portable device has access
  * to public internet (to download CASE and images)
  * a target image registry ( where the images will be mirrored)
  * a target openshift cluster to install the operator

* Download and install dependent command line tools
  * [oc](https://docs.openshift.com/container-platform/3.6/cli_reference/get_started_cli.html#installing-the-cli) - To interact with Openshift Cluster
  * [cloud-pak-cli](https://github.com/IBM/cloud-pak-cli) - To download and install CASE

All the following steps should be run from the portable device

#### 2. Download CASE

See instructions from previous [Downloading CASE](#2-download-case) section

#### 3. Configure Registry Auth

See instructions from previous [Configure Registry Auth](#3-configure-registry-auth) section

#### 4. Mirror Images

See instructions from previous [Mirror Images](#4-mirror-images) section

#### 5. Configure Cluster for Airgap

See instructions from previous [Configure Cluster for Airgap](#5-configure-cluster-for-airgap) section

#### 6. Install Catalog Source

See instructions from previous [Install Catalog Source](#6-install-catalog-source) section

#### 7. Install the operator

See instructions from previous [Installing ACD](../installing) section
