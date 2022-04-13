---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

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

# Concept Disambiguation
{: #concept_disambiguation}

The Unified Medical Language System (UMLS) provides broad medical concept coverage.  The version that ships with {{site.data.keyword.wh-acd_short}} covers approximately 2 million concepts.  The breadth of this information is useful to explore a new medical domain, but it can also create false annotations over spans of text.  Consider a simple acronym like _TEC_.  In a recent version of UMLS, TEC is annotated with nine concepts, that represent seven different ideas - Thymic epithelial cell, Transient erythroblastopenia of childhood, Transluminal extraction catheter, TEC gene/protein, NR4A3 wt Allele, Tubingen electric campimetry, and RHBDF2 wt Allele.  Collisions like this are not uncommon in UMLS.

The Concept Disambiguation annotator ranks the contextual validity of a UMLS [concept](/docs/wh-acd?topic=wh-acd-concept_detection#concept_detection) based on sentence and document level information.  It can act on any annotation with a UMLS CUI.

If your use case requires you to handle a broad range of medical topics and concept level precision is important, adding disambiguation to your {{site.data.keyword.wh-acd_short}} flow can help.  Conversely, if you work with a relatively small set of concepts or you only use complex derived  [attributes](/docs/wh-acd?topic=wh-acd-attribute_detection#attribute_detection), disambiguation may not be necessary.

The disambiguation annotator can be configured to remove annotations it determines are invalid or to tag them as invalid but leave them in the API response.

<table>
  <tr>
    <th>Configuration</th>
    <th>Values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>remove_invalid</td>
    <td>true/false</td>
    <td>When true, any concepts that disambiguation determines to be invalid will be removed from the API response.  When false <i>(default)</i>, concepts will contain a *validity* field with the value INVALID, VALID, or NO_DECISION but will be preserved in the API response.</td>
  </tr>

</table>

## Sample Response

In this example, TEC refers to *thymic epithelial cell* in the source document.  Notice the **disambiguationData** section contains a field with the judgement.  If **remove_invalid** is set to `true`, the invalid concepts will not be returned in the response.

```
{
    "cui": "C0229951",
    "preferredName": "Thymic epithelial cell",
    "semanticType": "cell",
    "source": "umls",
    "sourceVersion": "2018AA",
    "type": "umls.Cell",
    "begin": 19,
    "end": 22,
    "coveredText": "TEC",
    "nciCode": "C33771",
    "disambiguationData": {
        "validity": "VALID"
    },
    "snomedConceptId": "81596002",
    "vocabs": "MTH,NCI,UWDA,SNOMEDCT_US,FMA"
}
...
{
    "cui": "C0238478",
    "preferredName": "Transient erythroblastopenia of childhood",
    "semanticType": "dsyn",
    "source": "umls",
    "sourceVersion": "2018AA",
    "type": "umls.DiseaseOrSyndrome",
    "begin": 19,
    "end": 22,
    "coveredText": "TEC",
    "icd9Code": "284.89",
    "icd10Code": "D60.1",
    "nciCode": "C131683",
    "disambiguationData": {
      "validity": "INVALID"
    },
    "snomedConceptId": "234375006",
    "meshId": "M0531441",
      "vocabs": "MTH,NCI_NICHD,MSH,NCI,OMIM,SNOMEDCT_US,DXP"
}
```

## Dependencies

Disambiguation only operates on UMLS concepts.  These may come from [concept detection](/docs/wh-acd?topic=wh-acd-concept_detection#concept_detection) or a turn key annotator.  Disambiguation does not attempt to make judgements about custom concepts that you define.

Disambiguation needs a certain amount of document context to operate.  It will not operate on documents less than 15 words long.  Your best results will generally occur when there is enough topical context to give the service a clear picture of which concepts belong in a document and which do not.
