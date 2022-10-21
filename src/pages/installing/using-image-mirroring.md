---
title: "Using Image Mirroring"
excerpt: "Using Image Mirroring"
categories: installing
slug: using-image-mirroring
toc: true
---

Setting up container registry repository mirroring enables you to do the following:

- Configure your OpenShift Container Platform cluster to redirect requests to pull images from a repository on a source image registry and have it resolved by a repository on a mirrored image registry.
- Identify multiple mirrored repositories for each target repository, to make sure that if one mirror is down, another can be used.

See Red Hat OpenShift's [configuring image registry repository mirroring](https://docs.openshift.com/container-platform/4.8/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration) for additional details.

Images for IBM Watson Annotator for Clinical Data are available from the IBM Entitled Registry through December, 2022. Images for Merative Annotator for Clinical Data are available from the ACD registry. ACD consumers need to migrate from IBM ACD to Merative ACD by the end of December, 2022. To help ensure all ACD images are available during this migration period, we have mirrored recent [versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases) of the IBM ACD images from the IBM Entitled Registry to the ACD registry. Credentials for the ACD registry can be used to pull either Merative or IBM ACD images, once mirroring is configured for the IBM ACD images.

In order to use mirrored images, follow these steps to configure container registry and repository image source and mirror locations on your cluster.

### Configure mirroring to an existing mirror location

1. Log into the cluster

  Log into the Red Hat OpenShift Container Platform cluster as a cluster administrator using the `oc login` command.

1. Create the ACD registry credentials for the Azure ACD registry, if not previously created. See [creating a global pull secret](/installing/installing-ibm/#ibm-entitled-registry-pull-secret) for details.

  **NOTE**: You can only configure global pull secrets for clusters that have an ImageContentSourcePolicy object. You cannot add a pull secret to a project.

1. Create an `ImageContentSourcePolicy` file (for example, `acd-registry-mirror.yaml`), replacing the source and mirrors with your own registry and repository pairs and images if you don't want to use the provided mirrors.

  ```yaml acd-registry-mirror.yaml
  apiVersion: operator.openshift.io/v1alpha1
  kind: ImageContentSourcePolicy
  metadata:
    name: acd-registry-mirror
  spec:
    repositoryDigestMirrors:
      - mirrors:
          - acdcontaineredition.azurecr.io/cp/wh-acd
        source: cp.icr.io/cp/wh-acd
      - mirrors:
          - acdcontaineredition.azurecr.io/cp
        source: icr.io/cpopen
  ```

1. Create the new `ImageContentSourcePolicy` object.

  ```
  oc create -f acd-registry-mirrror.yaml
  ```

  After the `ImageContentSourcePolicy` object is created, the new settings are deployed to each node and the cluster starts using the mirrored repository for requests to the source repository.

1. Check that the mirrored configuration settings are applied by doing the following on one of the nodes.

  a. List your nodes:

  ```
  oc get node
  ```

  Example output

    ```
    NAME            STATUS                        ROLES           AGE
    10.240.128.19   Ready                         master,worker   56d
    10.240.128.20   NotReady,SchedulingDisabled   master,worker   56d
    10.240.128.21   Ready                         master,worker   56d
    10.240.128.5    Ready                         master,worker   25h
    10.240.128.6    Ready                         master,worker   25h
    10.240.128.7    Ready                         master,worker   25h
    ```

  You can see that scheduling on each worker node is disabled as the change is being applied.

  b. Start the debugging process to access the node:

    ```
    oc debug node/10.240.128.20
    ```

  Example output

    ```
    Starting pod/1024012821-debug ...
    To use host binaries, run `chroot /host`
    Pod IP: 10.240.128.21
    If you don't see a command prompt, try pressing enter.
    sh-4.4#
    ```

  c. Access the node’s files:

    ```
    sh-4.4# chroot /host
    sh-4.2#
    ```

  d. Check the `/etc/containers/registries.conf` file to make sure the changes were made:

    ```
    sh-4.2# cat /etc/containers/registries.conf
    ```

  Example output

  ```
  unqualified-search-registries = ["registry.access.redhat.com", "docker.io"]

  [[registry]]
    prefix = ""
    location = "cp.icr.io/cp/wh-acd"
    mirror-by-digest-only = true

    [[registry.mirror]]
      location = "acdcontaineredition.azurecr.io/cp/wh-acd"

  [[registry]]
    prefix = ""
    location = "icr.io/cpopen"
    mirror-by-digest-only = true

    [[registry.mirror]]
      location = "acdcontaineredition.azurecr.io/cp"
  ```

  e. Pull an image digest to the node from the source and check if it is resolved by the mirror. `ImageContentSourcePolicy` objects support image digests only, not image tags.

  ```
  podman pull --log-level=debug cp.icr.io/cp/wh-acd/clinical-data-annotator@sha256:bc077404849f4794a9de0ff2aad3a9af78fe72560b46d623a711d42927e5c955
  ```

### Mirror images to another container registry

There are several ways that you can mirror images from one registry to another. Choose the most appropriate method for your environment. These documents may be useful as references.

- Set up a mirrored repository with Red Hat Quay, as described in [Red Hat Quay Repository Mirroring](https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/manage_red_hat_quay/repo-mirroring-in-red-hat-quay). Using Red Hat Quay allows you to copy images from one repository to another and also automatically syncs those repositories repeatedly over time.
- Use a tool such as skopeo (see example [here](https://docs.openshift.com/container-platform/4.8/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration)) to copy images manually from the source directory to the mirrored repository.
- Set up a mirrored repository to a private container registry, as described [here](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.0?topic=tasks-mirroring-images-your-private-container-registry) to mirror images from the IBM Entitled Registry.
