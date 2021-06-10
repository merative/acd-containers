---
title: "Namespace Considerations"
excerpt: "Namespace Considerations."
categories: planning
slug: namespace
toc: true
---

IBM® Watson Annotator for Clinical Data Container Edition handles installation and management of the ACD service using an ACD operator. Both the operator and service resources are installed by default into a dedicated namespace.

The ACD operator may be deployed into different namespaces, one per namespace, or cluster wide where available to all namespaces. `ibm-wh-acd-operator-system` is the default namespace used when [installing the operator using the CLI](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-operator-using-cloudctl) to one namespace, and `openshift-operators` is the default namespace used in the web console when installing to all namespaces.

The ACD service may be deployed into the same namespace as its operator or to a different dedicated namespace, one per namespace. `ibm-wh-acd-operator-system` is the default namespace used when [installing ACD using the CLI](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-service-using-cloudctl). The default namespace can be overriden with a different namespace at install time.

All resources created for an ACD installation are namespace-scoped except for the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are cluster resources and are available to all namespaces.

The IBM Operator Catalog provides a catalog of IBM provided operators. The catalog is the only installation done to an existing system namespace. The `openshift-marketplace` namespace is the default namespace used.

Namespaces must be valid [DNS](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) label names.
