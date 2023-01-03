---
title: "Using Image Mirroring"
excerpt: "Using Image Mirroring"
categories: installing
slug: using-image-mirroring
toc: true
---

Image mirroring is a technique to pull a container image from one or more registries using the same fully qualified image name.  Setting up container registry repository mirroring enables you to do the following:

- Configure your OpenShift Container Platform cluster to redirect requests to pull images from a repository on a source image registry and have it resolved by a repository on a mirrored image registry.
- Identify multiple mirrored repositories for each target repository, to make sure that if one mirror is down, another can be used.
- Enable IBM ACD Container Edition to pull images from the new Merative ACD image registry so IBM ACD will continue to run after March 31, 2023.

See Red Hat OpenShift's [configuring image registry repository mirroring](https://docs.openshift.com/container-platform/4.8/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration) for additional details.

Images for IBM Watson Annotator for Clinical Data (ACD) are available from the IBM Entitled Registry through March 31, 2023. Images for Merative Annotator for Clinical Data are available from the Merative ACD registry. ACD consumers need to migrate from IBM ACD to Merative ACD by March 31, 2023. In order to give existing consumers of IBM ACD time to migrate, the most recent versions of IBM ACD images [versions](https://github.com/merative/acd-containers/blob/master/CHANGELOG.md#releases) have been mirrored to the Merative ACD registry. ACD consumers using IBM Watson ACD need to either migrate to the Merative ACD or setup mirroring to pull the IBM ACD images from the Merative ACD registry by March 31, 2023. Credentials for the Merative ACD registry can be used to pull either Merative or IBM ACD images.

In order to use mirrored images, follow these steps to configure container registry and repository image source and mirror locations on your cluster.

### Configure mirroring to an existing mirror location

1. Log into the cluster

  Log into the Red Hat OpenShift Container Platform cluster as a cluster administrator using the `oc login` command.

1. Create a global pull secret credential for the Merative ACD registry, if not previously created. See [creating a global pull secret](/installing/installing/#acd-registry-pull-secret) for details.

  **NOTE**: You can only configure global pull secrets for clusters that have an ImageContentSourcePolicy object. You cannot add a pull secret to a project.

  It may take a few minutes to propagate the global pull secret change to all nodes.  You can verify the change has completed by dumping the global pull secret configuration file.  Look for the existence of your new secrets on each node's config.json file.

  ```
  for node in `oc get no |awk -F " " '/Ready/ {print $1}'`;  do oc debug node/$node -- chroot /host cat /var/lib/kubelet/config.json; done
  ```

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
  oc create -f acd-registry-mirror.yaml
  ```

  After the `ImageContentSourcePolicy` object is created, the new settings are deployed to each node and the cluster starts using the mirrored repository for requests to the source repository.  This may take a multiple minutes depending on the number of nodes and version of OpenShift.  Each node will show `SchedulingDisabled` while the update is being applied.

1. You can monitor the node status using the `get nodes` command and wait until they are all in the Ready state.

  List your nodes:

  ```
  oc get nodes
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

  You can further verify that the change has propagated to each node by issuing the following command.  Look for your new mirror changes in the registries.conf file on each node.

  ```
  for node in `oc get no |awk -F " " '/Ready/ {print $1}'`;  do oc debug node/$node -- chroot /host cat /etc/containers/registries.conf;done
  ```

  Example of the mirror configuration file:

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


### Mirror images to another container registry

There are several ways that you can mirror images from one registry to another. Choose the most appropriate method for your environment. These documents may be useful as references.

- Set up a mirrored repository with Red Hat Quay, as described in [Red Hat Quay Repository Mirroring](https://access.redhat.com/documentation/en-us/red_hat_quay/3/html/manage_red_hat_quay/repo-mirroring-in-red-hat-quay). Using Red Hat Quay allows you to copy images from one repository to another and also automatically syncs those repositories repeatedly over time.
- Use a tool such as skopeo (see example [here](https://docs.openshift.com/container-platform/4.8/openshift_images/image-configuration.html#images-configuration-registry-mirror_image-configuration)) to copy images manually from the source directory to the mirrored repository.
- Set up a mirrored repository to a private container registry, as described [here](https://www.ibm.com/docs/en/cloud-paks/cp-data/4.0?topic=tasks-mirroring-images-your-private-container-registry) to mirror images from the IBM Entitled Registry.
