"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[9808],{3624:function(e,t,n){n.d(t,{Z:function(){return N}});var a=n(7294),r=n(8650),l=n.n(r),o=n(1597),i=n(3383),s=n(2618),d=n(5900),c=n.n(d),u=function(e){var t,n=e.title,r=e.theme,l=e.tabs,o=void 0===l?[]:l;return a.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=o.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},a.createElement("div",{className:"bx--grid"},a.createElement("div",{className:"bx--row"},a.createElement("div",{className:"bx--col-lg-12"},a.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},n)))))},p=function(e){var t=e.relativePagePath,n=e.repository,r=(0,o.useStaticQuery)("1364590287").site.siteMetadata.repository,l=n||r,i=l.baseUrl,s=l.subDirectory,d=i+"/edit/"+l.branch+s+"/src/pages"+t;return i?a.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},a.createElement("div",{className:"bx--col"},a.createElement("a",{className:"EditLink-module--link--IDrl1",href:d},"Edit this page on GitHub"))):null},h=n(4703),m=n(1721),g=function(e){function t(){return e.apply(this,arguments)||this}return(0,m.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,n=e.tabs,r=e.slug,i=r.split("/").filter(Boolean).slice(-1)[0],s=n.map((function(e){var t,n=l()(e,{lower:!0,strict:!0}),s=n===i,d=new RegExp(i+"/?(#.*)?$"),u=r.replace(d,n);return a.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=s,t),"PageTabs-module--list-item--024o6")},a.createElement(o.Link,{className:"PageTabs-module--link--Kz-7R",to:""+u},e))}));return a.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},a.createElement("div",{className:"bx--grid"},a.createElement("div",{className:"bx--row"},a.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},a.createElement("nav",{"aria-label":t},a.createElement("ul",{className:"PageTabs-module--list--xLqxG"},s))))))},t}(a.Component),f=g,k=n(7296),b=n(5387),w=n(3732),y=function(e){var t=e.date,n=new Date(t);return t?a.createElement(w.X2,{className:"last-modified-date-module--row--XJoYQ"},a.createElement(w.sg,null,a.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",n.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},N=function(e){var t=e.pageContext,n=e.children,r=e.location,d=e.Title,c=t.frontmatter,m=void 0===c?{}:c,g=t.relativePagePath,w=t.titleType,N=m.tabs,v=m.title,x=m.theme,_=m.description,E=m.keywords,P=m.date,C=(0,b.Z)().interiorTheme,T=(0,o.useStaticQuery)("2456312558").site.pathPrefix,z=T?r.pathname.replace(T,""):r.pathname,A=N?z.split("/").filter(Boolean).slice(-1)[0]||l()(N[0],{lower:!0}):"",q=x||C;return a.createElement(s.Z,{tabs:N,homepage:!1,theme:q,pageTitle:v,pageDescription:_,pageKeywords:E,titleType:w},a.createElement(u,{title:d?a.createElement(d,null):v,label:"label",tabs:N,theme:q}),N&&a.createElement(f,{title:v,slug:z,tabs:N,currentTab:A}),a.createElement(k.Z,{padded:!0},n,a.createElement(p,{relativePagePath:g}),a.createElement(y,{date:P})),a.createElement(h.Z,{pageContext:t,location:r,slug:z,tabs:N,currentTab:A}),a.createElement(i.Z,null))}},7553:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return i},default:function(){return c}});var a=n(3366),r=(n(7294),n(4983)),l=n(3624),o=["components"],i={},s={_frontmatter:i},d=l.Z;function c(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)(d,Object.assign({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Annotator for Clinical Data detects medical concepts within unstructured data. When you send unstructured data to the service to be analyzed and designate the desired annotators to employ, the service will route your unstructured data through the designated annotators and return the medical concepts detected within your unstructured data."),(0,r.kt)("p",null,"How it works:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Designate which annotators to employ in analyzing your unstructured data. This designation is defined as an annotator flow. See the Annotator Flows section below for more details."),(0,r.kt)("li",{parentName:"ol"},"Send your unstructured data along with the annotator flow to the service to extract the desired medical concepts.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example:")," analyze request referencing a persisted flow"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -X POST --header "Authorization: Bearer xxxxxxxxxxxxxxx" \\\n--header "Content-Type: text/plain" \\\n--header "Accept: application/json" \\\n--data-binary "Patient has lung cancer, but did not smoke. She may consider chemotherapy as part of a treatment plan." \\\n"<route_host>/v1/analyze/your_flow_id?version=2020-03-13"\n')),(0,r.kt)("p",null,"When referencing a persisted flow in an analyze request, you can send plain text to the service for analysis."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example:")," analyze request within flow included"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'curl -X POST --header "Authorization: Bearer xxxxxxxxxxxxxxx" \\\n  --header "Content-Type: application/json" \\\n  --header "Accept: application/json" -d "{\n  \\"annotatorFlows\\": [\n    {\n      \\"flow\\": {\n        \\"elements\\": [\n          {\n            \\"annotator\\": {\n              \\"name\\": \\"concept_detection\\"\n            }\n          },\n          {\n            \\"annotator\\": {\n              \\"name\\": \\"negation\\"\n             }\n          }\n        ],\n        \\"async\\": false\n      }\n    }\n  ],\n  \\"unstructured\\": [\n    {\n      \\"text\\": \\"Patient has lung cancer, but did not smoke. She may consider Cisplatin as part of a treatment plan.\\"\n    }\n  ]\n}" "<route_host>/v1/analyze?version=2020-03-13"\n')),(0,r.kt)("h2",null,"Annotator flows"),(0,r.kt)("p",null,"Annotator flows define which annotators to employ on a given request and the order in which request data flows through the annotators. An annotator flow along with the unstructured data to be analyzed are the two required inputs for the service. Flows can either be defined dynamically as part of the request or persisted via the ",(0,r.kt)("inlineCode",{parentName:"p"},"/flows")," APIs and referenced as a path parameter on an analyze request - e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"/analyze/{flow_id}"),"."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"/analyze/{flow_id}")," API supports text/plain requests wheres the ",(0,r.kt)("inlineCode",{parentName:"p"},"/analyze")," API where the flow is defined within the request requires you define both the flow and unstructured data to be analyzed in json format."),(0,r.kt)("p",null,"The following predefined flows are provided with the service:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Annotator Flow"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"wh_acd.ibm_clinical_insights_v1.0_standard_flow"),(0,r.kt)("td",{parentName:"tr",align:null},"Annotator for Clinical Data provides a ready-to-use Clinical Insights flow that extracts clinically relevant information by performing deep contextual analysis of clinical notes. The Clinical Insights flow is a default configuration provided with Annotator for Clinical Data that produces clinical attributes for Prescribed Medications, Diagnoses, Therapeutic Procedures, and Diagnostic Procedures by contextually evaluating each type of clinical information to determine that it is both relevant and pertinent to the patient. See the ",(0,r.kt)("a",{parentName:"td",href:"/acd-containers/clouddocs/clinical_insights_overview/"},"Clinical Insights")," documentation for a detailed explanation.",(0,r.kt)("br",null),(0,r.kt)("br",null),"As new versions of the Clinical Insights flow are released, older versions will be deprecated and eventually retired. This is known as the version lifecycle. Annotator for Clinical Data will support two versions of the Clinical Insights flows, the current latest version and the previous version. This is known as an “n-1” version support scheme. Once an older version is marked as “deprecated”, a 90 day period will begin before the deprecated version is officially “retired” and no longer functional. The deprecated version will remain operational for a 90 day period before it is considered retired. Once a version has been retired, it will no longer be available and any attempts to use a retired version will fail.")))),(0,r.kt)("p",null,"Table 1. Predefined annotator flows"),(0,r.kt)("h3",null,"Creating flows"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"/flows")," APIs are used to create and manage user-defined flows. Flows define both which annotators are to be employed in analyzed unstructured data as well as the order in which request data is routed through the annotator set. Request data is routed through the designated annotators serially. Many of the annotators are designed to act upon the output of other annotators - e.g. the concept detection annotator will pull in the section name of encompassing section annotations output by the section annotator. In order to take full advantage of this type of annotator cooperation, please follow the annotator ordering guidelines defined in the table below for the applicable annotators in your flow."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Order"),(0,r.kt)("th",{parentName:"tr",align:null},"Annotators"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"section")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("ul",null,(0,r.kt)("li",null,"concept_detection"),(0,r.kt)("li",null,"allergy"),(0,r.kt)("li",null,"bathing_assistance"),(0,r.kt)("li",null,"cancer"),(0,r.kt)("li",null,"dressing_assistance"),(0,r.kt)("li",null,"eating_assistance"),(0,r.kt)("li",null,"ejection_fraction"),(0,r.kt)("li",null,"lab_value"),(0,r.kt)("li",null,"medication"),(0,r.kt)("li",null,"named_entities"),(0,r.kt)("li",null,"procedure"),(0,r.kt)("li",null,"seeing_assistance"),(0,r.kt)("li",null,"smoking"),(0,r.kt)("li",null,"symptom_disease"),(0,r.kt)("li",null,"toileting_assistance"),(0,r.kt)("li",null,"walking_assistance")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"disambiguation")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"4"),(0,r.kt)("td",{parentName:"tr",align:null},"concept_value")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"5"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("ul",null,(0,r.kt)("li",null,"hypothetical"),(0,r.kt)("li",null,"negation")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"relation")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"7"),(0,r.kt)("td",{parentName:"tr",align:null},"model_broker")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"8"),(0,r.kt)("td",{parentName:"tr",align:null},"attribute_detection")))),(0,r.kt)("p",null,"Table 2. Recommended annotator flow ordering"),(0,r.kt)("h2",null,"Unstructured Data Input"),(0,r.kt)("p",null,"By default, the unstructured data input sent to the service is not returned in the response and the following characters are encoded in the response to protect against cross-site scripting attacks in the event the output is rendered within a browser. If you want the unstructured data input sent back in the response and you do not want the following characters encoded, include the following query parameter on the analyze request ",(0,r.kt)("inlineCode",{parentName:"p"},"return_analyzed_text=true"),"."),(0,r.kt)("h2",null,"Response"),(0,r.kt)("p",null,"A sample response is shown below when the default setting (i.e. return_analyzed_text=false) is used, i.e. when the encoding process is activated. Notice that the begin and the end field of the concepts are not affected by the character encoding.  Set return_analyzed_text=true to avoid the encoding results and to show the analyzed text in the response.  "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'{\n    "unstructured": [\n        {\n            "data": {\n                "conceptValues": [\n                    {\n                        "cui": "C0005893",\n                        "preferredName": "Body mass index procedure",\n                        "trigger": "greater than",\n                        "value": "40",\n                        "type": "ConceptValue",\n                        "begin": 1,\n                        "end": 9,\n                        "coveredText": "BMI &gt; 40"\n                    }\n               ]\n            }\n        }\n    ]\n}\n')))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-usage-analyze-text-md-87e00909b5c19ec59b15.js.map