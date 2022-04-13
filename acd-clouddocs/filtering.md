---

copyright:
  years: 2011, 2019
lastupdated: "2019-10-17"

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

# Filtering
{: #filtering}

Filters can be applied in one of two ways, either immediately after an annotator in the flow or at the very end of all flows. Conditions may exist that require annotation filtering before the next annotator runs in the flow. In this case you would define your filter with the specific annotator within the flow element. However, if you do not have unique conditions or you do not know which annotator to add a filter definition in the flow, you can just add your filters to run at the end of all the flows. To do so you define a global configuration as an element of the AnnotatorFlow. (Note: Because of the nature of the Hypothetical and Negation annotators, more consideration may be needed to determine desired filter usage. See Hypothetical and Negation Annotator Filtering below for more information.) Below is an example of several annotators defined in the flow with a global filter to run at the end of all flow elements.

The _globalConfigurations_ filter example below filters out any SymptomDiseaseInd annotations where either `negated=true` or `hypothetical=true` - i.e. remove any negated or hypothetical SymptomDiseaseInd annotations.

```javascript
{
"annotatorFlows": [
        {
            "flow": {
                "elements": [
                    {
                        "flow": {
                            "elements": [
                                {
                                    "annotator": {
                                        "name": "symptom_disease"
                                    }
                                },
                                {
                                    "annotator": {
                                        "name": "negation"
                                    }
                                },
                                {
                                    "annotator": {
                                        "name": "hypothetical"
                                    }
                                }
                            ],
                            "async": true
                        }
                    }
                ],
                "async": false
            },
            "globalConfigurations": [
                {
                    "filter": {
                        "target": "unstructured.data.SymptomDiseaseInd",
                        "serviceFiltered": false,
                        "condition": {
                            "type": "notAny",
                            "conditions": [
                                {
                                    "type": "match",
                                    "field": "negated",
                                    "values": [
                                        "true"
                                    ],
                                    "caseInsensitive": false,
                                    "operator": "equals"
                                },
                                {
                                    "type": "match",
                                    "field": "hypothetical",
                                    "values": [
                                        "true"
                                    ],
                                    "caseInsensitive": false,
                                    "operator": "equals"
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ],
  "unstructured": [
    {
      "text": "Patient does not have lung cancer, but does smoke. She may consider chemotherapy as part of a treatment plan. She also is allergic to dust, but not to pollen. The patient is to have breast cancer screening."
    }
  ]
}
```

The following filter examples illustrate filtering that is defined to be executed after specific annotators complete processing.

Sample request invoking _concept_detection_ with a filter defined to exclude any annotations detected from _concept_detection_ where the _semanticType_ field does not equal _<q>neop</q>_.

```javascript
{
  "annotatorFlows": [
    {
      "flow": {
        "elements": [
          {
            "annotator": {
              "name": "concept_detection",
              "configurations": [
                {
                  "filter": {
                     "target": "unstructured.data.concepts",
                     "condition": {
                        "type": "match",
                        "field": "semanticType",
                        "values": [
                           "neop"
                         ],
                        "not": false,
                        "caseInsensitive": false,
                        "operator": "equals"
                     }
                  }
                }
              ]
            }
          }
        ],
       "async": false
      }
    }
  ],
  "unstructured": [
    {
      "text": "Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan."
    }
  ]
}
```

The definition of filtering includes **target** and **condition** sections. The **target** section specifies type of entities to be filtered (defined via object model path to desired entities) e.g. _unstructured.data.concepts_. The **condition** section includes filtering criteria (Match Condition) or filtering criteria set (Grouped Condition) to be applied to target entities. The following snippets illustrates the **target** section of the filtering definition. The _data_ section will be added to the _unstructured_ section after ACD has invoked an annotator for the unstructured text.

```javascript
{
    "annotatorFlows": [
    ...
    ],
    "unstructured": [
     "text": "Patient has lung cancer",
     "data": {
        "concepts": [
            ...
        ]
    }]
}
```

The **condition** section of the filtering definition specifies different matching conditions. Field-level filtering criteria is based on a set of possible values listed in the following table. The basic field-level filtering can be either grouped as a grouped condition or nested as a nested condition.

| Attribute | Description |
|:----------|:------------|
| type | match (default), all, any, notany |
| field | name of field to evaluate |
| values | list of possible values |
| operator | equal (default), contains, containsOneOf, startsWith, fieldExists, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo |
| caseInsensitive | false(default) or true |
| not | negate condition (i.e. not equals) |

{: caption="Field-level filtering criteria" caption-side="top"}

The following is an example of **Field Equals** scenario.

```javascript
"condition": {
    "type": "match",
    "field": "semanticType",
    "values": [
        "neop"
        ],
    "not": false,
    "caseInsensitive": false,
    "operator": "equals"
}
```

The following is an example of **Field Not Equals** scenario. Notice that _not_ field has the value of true.

```javascript
"condition": {
    "type": "match",
    "field": "semanticType",
    "values": [
        "neop"
    ],
    "not": true,
    "caseInsensitive": false,
    "operator": "equals"
}
```

The following is an example of **Field Contains**. Notice that the _field_ is set to be _section_, and the 'values'.

```javascript
"condition": {
    "type": "match",
    "field": "section",
    "values": [
        "history"
    ],
    "not": true,
    "caseInsensitive": false,
    "operator": "contains"
}
```

The following is an example of **Field Exists**. Notice that the _field_ is set to be _hccCode_, and there are no 'values' required.

```javascript
"condition": {
    "type": "match",
    "field": "hccCode",
    "not": true,
    "caseInsensitive": false,
    "operator": "fieldExists"
}
```

fieldExists scenario looks for the existence of the specified field in the annotation and ensures that the field contains a valid value. Valid values are not null or empty values.

The 'type' field has the default value of _match_. Grouped and nested conditions can be implemented using different values in the 'type' field. The following table list set of conditions to be evaluated.

| Types | Conditions |
|:------|:-----------|
| match | matching condition |
| all | all conditions must be met |
| any | at least one condition must be met |
| not any | no conditions can be met |

{: caption="Conditions to be evaluated" caption-side="top"}

The following snippet illustrates the grouped condition with the *all* type. The returned annotators will satisfy both of the listed conditions.

```javascript
"filter": {
    "target": "unstructured.data.concepts",
    "condition": {
        "type": "all",
        "conditions": [{
            "type": "match",
            "field": "semanticType",
            "values": ["podg"],
            "caseInsensitive": false,
            "operator": "equals"
        },
        {
            "type": "match",
            "field": "cui",
            "values": ["C0684249"],
            "caseInsensitive": false,
            "operator": "equals"
        }]
    }
}
```

The following snippet illustrates the grouped condition with the _any_ type. The returned annotators will satisfy either of the conditions.

```javascript
"filter": {
    "target": "unstructured.data.concepts",
    "condition": {
        "type": "any",
        "conditions": [{
            "type": "match",
            "field": "semanticType",
            "values": ["podg"],
            "caseInsensitive": false,
            "operator": "equals"
        },
        {
            "type": "match",
            "field": "cui",
            "values": ["C0684249"],
            "caseInsensitive": false,
            "operator": "equals"
        }]
    }
}
```

The following snippet illustrates the grouped condition with the _notAny_ type. The annotators will only be returned if they don't match the condition.

```javascript
"filter": {
    "target": "unstructured.data.concepts",
    "condition": {
        "type": "notAny",
        "conditions": [{
            "type": "match",
            "field": "semanticType",
            "values": ["podg"],
            "caseInsensitive": false,
            "operator": "equals"
        },
        {
            "type": "match",
            "field": "cui",
            "values": ["C0684249"],
            "caseInsensitive": false,
            "operator": "equals"
        }]
    }
}
```

Nested condition refers to the include and exclude annotators with different criteria. Nested condition, similar to to the grouped condition, can be implemented by modifying the value of the _type_ field. The following example illustrates the situation where one wants to include annotators with the _semanticType_ of 'podg' however, one wants to exclude annotators with the _semanticType_ of 'neop' and annotators with the _cui_ equals 'C0684249'.

```javascript
"filter": {
    "target": "unstructured.data.concepts",
    "condition": {
        "type": "all",
        "conditions": [{
                "type": "match",
                "field": "semanticType",
                "values": ["podg"],
                "not": true,
                "caseInsensitive": false,
                "operator": "equals"
            },
            {
                "type": "notany",
                "conditions": [{
                    "type": "match",
                    "field": "semanticType",
                    "values": ["neop"],
                    "caseInsensitive": false,
                    "operator": "equals"
                },
                {
                    "type": "match",
                    "field": "cui",
                    "values": ["C0684249"],
                    "caseInsensitive": false,
                    "operator": "equals"
                }]
            }
        }]
    }
}
```

## Hypothetical and Negation Annotator Filtering

Because the Hypothetical and Negation Annotators can affect annotations created by annotators earlier in a flow, filters constructed for these annotators are typically run immediately after the Hypothetical or Negation annotator. If these filters were run in a global manner, after all of the annotators in the flow have completed, the results returned may include annotations with incorrect feature values for "hypothetical," "hypotheticalType," or "negated."

Consider the scenario where the annotator flow contains both the Procedure annotator followed by the Negation annotator, and the text "She did not have an MRI" is analyzed. A ProcedureInd annotation over "MRI" will get created with the "negated" feature value set to "true." There will also be a NegatedSpan annotation over "MRI" returned in the results. If a global filter was used to filter away NegatedSpans where the trigger.coveredText equals "not," the NegatedSpan annotation would no longer show up in the results, however, the ProcedureInd annotation would still have it's "negated" feature value set to "true." This can lead to confusing results. If the same filter was used with the Negation annotator, the "negated" feature would remain "false."

To avoid potential inconsistencies, filters created for Hypothetical or Negation annotators should be declared within the Hypothetical or Negation configurations so they are executed before the effects of these annotators carry over to existing annotations, and not as a global filters.