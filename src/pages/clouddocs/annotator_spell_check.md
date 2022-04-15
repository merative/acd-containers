---
title: "Spell Check"
excerpt: "."
categories: Annotators
slug: annotator_spell_check
toc: true
---
<!-- ---

copyright:
  years: 2011, 2019
lastupdated: "2019-04-12"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

---

# Spell Check -->

This annotator identifies misspelled words and phrases in a document and suggests corrections.  You can use the spell check annotator as a standalone preprocessing step for your data or it can be used as part of a larger annotator flow.

Spell check can also be configured to recognize and correct to surface forms in custom dictionaries if the dictionaries are enabled for spell check in the cartridge configuration.

## Configurations

| Configuration | Values | Description |
|:--------------|--------|-------------|
| debug | true/false | When true, the spell check annotator will provide an additional field with a human-readable rendering of the corrections that were applied to the source document. |
| spell_check_profile | default/ocr | A spell check profile defines the basics about the behavior of the spell check service. The default profile which is suitable for common human typos. The ocr profile is a more aggressive profile that tries to correct errors that are introduced by optical character recognition systems. |
| apply_spell_corrections | true/false | When true, spell check applies high confidence corrections to the container text. |

### Annotation Types

* spellCorrectedText
* spellingCorrections
* suggestions

### spellCorrectedText

| Feature | Description |
|:--------|-------------|
| correctedText | The document text with spelling corrections applied. |
| debugText | A debug version of the spell corrected document text that shows a where the corrections were applied in the original text. |

### spellingCorrections

| Feature | Description |
|:--------|-------------|
| begin | The start position of the misspelled word as a character offset into the text.  The smallest possible start position is 0. |
| end< | The end position of the misspelled word as a character offset into the text.  The end position points to the first character after the spelling correction, such that end-begin equals the length of the coveredText. |
| coveredText | The text of the misspelled word. |

### suggestions

| Feature | Description |
|:--------|-------------|
| applied | When true, this indicates that this correction was applied in the _correctedText_ version of the document. |
| text | The text of the spelling suggestion. |

### Sample Response

Sample response from the spell check annotator for the text: `The patient had an ovariactomy`.

```
{
  "unstructured": [
    {
      "text": "The patient had an ovariactomy",
      "data": {
        "spellCorrectedText": [
          {
            "correctedText": "The patient had an ovariectomy"
          }
        ],
        "spellingCorrections": [
          {
            "begin": 19,
            "end": 30,
            "coveredText": "ovariactomy",
            "suggestions": [
              {
                "applied": true,
                "confidence": 0.97,
                "text": "ovariectomy"
              },
              {
                "applied": false,
                "confidence": 0.818,
                "text": "ovariotomy"
              }
            ]
          }
        ]
      }
    }
  ]
}
```
