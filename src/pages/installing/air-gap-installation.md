---
title: "Air-gap Installation"
excerpt: "Air-gap Installation."
categories: installing
slug: air-gap-installation
toc: true
---

Since air gap environments do not have access to the public internet, and therefore no access to DockerHub, the following preparation steps are necessary to make the required images accessable to the Red Hat OpenShift Container Platform cluster.

If the Red Hat OpenShift Container Platform cluster has a Bastion host, ensure that the Bastion host can access:

- The public internet to download the CASE and images.
- The target (air gap) image registry where all the images will be mirrored to.
- The Red Hat OpenShift Container Platform cluster to install the Operator on.

In the absence of a Bastion host, a portable host with access to the public internet may used. By downloading the CASE and images onto the portable host, and then transporting the portable host into the air gap environment, the images can then be mirrored to the target (air gap) image registry.

### Verifying entitled registry access

Before beginning, verify the entitled registry key or apikey can access the entitled registry. 

Example (Docker with apikey):

```
docker login -u iamapikey -p <apikey> cp.icr.io
```

Example (Docker with entitlement key):

```
docker login -u cp -p <entitlement key> cp.icr.io
```

If using a Bastion host, refer to [Using a Bastion host](#using-a-bastion-host).
If using a portable host, refer to [Using a portable host](#using-a-portable-host).

### Using a Bastion host

#### 1. Prepare the Bastion host

Ensure you have the following installed on the Bastion host:

  - [Docker CLI (docker)](https://docker.com)
  - [IBM Cloud Pak CLI (cloudctl)](https://github.com/IBM/cloud-pak-cli)
  - [Red Hat OpenShift Container Platform CLI (oc)](https://docs.openshift.com/container-platform/4.7/cli_reference/openshift_cli/getting-started-cli.html)
  - [Skopeo (skopeo)](https://github.com/containers/skopeo)

#### 2. Download the CASE

1. Create a local directory in which to save the CASE.

```
mkdir -p $HOME/offline
```

2. Download the CASE from https://github.com/IBM/cloud-pak

2. Save the CASE.

```
cloudctl case save \
    --case <case-path> \
    --outputdir $HOME/offline
```
  - `<case-path>` is the path or URL to the CASE to save.

3. Verify the CASE (.tgz) file and images (.csv) file have been downloaded.

```
ls $HOME/offline

charts
ibm-wh-acd
ibm-wh-acd-2.0.0-charts.csv
ibm-wh-acd-2.0.0-images.csv
ibm-wh-acd-2.0.0.tgz
```

#### 3. Log into cluster

Log into the Red Hat OpenShift Container Platform cluster as a cluster administrator using the `oc login` command.

#### 4. Configure Bastion host's registry authentication secret

1. Create the authentication secret for the entitled registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry cp.icr.io --user <registry-user> --pass <registry-password>" \
```
  - `<case-file>` is the CASE file.
  - `<registry-user>` is the username for the entitled registry. This should be either `cp` or `iamapikey`.
  - `<registry-password>` is the password for the entitled registry.

2. Create the authentication secret for the Bastion host's registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry <bastion-registry> --user <registry-user> --pass <registry-password>"
```
  - `<case-file>` is the CASE file.
  - `<bastion-registry>` is the Bastion host's registry.
  - `<registry-user>` is the username for the Bastion host's registry.
  - `<registry-password>` is the password for the Bastion host's registry.

The credentials are saved to `$HOME/.airgap/secrets/<target-registry>.json`

#### 5. Mirror images to Bastion host's registry

1. Copy the images in the CASE from the source (public) registry to the Bastion host's (air gap) registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action mirror-images \
    --args "--registry <bastion-registry> --inputDir $HOME/offline"
```
  - `<case-file>` is the CASE file.
  - `<bastion-registry>` is the Bastion host's registry.

#### 6. Configure cluster to access Bastion host's registry

1. Configure a global image pull secret and ImageContentSourcePolicy resource.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-cluster-airgap \
    --args "--registry <bastion-registry> --inputDir $HOME/offline"
```
  - `<case-file>` is the CASE file.
  - `<bastion-registry>` is the Bastion host's registry.

*WARNING:* This step may restart all cluster nodes. The cluster resources might be unavailable until the time the new pull secret is applied.

2. Optional: If you are using an insecure Bastion host's registry, you must add the Bastion host's registry to the cluster insecureRegistries list.

```
oc patch image.config.openshift.io/cluster --type=merge \
    -p '{"spec":{"registrySources":{"insecureRegistries":["'<bastion-registry>'"]}}}'
```
  - `<bastion-registry>` is the Bastion host's registry.

#### 7. Proceed with installation

Now that the air gap installation preparation steps are complete, you may continue with the [Installing ACD](../installing).


### Using a portable host

#### 1. Prepare the portable host

Ensure you have the following installed on the portable host:

  - [Docker CLI (docker)](https://docker.com)
  - [IBM Cloud Pak CLI (cloudctl)](https://github.com/IBM/cloud-pak-cli)
  - [Red Hat OpenShift Container Platform CLI (oc)](https://docs.openshift.com/container-platform/4.7/cli_reference/openshift_cli/getting-started-cli.html)
  - [Skopeo (skopeo)](https://github.com/containers/skopeo)

#### 2. Download the CASE

1. Create a local directory in which to save the CASE.

```
mkdir -p $HOME/offline
```

2. Download the CASE from https://github.com/IBM/cloud-pak

2. Save the CASE.

```
cloudctl case save \
    --case <case-path> \
    --outputdir $HOME/offline
```
  - `<case-path>` is the path or URL to the CASE to save.

#### 3. Configure portable registry and authentication secret

1. Initialize the portable registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action init-registry \
    --args "--registry localhost --user <registry-user> --pass <registry-password> --dir $HOME/offline/imageregistry"
```
  - `<case-file>` is the CASE file.
  - `<registry-user>` is the username for the registry, which is initialized to this value.
  - `<registry-password>` is the password for the registry, which is initialized to this value.

2. Start the portable registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action start-registry \
    --args "--registry localhost --port 443 --user <registry-user> --pass <registry-password> --dir $HOME/offline/imageregistry"
```
  - `<case-file>` is the CASE file.
  - `<registry-user>` is the username for the portable device's registry.
  - `<registry-password>` is the password for the portable device's registry.

3. Create the authentication secret for the entitled registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry cp.icr.io --user <registry-user> --pass <registry-password>" \
```
  - `<case-file>` is the CASE file.
  - `<registry-user>` is the username for the entitled registry. This should be either `cp` or `iamapikey`.
  - `<registry-password>` is the password for the entitled registry.

4. Create the authentication secret for the portable registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry localhost:443 --user <registry-user> --pass <registry-password>"
```
  - `<case-file>` is the CASE file.
  - `<registry-user>` is the username for the portable device's registry.
  - `<registry-password>` is the password for the portable device's registry.

The credentials are saved to `$HOME/.airgap/secrets/localhost:443.json`

#### 4. Mirror images to portable registry

1. The following step copies the images in the CASE from the source (public) registry to the portable registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action mirror-images \
    --args "--registry localhost:443 --inputDir $HOME/offline"
```
  - `<case-file>` is the CASE file.

#### 5. Transport portable device

Now that the images are in the portable registry, transport the portable host into the air gap environment.

#### 6. Log into the cluster

Log into the Red Hat OpenShift Container Platform cluster as a cluster administrator using the `oc login` command.

#### 7. Configure portable device's registry authentication secret

1. Create the authentication secret for the portable device's registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-creds-airgap \
    --args "--registry <portable-registry> --user <registry-user> --pass <registry-password>"
```
  - `<case-file>` is the CASE file.
  - `<portable-registry>` is the portable device's registry.
  - `<registry-user>` is the username for the portable device's registry.
  - `<registry-password>` is the password for the portable device's registry.

The credentials are saved to `$HOME/.airgap/secrets/$TARGET_REGISTRY.json`

#### 8. Mirror images to portable device's registry

1. The following step copies the images in the CASE from the portable registry to the portable device's registry.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action mirror-images \
    --args "--fromRegistry localhost:443 --registry <portable-registry> --inputDir $HOME/offline"
```
  - `<case-file>` is the CASE file.
  - `<portable-registry>` is the portable device's registry.

#### 9. Configure cluster to access portable device's registry

1. Configure a global image pull secret and ImageContentSourcePolicy resource.

```
cloudctl case launch \
    --case $HOME/offline/<case-file> \
    --namespace openshift-marketplace \
    --inventory clinicalDataAnnotatorOperatorSetup \
    --action configure-cluster-airgap \
    --args "--registry <portable-registry> --inputDir $HOME/offline"
```
  - `<case-file>` is the CASE file.
  - `<portable-registry>` is the portable device's registry.

*WARNING:* This step may restart all cluster nodes. The cluster resources might be unavailable until the time the new pull secret is applied.

2. Optional: If you are using an insecure portable device's registry, you must add the portable device's registry to the cluster insecureRegistries list.

```
oc patch image.config.openshift.io/cluster --type=merge \
    -p '{"spec":{"registrySources":{"insecureRegistries":["'<portable-registry>'"]}}}'
```
  - `<portable-registry>` is the portable device's registry.

#### 10. Proceed with installation

Now that the air gap installation preparation steps are complete, you may continue with the installation [Installing ACD](../installing).
