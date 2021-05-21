---
title: "Namespace Considerations"
excerpt: "Namespace Considerations."
categories: planning
slug: namespace
toc: true
---

IBM® Watson Annotator for Clinical Data Container Edition handles installation and management of the ACD service using an ACD operator. Both the operator and service resources are installed by default into a dedicated namespace.

`ibm-wh-acd-operator-system` is the default namespace used. The ACD operator may be deployed into a different namespace, one per namespace. The ACD service may be deployed into the same namespace as its operator or cluster wide (all namespaces).

All resources created for an ACD installation are namespace-scoped except for the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are cluster resources and are available to all namespaces.

Namespaces must be valid [DNS](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) label names.
