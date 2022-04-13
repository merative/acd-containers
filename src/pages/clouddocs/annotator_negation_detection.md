---
title: "Negation"
excerpt: "."
categories: Annotators
slug: annotator_negation_detection
toc: true
---
<!-- ---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Negation -->

The negation detection annotator identifies the spans of text that are the object of a negation and also identifies the text that triggered the negation. The annotator adds a **negated** field to annotations to indicate if the annotation is negated.

## Configurations

| Configuration | Values | Description |
|:--------------|:-------|:------------|
| fully_covered | true/false | When true <i>(default)</i>, an annotation must be fully covered by a negated span to be marked negated. If false, the annotation will be considered negated if any part of it overlaps with a negated span. |
| remove_negated | true/false |When false <i>(default)</i>, an annotation will be kept although they are detected to be negated. If true, the negated annotation will be removed |

### Annotation Types

* NegatedSpan

#### NegatedSpan

| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | NegatedSpan |
| trigger | The text that triggered the negation. For example, in the text <q>She denies pain</q>, the trigger is <q>denies</q>. |

---

#### Trigger 
| Feature | Description |
|:--------|-------------|
| begin | The start position of the annotation as a character offset into the text. The smallest possible start position is 0. |
| end | The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText. |
| coveredText | The text covered by an annotation as a string. |
| type | trigger |

## Sample Response

Sample response from the negation annotator for the text: `The patient denies pain.`

In this example, the concepts for `pain` was annotated with the **negated** field value of `true` to indicate it is negated.

```javascript
{
  "unstructured": [
    {
      "text": "The patient denies pain.",
      "data": {
        "concepts": [
          {
            "cui": "C0030705",
            "preferredName": "Patients",
            "semanticType": "podg",
            "source": "umls",
            "type": "umls.PatientOrDisabledGroup",
            "begin": 4,
            "end": 11,
            "coveredText": "patient",
            "negated": false
          },
          {
            "cui": "C0332319",
            "preferredName": "Denied (qualifier)",
            "semanticType": "qlco",
            "source": "umls",
            "type": "umls.QualitativeConcept",
            "begin": 12,
            "end": 18,
            "coveredText": "denies",
            "negated": false
          },
          {
            "cui": "C0030193",
            "preferredName": "Pain",
            "semanticType": "sosy",
            "source": "umls",
            "type": "umls.SignOrSymptom",
            "begin": 19,
            "end": 23,
            "coveredText": "pain",
            "negated": true
          }
        ],
        "negatedSpans": [
          {
            "trigger": {
              "begin": 12,
              "end": 18,
              "coveredText": "denies"
            },
            "type": "NegatedSpan",
            "begin": 19,
            "end": 23,
            "coveredText": "pain"
          }
        ]
      }
    }
  ]
}
```
