---
title: "Overview"
excerpt: "Overview."
categories: configeditor
slug: overview
toc: true
---
<!-- ---

copyright:
  years: 2022
lastupdated: "2022-09-13"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Overview -->

**Notice:** The Annotator for Clinical Data Configuration Editor is provided as-is (non-warranted) and at no cost to ACD customers.   See [license](https://www14.software.ibm.com/cgi-bin/weblap/lap.pl?li_formnum=L-KMNL-BTV7T4) for terms of use.

## Welcome to the Annotator for Clinical Data Configuration Editor

### Introduction
Annotator for Clinical Data Configuration Editor is used to build knowledge cartridges used to configure and customize Annotator for Clinical Data.  It is focused on providing domain-adaptation to Annotator for Clinical Data service through the construction of knowledge cartridges.

Each customer's use case and data sets are unique, however, there are common cognitive patterns within health data text that can be captured into artifacts so they can be reused across projects. Configuration Editor allows the domain expert to build a cognitive model, contained in a cartridge, to extract structured data from unstructured text in order to derive valuable insights. The tool provides a mechanism for the domain expert to share cognitive models or pieces of a model with other customer engagements. The tool's purpose is to enable customization, reduce development time, and improve accuracy of building cognitive models that run on Annotator for Clinical Data service.

In a cartridge, there are domain-specific artifacts chosen or created by the domain expert detailing Annotator for Clinical Data configuration information. There are various types of artifacts that include: dictionaries, clinical attributes, derived clinical attributes, derived concepts, ontologies, qualifiers, filters, etc. The artifacts are contained in a cartridge, which represents the cognitive model. A cartridge has the ability to include one or more dependencies on other cartridges.

The tool allows the domain expert to view Annotator for Clinical Data analytic insights as they are building their cartridge in order for them to refine their model to meet their business needs. Once the cartridge captures desired cognitive insights, the domain expert will customize Annotator for Clinical Data by deploying a snapshot of the cartridge to Annotator for Clinical Data. The deployment of the cartridge snapshot will create 'flow' and 'profile' objects within the Annotator for Clinical Data service. These objects can then be referenced as part of the request when invoking Annotator for Clinical Data service to analyze your unstructured text.

### Feature Summary
- Catalog of cartridges
- Catalog of reusable knowledge artifacts such as Dictionaries, Filters, Clinical Attribute Sets, Derived Concepts and Derived Clinical Attributes.
- Visually preview and evaluate a cartridge over sample text
- Publish and deploy cartridges to an Annotator for Clinical Data service

### Access to the Configuration Editor
The Configuration Editor can be deployed locally to a single Linux system using Docker or can be deployed on OpenShift.  Follow the instructions for these options below:
- [Install using Docker](/configeditor/download_docker/)
- [Install on OpenShift](/configeditor/download_openshift)

Once installed, use the instructions on the Install page to access the Configuration Editor using a browser on the host it was deployed to.

### Learning Materials
Videos and other [educational content](/configeditor/learning_materials).

### Support and Questions
Configuration Editor is provided to you as-is and free of charge.  Please use your IBM contact email and/or the interlock Slack channel, if provided, to ask questions.

Acceptance of terms of use is required to use the tool.

[View Program Terms](https://www14.software.ibm.com/cgi-bin/weblap/lap.pl?li_formnum=L-KMNL-BTV7T4)

<p></p>

---

Disclaimer

IBM's statements regarding its plans, directions and intent are subject to change or withdrawal without notice at IBM's sole discretion. Information regarding potential future products is intended to outline our general product direction and it should not be relied on in making a purchasing decision. The information mentioned regarding potential future products is not a commitment, promise, or legal obligation to deliver any material, code or functionality. Information about potential future products may not be incorporated into any contract. The development, release, and timing of any future features or functionality described for our products remains at our sole discretion.

[Contact IBM](https://www.ibm.com/contact/us/en/)
[Privacy](https://www.ibm.com/us-en/privacy)
[Terms of use](https://www.ibm.com/legal)
[Accessibility](https://www.ibm.com/able/)
