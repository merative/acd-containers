---
title: "Namespace Considerations"
excerpt: "Namespace Considerations."
categories: planning
slug: namespace
toc: true
---

All ACD resources are namespace-scoped except for the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are cluster resources and are available to all namespaces.

IBM Watson Annotator for Clinical Data (ACD) Container Edition handles installation and management of the ACD service using an ACD operator. The ACD operator and its management of its ACD operand are different depending on the selected installation mode. Regardless of the ACD operator installation mode, each ACD instance must have its own namespace.

Two installation mode are supported:

- All namespaces mode
- Single namespace mode

Namespaces must be valid [DNS](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) label names.

## All namespaces mode

When the ACD operator is installed using all namespaces mode, a single ACD operator is installed into the `openshift-operators` namespace. Each subsequent ACD operand is installed into a specified namespace.

## Single namespace mode

When the ACD operator is installed using single namespace mode, each ACD operator and it's ACD operand are installed into a specified namespace.

If no namespace is specified on the [cloudctl CLI](https://ibm.github.io/acd-containers/installing/installing/#install-the-acd-operator-using-cloudctl), the `ibm-wh-acd-operator-system` namespace is used.
