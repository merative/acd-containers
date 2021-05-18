---
title: "Configuration"
excerpt: "Configure your ACD installation."
categories: management
slug: configuring
toc: true
---

The following tables lists the configurable parameters of the chart and their default values.

| Parameter | Description | Default |
| -         | -           | -       |
| `replicas`                                 | ACD macro service and micro-service replicas     | `3`    |
| `aci.enabled`                              | Micro service - Advanced Care Insights enabled   | `true` |
| `av.enabled`                               | Micro service - Attribute Detection enabled      | `true` |
| `cd.enabled`                               | Micro service - Concept Detection enabled        | `true` |
| `cds.enabled`                              | Micro service - Concept Disambiguation enabled   | `true` |
| `cv.enabled`                               | Micro service - Concept Value Detection enabled  | `true` |
| `hyp.enabled`                              | Micro service - Hypothetical Detection enabled   | `true` |
| `mod.enabled`                              | Micro service - Model Broker enabled       | `true` |
| `neg.enabled`                              | Micro service - Negation Detection enabled       | `true` |
| `ont.enabled`                              | Micro service - Ontology enabled                 | `true` |
| `spl.enabled`                              | Micro service - Spell checker enabled            | `true` |
| `common.environment.artifactstore_shared_backend`                              | Store shared tenant data (`file` or `cos`)            | `file` |
| `common.environment.artifactstore_tenant_backend`                              | Store private tenant data (`file` or `cos`)            | `file` |
| `fileBasedPersistence.enabled`   | File based persistence enabled | `false` |

These additional configurable parameters may be provided when file based storage (`file`) is used by the artifact store and `fileBasedPersistence.enabled` is `true`.

| Parameter | Description | Default |
| -         | -           | -       |
| `fileBasedPersistence.useDynamicProvisioning`   | Use a dynamically provisioned volume | `false` |
| `fileStorePVC.existingClaimName`   | Use an existing persistent volume claim | `<pvc_name>` |
| `fileStorePVC.storageClassName`   | Use an existing persistent volume of this class type | `<storage_class_name>` |
| `fileStorePVC.size`   | Persistent volume size, e.g. 1Gi | `<size>` |

These additional configurable parameters must be provided when IBM Cloud Object Store (`cos`) is used for  `common.environment.artifactstore_shared_backend` or `common.environment.artifactstore_tenant_backend`.

| Parameter | Description | Default |
| -         | -           | -       |
| `common.environment.artifactServiceCosEndpoint` | Artifact service - IBM Cloud Object endpoint (Required) | `s3.us-south.cloud-object-storage.appdomain.cloud` |
| `common.environment.artifactServiceCosRegion`   | Artifact service - IBM Cloud Object region (Required) | `us-south-standard` |
| `common.environment.artifactServiceCosBucket`   | Artifact service - IBM Cloud Object bucket (Required) | `` |
