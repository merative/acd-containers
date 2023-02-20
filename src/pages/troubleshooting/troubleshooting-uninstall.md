---
title: "Troubleshooting Uninstall"
excerpt: "Troubleshooting the ACD Container Edition uninstall issues"
categories: troubleshooting
slug: troubleshooting-uninstall
toc: true
---

## Troubleshooting uninstall

### Removing a terminating namespace

Occasionally some of the custom resources managed by an operator may remain in "Terminating" status waiting on a finalizer to complete. The resources remain in the "Terminating" state even after you have performed all the uninstall steps, or you are not able to uninstall from the web console because the uninstall option is greyed out.

1. Check that the namespace is stuck in Terminating state upon deletion.

    ```
    oc get namespace ${acd_namespace}
    ```

    Output:

    ```
    NAME               STATUS        AGE
    my-acd-namespace   Terminating   46m
    ```

1. Check for the `NamespaceFinalizersRemaining` and `NamespaceContentRemaining` messages in the `STATUS` section of the command output and perform the next step for each of the listed resources.

    ```
    oc get namespace ${acd_namespace} -o yaml
    ```

    Output:

    ```
    status:
      conditions:
      - lastTransitionTime: "2021-06-23T18:20:03Z"
        message: All resources successfully discovered
        reason: ResourcesDiscovered
        status: "False"
        type: NamespaceDeletionDiscoveryFailure
      - lastTransitionTime: "2021-06-23T18:20:03Z"
        message: All legacy kube types successfully parsed
        reason: ParsedGroupVersions
        status: "False"
        type: NamespaceDeletionGroupVersionParsingFailure
      - lastTransitionTime: "2021-06-23T18:20:21Z"
        message: All content successfully deleted, may be waiting on finalization
        reason: ContentDeleted
        status: "False"
        type: NamespaceDeletionContentFailure
      - lastTransitionTime: "2021-06-23T18:20:03Z"
        message: 'Some resources are remaining: acds.wh-acd.ibm.com has 1 resource instances'
        reason: SomeResourcesRemain
        status: "True"
        type: NamespaceContentRemaining
      - lastTransitionTime: "2021-06-23T18:20:03Z"
        message: 'Some content in the namespace has finalizers remaining: helm.sdk.operatorframework.io/uninstall-release in 1 resource instances'
        reason: SomeFinalizersRemain
        status: "True"
        type: NamespaceFinalizersRemaining
      phase: Terminating
    ```

1. Delete all the remaining resources listed in the previous step.

    For each of the resources to be deleted, do the following:

    1. Get the object kind of the resource which needs to be removed. See the message in the above output.

        Example:

        `message: Some resources are remaining: acds.wh-acd.ibm.com has 1 resource instances`

        Here `acds.wh-acd.ibm.com` is the object kind.

    2. Get the Object name corresponding to the object kind.

        ```
        oc get  <object-kind> -n  ${acd_namespace}
        ```

        Example:

        ```
        oc get acds.wh-acd.ibm.com -n ${acd_namespace}
        ```

        Example output:

        ```
        NAME                           AGE
        acd-instances                  26h
        ```

    3. Patch the resources.

        ```
        oc patch -n ${acd_namespace} <object-kind>/<object-name> --type=merge -p '{"metadata": {"finalizers":null}}'
        ```

        Example:

        ```
        oc patch -n ${acd_namespace} \
        acds.wh-acd.ibm.com/acd-instance \
        --type=merge -p '{"metadata": {"finalizers":null}}'
        ```

        Output:

        ```
        acd.wh-acd.ibm.com/acd-instance patched
        ```

1. Verify that the namespace is deleted.

    ```
    oc get namespace ${acd_namespace}
    ```

    Output:

    ```
    Error from server (NotFound): namespaces "my-acd-namespace" not found
    ```

Use these troubleshooting steps with caution. Read more about the [hidden dangers of terminating namespaces](https://www.openshift.com/blog/the-hidden-dangers-of-terminating-namespaces) and troubleshooting similar issues when [unable to delete a resource](https://access.redhat.com/solutions/4165791).
