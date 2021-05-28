---
title: "Installing ACD"
excerpt: "Installing IBM ACD."
categories: installing
slug: installing
toc: true
---
To install IBM Watson Annotator for Clinical Data Container Edition, you may use the OpenShift Container Platform web console, the `oc` command line utility, or the `cloudctl` command line utility.

When deploying in an air-gapped environment, see [Air-gap Installation](https://ibm.github.io/acd-containers/installing/air-gap-installation/).

## Overview

Annotator for Clinical Data Container Edition is an [operator-based](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) release and uses a custom resource to define your ACD configuration.

The ACD operator uses the custom resource to deploy and manage the entire lifecycle of each ACD instance. Custom resources are presented as YAML configuration documents that define instances of the `Acd` custom resource type.

Installing ACD has two phases:

1. Install the ACD operator: this will deploy the operator that will install and manage your ACD instances.
2. Install one or more replicas of ACD by using the operator.

## Before you begin

* [Plan for your installation](https://ibm.github.io/acd-containers/installing/planning/), such as preparing for persistent storage, considering security options, and planning for performance and capacity.
* Set up your environment according to the [prerequisites](https://ibm.github.io/acd-containers/installing/prereqs/), including setting up your OpenShift Container Platform.
* Obtain the connection details for your OpenShift Container Platform cluster from your administrator.

## Create a project (namespace)

Create a namespace into which the ACD instance will be installed by creating a [project](https://docs.openshift.com/container-platform/4.7/applications/projects/working-with-projects.html).

When you create a project, a namespace with the same name is also created.

Ensure you use a namespace that is dedicated to a single instance of ACD.

**Important**: Do not use any of the default or system namespaces to install an instance of ACD (some examples of these are: default, kube-system, kube-public, and openshift-operators).

## Create Secrets

ACD and its operator require the following secrets.

1. A pull secret to pull images from the entitled registry account.
2. (Optional) S3 credentials if S3 is being used as the configuration storage.

### Global pull secret installation

Request access to the staging and/or production entitled registry and get an API or entitlement key. See [IBM Developer Entitled Registry Login Options](https://playbook.cloudpaklab.ibm.com/ibm-developer-entitled-registry-login-options/) for details.

#### Update the global pull secret using the CLI

[Update the global cluster pull secret](https://docs.openshift.com/container-platform/4.7/openshift_images/managing_images/using-image-pull-secrets.html#images-update-global-pull-secret_using-image-pull-secrets) containing the container registry image pull secret with these steps:

1. Extract the current global image pull secret from the cluster into a file in the current directory named .dockerconfigjson:
oc extract secret/pull-secret -n openshift-config --to=.

2. Create a base64 encoded string with the registry userid and password as it aligns with your access method.

   `printf "iamapikey:<developerkey>" | base64`  -or-  `printf "cp:<entitlementkey>" | base64`

3. Edit the .dockerconfigjson file and **ADD** a new JSON object to the exiting auths object with the credentials for the entitled registry. For example:

   ```
   "cp.stg.icr.io": {
       "auth": "aWFtYXBpaxxxxxxxxxxxcGFzc3dvcmQ=",
       "email": "xxx@nomail.relay.ibm.com"
   }
   ```

4. Update the global image pull secret with the updated credentials:

   `oc set data secret/pull-secret -n openshift-config --from-file=.dockerconfigjson`

5. Monitor the node status using the command:

   `oc get nodes`

6. When the nodes are finish restarting, your cluster is now ready to pull images from the registry.

#### Update the global pull secret using cloudctl

See the [Air-gap Installation Configure Cluster for Airgap section](https://ibm.github.io/acd-containers/installing/air-gap-installation/#cluster-with-a-bastion/) documentation.

### (Optional) Create configuration storage secret

If the deployment is using S3 as the configuration storage, the credentials need to be inserted as secrets.

```
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
kubectl create secret generic ibm-wh-acd-as \
                              --namespace <namespace> \
                              --from-file=username \
                              --from-file=password
```

## (Optional) Configure Image Registry Repository Mirroring

Configure your OpenShift Container Platform cluster to redirect requests to pull images from a repository on a source image registry and have it resolved by a repository on a mirrored image registry. See [configuring image registry repository mirroring](
https://docs.openshift.com/container-platform/4.7/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration) for details.

**Note** This is currently required if you are pulling ACD images from the production entitled registry and want to access the mirrored images in the staging entitled registry.

### Configure mirroring using the CLI

Create an ImageContentSourcePolicy file (for example, mirror-config.yaml) to define the source and mirror locations. Replace the source and mirrors with your own registry and repository pairs and images.

This example mirrors images from production registries `icr.io` and `cp.icr.io` to the same namespace and two different repository locations in the staging registry `cp.stg.icr.io`.

```
apiVersion: operator.openshift.io/v1alpha1
kind: ImageContentSourcePolicy
metadata:
  name: mirror-config
spec:
  repositoryDigestMirrors:
    - mirrors:
        - cp.stg.icr.io/cp/wh-acd
      source: cp.icr.io/cp/wh-acd
    - mirrors:
        - cp.stg.icr.io/cp
      source: icr.io/cpopen
```

Create the ImageContentSourcePolicy object.

`oc create -f mirror-config.yaml`

**Note** Applying the ImageContentSourcePolicy causes your cluster nodes to recycle and will temporarily limit the usability of the cluster.

### Configure mirroring using cloudctl

See the [Air-gap Installation Configure Cluster for Airgap section](https://ibm.github.io/acd-containers/installing/air-gap-installation/#cluster-with-a-bastion/) documentation.


## Add the ACD Operator to the catalog

Before you can install the ACD operator and use it to create instances of the ACD service, you must have a catalog source which includes ACD. ACD is available with the IBM Operator Catalog or can be installed with its own catalog source.

If you have other IBM products installed in your cluster, then you may already have the IBM Operator Catalog available, and you can continue to installing the ACD operator from there.

If you are installing ACD as the first IBM operator in your cluster, complete the following steps to install either the IBM Operator Catalog or the ACD operator catalog.

To make the ACD operator and related dependencies available in the OpenShift OperatorHub catalog, chose one of the following install paths to create catalog source YAML files and apply them.

### Add the IBM Operator Catalog using the CLI

Create a file for the IBM Operator Catalog source with the following content, and save as `IBMCatalogSource.yaml`:

```
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
   name: ibm-operator-catalog
   namespace: openshift-marketplace
spec:
   displayName: "IBM Operator Catalog"
   publisher: IBM
   sourceType: grpc
   image: icr.io/cpopen/ibm-operator-catalog@sha256:d0d106a4a8ff88953d3653a02b4c321545e9503bc4cb5db4f1dc6b9f28f39555
   updateStrategy:
     registryPoll:
       interval: 45m
```

Log in to your Red Hat OpenShift Container Platform as a cluster administrator by using the `oc` CLI.
Apply the source by using the following command:

`oc apply -f IBMCatalogSource.yaml`

The IBM Operator Catalog source is added to the OperatorHub catalog, making the ACD operator available to install.

### Add the ACD Catalog using the CLI

Create a file for the ACD catalog source with the following content, and save as `acd_catalog_source.yaml`:

```
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: ibm-wh-acd-operator-catalog
  namespace: openshift-marketplace
spec:
  displayName: IBM ACD Operator Catalog
  publisher: IBM
  sourceType: grpc
  image: icr.io/cpopen/ibm-wh-acd-operator-catalog@sha256:d0d106a4a8ff88953d3653a02b4c321545e9503bc4cb5db4f1dc6b9f28f39555
  updateStrategy:
    registryPoll:
      interval: 45m
```

Log in to your Red Hat OpenShift Container Platform as a cluster administrator by using the `oc` CLI. Apply the source by using the following command:

`oc apply -f acd_catalog_source.yaml`

The ACD operator catalog source is added to the OperatorHub catalog, making the ACD operator available to install.

### Add the ACD Catalog using cloudctl

See the [Air-gap Installation install catalog source](https://ibm.github.io/acd-containers/installing/air-gap-installation/#install-catalog-source) documentation.

## Install the ACD Operator

### Install the ACD Operator using the web console

To install the ACD operator through the OpenShift Container Platform web console, do the following:

1. Log in to the OpenShift Container Platform [web console](https://docs.openshift.com/container-platform/4.7/web_console/web-console.html) using your login credentials.
2. Expand the **Operators** dropdown and select **OperatorHub** to open the **OperatorHub** dashboard.
3. Select the project you want to use as the target namespace for your ACD deployment.
4. In the **All Items** search box enter `ACD` to locate the operator title.
5. Click the **ACD** tile to open the install side panel.
6. Click the **Install** button to open the **Create Operator Subscription** dashboard.
7. Select the chosen installation mode that suits your requirements. If the installation mode is **A specific namespace on the cluster**, select the target namespace you created previously.
8. Click **Install** to begin the installation.

The installation can take a few minutes to complete.

### Install the ACD Operator using cloudctl

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action installOperator \
    --tolerance 1
```

## Install the ACD Service

Instances of ACD can be created after the ACD operator is installed.

If the operator was installed into a specific namespace, then it can only be used to manage instances of ACD in that namespace.

If the operator was installed for all namespaces, then it can be used to manage instances of ACD in any namespace, including those created after the operator was deployed.

When installing an instance of ACD, ensure you are using a namespace that an operator is managing.

### Install the ACD Service by using the web console

To install the ACD service through the OpenShift Container Platform web console, do the following:

1. Log in to the OpenShift Container Platform [web console](https://docs.openshift.com/container-platform/4.7/web_console/web-console.html) using your login credentials.
2. Expand the **Operators** dropdown and select **Installed Operators** to open the **Installed Operators** page.
3. Expand the **Project** dropdown and select the project the operator is installed in. Select the **Annotator for Clinical Data** operator link in the **Name** column.
**Note**: If the operator is not shown, it is either not installed or not available for the selected namespace.
4. In the **Operator Details** dashboard, click the **Annotator for Clinical Data** tab.
5. Click the **Create Acd** button to open the **Create Acd** panel. You can use this panel to define an `Acd` custom resource.

From here you can install by using the form view. For more advanced configurations or to install an instance using default configuration, see installing by using the YAML view.

### Install the ACD service using cloudctl

By default, this will deploy 3 replicas of all ACD services. Include `--args "--replicas 1"` to install a 1 replica ACD instance.

```
cloudctl case launch \
    --case case/ibm-wh-acd \
    --namespace <target_namespace> \
    --inventory whcsServiceClinicalDataAnnotatorOperator \
    --action applyCustomResources \
    --tolerance 1
```
