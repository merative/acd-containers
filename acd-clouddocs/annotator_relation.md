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

# Relation
{: #annotator-relation}

The relation annotator is intended to be used in conjunction with the <a data-scroll="" href="wh-acd?topic=wh-acd-concept_detection#concept_detection">concept detection</a> annotator to identify related concepts in unstructured text. The relationship annotator will identify concepts with a defined relationship in either UMLS or a custom ontology that exist with the same sentence.
{: shortdesc}

<h4>Configurations</h4>

<table>
<tr>
<th>Configuration</th>
<th>Description</th>
</tr>
<tr>
<td>relationship_configurations</td>
<td>The name of the relationship configurations that identify the relationships to detect.</td>
</tr>
</table>

<h4>Annotation Types</h4>

* relations

## Relation

<table>
<tr><th>Fields</th><th>Description</th></tr>
</tr><td>type</td><td>The type of relationship that exists between the concepts.</td></tr>
<tr><td>source</td><td>The name of the ontology that defines the relationship. </td></tr>
<tr><td>nodes</td><td>The nodes identifies the related concepts. Nodes includes an entity for each concept that was related. An identifier is provided in the **uid** field that can be link back to the concept.
</tr>
</table>

### Sample Response

Sample response from the relation annotator for the text: `She is taking ibuprofen to help with her pain.`

It references the concepts for `ibuprofen` and `pain` as having both the `may_prevent` and the `may_be_prevented_by` relationship.

```javascript
{
  "unstructured": [
    {
      "text": "She is taking ibuprofen to help with her pain.",
      "data": {
        "concepts": [
          {
            "cui": "C0020740",
            "preferredName": "Ibuprofen",
            "semanticType": "orch",
            "source": "umls",
            "type": "umls.OrganicChemical",
            "begin": 14,
            "end": 23,
            "coveredText": "ibuprofen",
            "uid": 2
          },
          {
            "cui": "C0030193",
            "preferredName": "Pain",
            "semanticType": "sosy",
            "source": "umls",
            "type": "umls.SignOrSymptom",
            "begin": 41,
            "end": 45,
            "coveredText": "pain",
            "uid": 3
          }
        ],
        "relations": [
          {
            "source": "umls",
            "nodes": [
              {
                "entity": {
                  "uid": 2
                }
              },
              {
                "entity": {
                  "uid": 3
                }
              }
            ],
            "type": "may_be_prevented_by"
          },
          {
            "source": "umls",
            "nodes": [
              {
                "entity": {
                  "uid": 3
                }
              },
              {
                "entity": {
                  "uid": 2
                }
              }
            ],
            "type": "may_prevent"
          }
        ]
      }
    }
  ]
}
```
