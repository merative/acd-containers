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

# Spell Check
{: #spell_check}

This annotator identifies misspelled words and phrases in a document and suggests corrections.  You can use the spell check annotator as a standalone preprocessing step for your data or it can be used as part of a larger annotator flow.

Spell check can also be configured to recognize and correct to surface forms in custom dictionaries if the dictionaries are enabled for spell check in the cartridge configuration.


## Configurations

<table>
  <tr>
    <th>Configuration</th>
    <th>Values</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>debug</td>
    <td>true/false</td>
    <td>When true, the spell check annotator will provide an additional field with a human-readable rendering of the corrections that were applied to the source document.</td>
  </tr>
  <tr>
    <td>spell_check_profile</td>
    <td>default/ocr</td>
    <td>A spell check profile defines the basics about the behavior of the spell check service. The default profile which is suitable for common human typos. The ocr profile is a more aggressive profile that tries to correct errors that are introduced by optical character recognition systems. </td>
  </tr>
  <tr>
    <td>apply_spell_corrections</td>
    <td>true/false</td>
    <td>When true, spell check applies high confidence corrections to the container text.</td>
  </tr>
</table>

## Annotation Types

* spellCorrectedText
* spellingCorrections
* suggestions

### spellCorrectedText

<table>
  <tr>
    <th>Feature</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>correctedText</td>
    <td>The document text with spelling corrections applied.</td>
  </tr>
  <tr>
    <td>debugText</td>
    <td>A debug version of the spell corrected document text that shows a where the corrections were applied in the original text.</td>
  </tr>
</table>

### spellingCorrections

<table>
  <tr>
    <th>Feature</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>begin</td>
    <td>The start position of the misspelled word as a character offset into the text.  The smallest possible start position is 0.</td>
  </tr>
  <tr>
    <td>end</td>
    <td>The end position of the misspelled word as a character offset into the text.  The end position points to the first character after the spelling correction, such that end-begin equals the length of the coveredText.</td>
  </tr>
  <tr>
    <td>coveredText</td>
    <td>The text of the misspelled word.</td>
  </tr>
</table>

### suggestions

<table>
  <tr>
    <th>Feature</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>applied</td>
    <td>When true, this indicates that this correction was applied in the _correctedText_ version of the document.</td>
  </tr>
  <tr>
    <td>confidence</td>
    <td>A measure of how confident the annotator is that this suggestion is correct.</td>
  </tr>
  <tr>
    <td>text</td>
    <td>The text of the spelling suggestion.</td>
  </tr>
</table>

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
