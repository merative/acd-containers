---
title: "Air-gap Installation"
excerpt: "Air-gap Installation."
categories: installing
slug: air-gap-installation
toc: true
---

## Installing using command-line (Air-gapped)

### Cluster with a Bastion

#### 1. Prepare Bastion Host

* Logon to the bastion machine

* Verify that the bastion machine has access
  * to public internet (to download CASE and images)
  * a target image registry ( where the images will be mirrored)
  * a target openshift cluster to install the operator

All the following steps should be run from the bastion machine

#### 2. Download CASE

Create a directory to save the CASE to a local directory

```
mkdir /tmp/cases
```

Run

```
cloudctl case save \
    --case case/ibm-wh-acd \
    --outputdir /tmp/cases \
    --tolerance 1

Downloading and extracting the CASE ...
- Success
Retrieving CASE version ...
- Success
Validating the CASE ...
- Success
Creating inventory ...
- Success
Finding inventory items
- Success
Resolving inventory items ...
Parsing inventory items
- Success
```

Verify the CASE and images csv has been downloaded

```
ls /tmp/cases/

charts
ibm-wh-acd
ibm-wh-acd-1.0.0-charts.csv
ibm-wh-acd-1.0.0-images.csv
ibm-wh-acd-1.0.0.tgz
```

#### 3. Configure Registry Auth

1. Create auth secret for the the source image registry

Create registry secret for source image registry (if the registry is public which doesn't require credentials, this step can be skipped)

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry cp.icr.io --user iamapikey --pass <apikey>" \
    --tolerance 1
```

2. Create auth secret for target image registry

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry <target_registry> --user <username> --pass <password>" \
    --tolerance 1
```

The credentials are now saved to `~/.airgap/secrets/<registry-name>.json`

#### 4. Mirror Images

In this step image from saved CASE (images.csv) are copied to target registry in the airgap environment

```
cloudctl case launch \
    --case stable/ibm-wh-acd-operator-bundle/case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action mirror-images \
    --args "--registry <target_registry> --inputDir /tmp/cases" \
    --tolerance 1
```

#### 5. Configure Cluster for Airgap

This steps does the following

* creates a global image pull secret for the target registry (skipped if target registry is unauthenticated)
* creates a imagesourcecontentpolicy

WARNING:

* Cluster resources must adjust to the new pull secret, which can temporarily limit the usability of the cluster. Authorization credentials are stored in $HOME/.airgap/secrets and /tmp/airgap* to support this action

* Applying imagesourcecontentpolicy causes cluster nodes to recycle.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action configure-cluster-airgap \
    --args "--registry <target_registry> --inputDir /tmp/cases" \
    --tolerance 1
```

#### 6. Install Catalog Source

This step installs the operator catalogsource in the openshift-marketplace namespace. And also installs catalogs from dependent subcases.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperatorSetup \
    --action install-catalog \
    --args "--registry <target_registry> --inputDir /tmp/cases --recursive" \
    --tolerance 1
```
#### 7. Install Operator

See instructions from [Installing ACD](../installing) section
