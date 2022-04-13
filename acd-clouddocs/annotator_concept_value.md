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

# Concept Value
{: #concept_value}

The Concept Value annotator is intended to be used in conjunction with the [Concept
Detection annotator](/docs/wh-acd?topic=wh-acd-concept_detection#concept_detection) to identify values within unstructured data associated with concepts.  For example:

`blood pressure is 120/70 mmHg`

Associating a numeric value and units with a concept allows you to extract more useful insights about the medical concepts in your unstructured text.

Values can be either scalar, a range, boolean, or textual. Concept Values are detected by identifying lexical triggers in text indicating a value relationship (>, >=, <, <=, is, etc.) between a previously detected concept and value. They are particularly useful for criteria matching use cases since they can be used to build a set of constraints or rules that must be met in order for something to be eligible.

Concept Value provides out of the box handling for some lexical triggers.  If the default support does not cover what you need, the Concept Value annotator can be configured to detect values and language patterns unique to your data.

{: shortdesc}

## Annotation Types

* ConceptValue

### Response Fields

<table>
<tr>
<th>Fields</th><th>Description</th>
</tr>
<tr>
<td>cui</td>
<td>UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources.</td>
</tr>
<tr>
<td>preferredName</td>
<td>Normalized name for the UMLS concept.</td>
</tr>
<tr>
<td>trigger</td>
<td>The lexical trigger that fired the Concept Value relationship, for example: `greater than`, `less than`, `at least`, or `more than`, etc.</td>
</tr>
<tr>
<td>type</td>
<td>ConceptValue</td>
</tr>
<tr>
<td>begin</td>
<td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td>
</tr>
<tr>
<td>end</td>
<td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td>
<td></td>
</tr>
<tr>
<td>unit</td>
<td>The units in which the value is specified.</td>
</tr>
<tr>
<td>value</td>
<td>The value for the subject concept.</td>
</tr>
<tr>
<td>dimension</td>
<td>This feature contains the dimension of the units of this value, for example: `time`, `length`, `volume`, `pressure`, etc.</td>
</tr>
<tr>
<td>rangeBegin</td>
<td>When the value is a range this feature contains the beginning value of the range.</td>
</tr>
<tr>
<td>rangeEnd</td>
<td>When the value is a range this feature contains the end value of the range.</td>
</tr>
</table>

### Sample Response

#### Example 1: Greater than or equal to Concept Value with units

**Text:** _The patient must have **platelet count greater than or equal to 100000/μl**._

In this example, a Concept Value annotation is created with the platelet count concept and the associated value.

```javascript
"conceptValues": [
          {
            "cui": "C1287267",
            "dimension": "concentration",
            "preferredName": "Finding of platelet count",
            "trigger": "greater than or equal to",
            "unit": "/μl.",
            "value": "100000",
            "type": "ConceptValue",
            "begin": 22,
            "end": 72,
            "coveredText": "platelet count greater than or equal to 100000/μl.",
            "negated": false,
            "hypothetical": false
          }
      ]
```

The **trigger** field can be used to evaluate the constraint - i.e. the platelet count finding must be >= 100,000 parts per μl.

#### Example 2: Greater than or equal to Concept Value with units and natural language expression of value - "at least"

***Text***: _The patient must have a ***platelet count of at least 100000/μl***._


This is similar to the first example, but this time the language is <q>at least</q> instead of <q>greater than or equal to</q>.  Notice how the **trigger** field is normalized to `greater than or equal to`.

```javascript
"conceptValues": [
          {
            "cui": "C1287267",
            "dimension": "concentration",
            "preferredName": "Finding of platelet count",
            "trigger": "greater than or equal to",
            "unit": "/μl.",
            "value": "100000",
            "type": "ConceptValue",
            "begin": 24,
            "end": 61,
            "coveredText": "platelet count of at least 100000/μl.",
            "negated": false,
            "hypothetical": false
          }
      ]
```

#### Example 3: ConceptValue with non-numeric value - _`positive`_

Text: _***Hormone receptor positive** patients are candidates for anti-estrogen therapy._


This example demonstrates a non-numeric value (`positive`)for a concept that does not use numeric values.

```javascript
"conceptValues": [
          {
            "cui": "C0019929",
            "preferredName": "Hormone Receptor",
            "value": "positive",
            "type": "ConceptValue",
            "begin": 0,
            "end": 25,
            "coveredText": "Hormone receptor positive",
            "negated": false,
            "hypothetical": true,
            "hypotheticalType": "HypotheticalSpan"
          }
        ]
```

#### Example 4: ConceptValue with a range value set

**Text:** _The area of a typical **aortic valve is 3.0 to 4.0 cm2**._

This example demonstrates a set of range values. The trigger **within** indicates that a Concept Value annotation encompasses a set of range values.

```javascript
"conceptValues": [
    {
      "cui": "C0003501",
      "dimension": "area",
      "preferredName": "Aortic valve structure",
      "trigger": "within",
      "unit": "cm2",
      "rangeBegin": "3.0",
      "rangeEnd": "4.0",
      "type": "ConceptValue",
      "begin": 22,
      "end": 52,
      "coveredText": "aortic valve is 3.0 to 4.0 cm2",
      "negated": false,
      "hypothetical": false
    }
]
```

### Dependencies

Concept Detection must run prior to Concept Value in your {{site.data.keyword.wh-acd_short}} flow to function properly.
