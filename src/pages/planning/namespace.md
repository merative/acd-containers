---
title: "Namespace Considerations"
excerpt: "Namespace Considerations."
categories: planning
slug: namespace
toc: true
---

_Note: All Annotator for Clinical Data (ACD) Container Edition consumers need to migrate their ACD instances from IBM Watson ACD to Merative ACD by December 31, 2022.  See [Migration](/migration/considerations/) for more details._

All Annotator for Clinical Data (ACD) Container Edition resources are namespace-scoped except for the ACD CustomResourceDefinition (CRD) itself. CustomResourceDefinitions are cluster resources and are available to all namespaces.

Annotator for Clinical Data (ACD) Container Edition handles installation and management of the ACD service using an ACD operator. The ACD operator and its management of its ACD operand are handled differently depending on the selected installation mode. Regardless of the ACD operator installation mode, each ACD service instance (ACD operand) must have its own namespace.

Two installation mode are supported:

- All namespaces mode
- Single namespace mode

Namespaces must be valid [DNS](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names) label names.

## All namespaces mode

When the ACD operator is installed using all namespaces mode, a single ACD operator is installed into the `openshift-operators` namespace. Each subsequent ACD operand is installed into the specified namespace.

## Single namespace mode

When the ACD operator is installed using single namespace mode, each ACD operator and its ACD operand are installed into the specified namespace.
