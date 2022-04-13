---

copyright:
  years: 2011, 2021
lastupdated: "2019-09-21"

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

# Ejection Fraction (experimental)
{: #ejection_fraction}

The purpose of the Ejection Fraction annotator is to annotate ejection fraction test results. Ejection fraction is a measurement of the percentage of blood leaving your heart each time it contracts. The Ejection Fraction annotation is generally used as input into calculations or models in the cardiac domain.

The span of the EjectionFractionInd annotation includes all the associated terms, numeric percent value(s) and the token words between them.

Examples:

* low EF.
* 20% EF.
* EF is low.
* EF is 20%.
* EF is 20-35%.
* LVEF was normal
* ejection fraction was normal.
* ejection fraction of 20%-25%.
* EF has to be measured at approximately 30%-50%.
* 47% EF recent report of echo.
* ef of between 0 and 25% by echocardiogram.
* ejection fraction of 10 - 25 percent by echocardiogram.
* 25 percent to 30 percent ejection fraction.

## Configurations

<table>
<tr>
<th>Configuration</t>
<th>Values</th>
<th>Description</th>
</tr>
<tr>
<td>library</td>
<td>
<ul>
  <li>umls.latest</li>
  <li>umls.2021AA</li>
  <li>umls.2020AA</li>
  <li>umls.2019AA <i>(deprecated - will be removed in 2022)</i></li>

</ul>
</td>
<td>
Defines the version of the UMLS library that is used when analyzing unstructured data. The value `umls.latest` will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, `umls.latest` library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production.
</td>
</tr>
</table>

<h4>Annotation Types</h4>

* aci.EjectionFractionInd

## aci.EjectionFractionInd

<table>
<tr><th>__Feature__</th><th>__Description__</th></tr>
</thd><td>begin</td><td>The start position of the annotation as a character offset into the text. The smallest possible start position is 0.</td></tr>
<tr><td>end</td><td>The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.</td></tr>
<tr><td>coveredText</td><td>The text covered by an annotation as a string.</td></tr>
<tr><td>type</td><td>aci.EjectionFractionInd</td></tr>
<tr><td>firstValue</td><td>The first value of percentage.  For example, in the text “echocardiogram demonstrated ejection fraction of 30 to 35%”, the firstValue is 30.</td></tr>
<tr><td>secondValue</td><td>The second value of percentage.  For example, in the text “echocardiogram demonstrated ejection fraction of 30 to 35%”, the secondValue is 35.  If the value is not specified as a range then the value of this feature is not retuned.</td></tr>
<tr><td>isRange</td><td>Determines if the ejection fraction phrase contains a range of values.  For example, in the text “echocardiogram demonstrated ejection fraction of 30 to 35%”, the isRange is true.</td></tr>
<tr><td>measurementMethod</td><td>Method by which the Ejection/Fraction percentage or ratio is measured.  The measurementMethod will be `echo` if the method by which the ejection fraction was take was an echocardiogram, otherwise, the measurementMethod  feature will not be present.</td></tr>
<tr><td>efAlphabeticValueNormalizedName</td><td>Normalized name for the appliied value that is word form.</td></tr>
<tr><td>efAlphabeticValueSurfaceForm</td><td>Covered text that represents applied value in word form.   For example, in the text `EF was severely depressed at 28%`, the efAlphabeticValueSurfaceForm is `severely depressed`.  Examples include:   `low`, `normal`, `reduced`, and `improvement`.</td></tr>
<tr><td>efTermNormalizedName</td><td>Normalized name for ejection fraction.   For example, in the text `Echocardiogram at the outside hospital demonstrated EF of approximately 60%`, the efTermNormalizedName is `ejection fraction`.</td></tr>
<tr><td>efTermSurfaceForm</td><td>Covered text that represents the ejection fraction.   For example, in the text `Echocardiogram at the outside hospital demonstrated EF of approximately 60%`, the efTermSurfaceForm is `EF`.  Examples include:  `EF`, `LVEF`, `left ventricular ejection fraction`, `RVEF`,  and `ejection fraction`.</td></tr>
<tr><td>efSuffixSurfaceForm</td><td>Covered text that represents the suffix to the measurement.  For example, in the text `Echocardiogram demonstrated EF of approximately 60%`, the efSuffixSurfaceForm is `%`.  Examples include: `%`, `percent`,  and `percentile`,</td></tr>
<tr><td>efSuffixNormalizedName</td><td>Normalized name for suffix measurement fraction.</td></tr>
<tr><td>echocardiogramNormalizedName</td><td>The normalized name for the echocardiogram.</td></tr>
<tr><td>echocardiogramSurfaceForm</td><td>Covered text that represents the echocardiogram.  Examples include:   `echo`, `echocardiogram`, and  "echocardiographic".</td></tr>
</table>

### Sample Response

Sample response from the ejection fraction annotator for the text: `ejection fraction of 10 - 25 percent by echocardiogram`

```
"EjectionFractionInd": [
          {
            "type": "aci.EjectionFractionInd",
            "begin": 0,
            "end": 54,
            "coveredText": "ejection fraction of 10 - 25 percent by echocardiogram",
            "hypothetical": false,
            "firstValue": "10",
            "secondValue": "25",
            "efTermSurfaceForm": "ejection fraction",
            "efSuffixSurfaceForm": "percent",
            "efSuffixNormalizedName": "percent",
            "echocardiogramNormalizedName": "echocardiogram",
            "efTermNormalizedName": "ejection fraction",
            "echocardiogramSurfaceForm": "echocardiogram",
            "measurementMethod": "echo",
            "isRange": "true"
          }
        ]
```
