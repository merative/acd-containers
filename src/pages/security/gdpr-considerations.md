---
title: "Considerations for GDPR"
excerpt: "Considerations for GDPR."
categories: security
slug: gdpr-considerations
toc: true
---

## Notice

Clients are responsible for ensuring their own compliance with various laws
and regulations, including the European Union General Data Protection Regulation.
Clients are solely responsible for obtaining advice of competent legal counsel as to
the identification and interpretation of any relevant laws and regulations that may
affect the clients’ business and any actions the clients may need to take to comply
with such laws and regulations.

The products, services, and other capabilities
described herein are not suitable for all client situations and may have restricted
availability. IBM does not provide legal, accounting, or auditing advice or represent or
warrant that its services or products will ensure that clients are in compliance with
any law or regulation.

## GDPR Overview

### What is GDPR?

_GDPR_ stands for General Data Protection Regulation.

GDPR has been adopted by the European Union and will apply from May 25, 2018.

### Why is GDPR important?

GDPR establishes a stronger data protection regulatory framework for processing of personal data of individuals. GDPR brings:

- New and enhanced rights for individuals
- Widened definition of personal data
- New obligations for companies and organisations handling personal data
- Potential for significant financial penalties for non-compliance
- Compulsory data breach notification

This document is intended to help you in your preparations for GDPR readiness.

### Read more about GDPR

- [EU GDPR website](https://gdpr.eu/)
- [IBM GDPR website](https://www.ibm.com/data-responsibility/gdpr/)

## Product Configuration for GDPR

The GDPR legislation requires that personal data is strictly controlled and that the
integrity of the data is maintained. This requires the data to be secured against loss
through system failure and also through unauthorized access or via theft of computer equipment or storage media.
Areas for consideration to address these aspects of the GDPR legislation include:

- Physical access to the assets where the product is installed
- [Encryption of data](/security/data-security/) both at rest and in flight
- [Managing access](/security/manage-access/) to topics which hold sensitive material.

## Data Life Cycle

### What types of data flow through Annotator for Clinical Data?

There is no definite answer to this question as use cases vary between application development.
The data passed through the ACD Analyze APIs are not persisted nor is the payload data logged.
Only configuration data (e.g. cartridge artifacts) and metadata (e.g. ACD flow and profile names, custom dictionary names, attribute definition rules, etc.) are stored or logged.

### Where is data stored ?

Configuration data of deployed cartridges are persisted in the storage configured for the deployed product.
Configuration metadata may also reside in the logs collected by pods within the deployment.

### Personal data used for online contact with IBM

Annotator for Clinical Data Container Edition clients can submit online comments/feedback requests to contact IBM about Annotator for Clinical Data Container Edition in a variety of
ways, primarily:

- Public issue reporting and feature suggestions via Annotator for Clinical Data Container Edition Git Hub portal
- Private issue reporting via IBM Support

Typically, only the client name and email address are used to enable personal replies for the subject of the contact. The use of personal data conforms to the [IBM Online Privacy Statement](https://www.ibm.com/privacy/us/en/).
