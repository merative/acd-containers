---

copyright:
  years: 2019
lastupdated: "2019-04-16"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

{:shortdesc: .shortdesc}
{:new_window: target="_blank"}
{:tip: .tip}
{:important: .important}
{:note: .note}
{:deprecated: .deprecated}
{:pre: .pre}
{:codeblock: .codeblock}
{:screen: .screen}
{:javascript: .ph data-hd-programlang='javascript'}
{:java: .ph data-hd-programlang='java'}
{:python: .ph data-hd-programlang='python'}
{:swift: .ph data-hd-programlang='swift'}

# Medical Codes
{: #medical_codes}

{{site.data.keyword.wh-acd_short}} normalizes medical concepts into many common medical codes.  The following table shows the medical code support for each annotator available in  {{site.data.keyword.wh-acd_short}}.

| Medical Codes | NCI | ICD 9/10 | LOINC | MeSH | RxNorm | SNOMED CT | CPT | CCS | HCC | UMLS CUI |
|:--------------|:---:|:--------:|:-----:|:----:|:------:|:---------:|:---:|:---:|:---:|:--------:|
| Allergy | | | | | ✔ | | | | | |
| Cancer | | ✔ | | | | ✔ | | ✔ | ✔ | ✔ |
| Ejection Fraction | | | | | | | | | | |
| Lab Value | | | ✔ | | | | | | | |
| Living Assistance | | | | | | | | | | |
| Medication | | | | | ✔ | | | | | |
| Named Entities | | | | | | | | | | |
| Procedure | | | | | | | ✔ | | | ✔ |
| Symptom Disease | | ✔ | | | | ✔ | | ✔ | ✔ | ✔ |

{: caption="Turn key Annotators" caption-side="top"}

| Medical Codes | NCI | ICD 9/10 | LOINC | MeSH | RxNorm | SNOMED CT | CPT | CCS | HCC | UMLS CUI |
|:--------------|:---:|:--------:|:-----:|:----:|:------:|:---------:|:---:|:---:|:---:|:--------:|
| Attribute | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Concept (UMLS 2019AA+) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | | | ✔ |
| Concept Value | | | | | | | | | | ✔ |
| Relation | | | | | | | | | | |

{: caption="Configurable Concept Annotators" caption-side="top"}

| Medical Codes | NCI | ICD 9/10 | LOINC | MeSH | RxNorm | SNOMED CT | CPT | CCS | HCC | UMLS CUI |
|:--------------|:---:|:--------:|:-----:|:----:|:------:|:---------:|:---:|:---:|:---:|:--------:|
| Disambiguation | | | | | | | | | | |
| Hypothetical | | | | | | | | | | |
| Negation | | | | | | | | | | |
| Section | | | | | | | | | | |

{: caption="Contextual Annotators" caption-side="top"}
