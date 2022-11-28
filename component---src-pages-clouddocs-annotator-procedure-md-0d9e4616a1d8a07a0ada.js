"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[9689],{3624:function(e,t,a){a.d(t,{Z:function(){return y}});var n=a(7294),r=a(8650),l=a.n(r),i=a(1597),o=a(3383),s=a(2157),d=a(5900),c=a.n(d),m=function(e){var t,a=e.title,r=e.theme,l=e.tabs,i=void 0===l?[]:l;return n.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=i.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,r=(0,i.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||r,o=l.baseUrl,s=l.subDirectory,d=o+"/edit/"+l.branch+s+"/src/pages"+t;return o?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:d},"Edit this page on GitHub"))):null},p=a(4703),h=a(1721),f=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,o=r.split("/").filter(Boolean).slice(-1)[0],s=a.map((function(e){var t,a=l()(e,{lower:!0,strict:!0}),s=a===o,d=new RegExp(o+"/?(#.*)?$"),m=r.replace(d,a);return n.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=s,t),"PageTabs-module--list-item--024o6")},n.createElement(i.Link,{className:"PageTabs-module--link--Kz-7R",to:""+m},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},s))))))},t}(n.Component),g=f,k=a(7296),N=a(5387),b=a(3732),v=function(e){var t=e.date,a=new Date(t);return t?n.createElement(b.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(b.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},y=function(e){var t=e.pageContext,a=e.children,r=e.location,d=e.Title,c=t.frontmatter,h=void 0===c?{}:c,f=t.relativePagePath,b=t.titleType,y=h.tabs,T=h.title,x=h.theme,E=h.description,w=h.keywords,C=h.date,S=(0,N.Z)().interiorTheme,P=(0,i.useStaticQuery)("2456312558").site.pathPrefix,I=P?r.pathname.replace(P,""):r.pathname,M=y?I.split("/").filter(Boolean).slice(-1)[0]||l()(y[0],{lower:!0}):"",L=x||S;return n.createElement(s.Z,{tabs:y,homepage:!1,theme:L,pageTitle:T,pageDescription:E,pageKeywords:w,titleType:b},n.createElement(m,{title:d?n.createElement(d,null):T,label:"label",tabs:y,theme:L}),y&&n.createElement(g,{title:T,slug:I,tabs:y,currentTab:M}),n.createElement(k.Z,{padded:!0},a,n.createElement(u,{relativePagePath:f}),n.createElement(v,{date:C})),n.createElement(p.Z,{pageContext:t,location:r,slug:I,tabs:y,currentTab:M}),n.createElement(o.Z,null))}},1482:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return c}});var n=a(3366),r=(a(7294),a(4983)),l=a(3624),i=["components"],o={},s={_frontmatter:o},d=l.Z;function c(e){var t=e.components,a=(0,n.Z)(e,i);return(0,r.kt)(d,Object.assign({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The procedure annotator identifies different types of medical procedures such as surgery, biopsy, echocardiogram, ultrasound, MRI, and so forth."),(0,r.kt)("h2",null,"Configurations"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Configuration"),(0,r.kt)("th",{parentName:"tr",align:null},"Values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"Library"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("ul",null,(0,r.kt)("li",null,"umls.latest"),(0,r.kt)("li",null,"umls.2021AA"),(0,r.kt)("li",null,"umls.2020AA"),(0,r.kt)("li",null,"umls.2019AA ",(0,r.kt)("i",null,"(deprecated - will be removed in 2022)")))),(0,r.kt)("td",{parentName:"tr",align:null},"Defines the version of the UMLS library that is used when analyzing unstructured data.")))),(0,r.kt)("p",null,"The value ",(0,r.kt)("inlineCode",{parentName:"p"},"umls.latest")," will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, ",(0,r.kt)("inlineCode",{parentName:"p"},"umls.latest")," library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production."),(0,r.kt)("h3",null,"Annotation Types"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"aci.ProcedureInd")),(0,r.kt)("h3",null,"aci.ProcedureInd"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"begin"),(0,r.kt)("td",{parentName:"tr",align:null},"The start position of the annotation as a character offset into the text. The smallest possible start position is 0.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"end"),(0,r.kt)("td",{parentName:"tr",align:null},"The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"coveredText"),(0,r.kt)("td",{parentName:"tr",align:null},"The text covered by an annotation as a string.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"type"),(0,r.kt)("td",{parentName:"tr",align:null},"aci.ProcedureInd")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"date"),(0,r.kt)("td",{parentName:"tr",align:null},"Indicates the date that is related to the event.  For instance, in a patient’s medical form, this date may indicate the date of surgery, or the date of last diagnosis.  The value of date is detected from the date that is nearest to the text that is annotated.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"dateInMilliseconds"),(0,r.kt)("td",{parentName:"tr",align:null},"It is a java.util.Calendar date and is the difference, measured in milliseconds, between the date of the event and midnight, January 1, 1970 UTC.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"dateSource"),(0,r.kt)("td",{parentName:"tr",align:null},"Indicates where in the document or text the date value is identified. For example, ",(0,r.kt)("q",null,"sentence")," is one possible option for dateSource")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"snomedConceptId"),(0,r.kt)("td",{parentName:"tr",align:null},"Numerical code provided by the SNOMED dictionaries that represents the procedure.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"loincId"),(0,r.kt)("td",{parentName:"tr",align:null},"LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"nciCode"),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("a",{parentName:"td",href:"https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NCI/"},"NCI Thesaurus")," covers vocabulary for cancer-related clinical care, translational and basic research, and public information and administrative activities.  The value for this feature comes from UMLS.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"meshId"),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("a",{parentName:"td",href:"https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/MSH/"},"MeSH thesaurus")," is a controlled vocabulary used for indexing, cataloging, and searching for biomedical and health-related information and documents.  The value for this feature comes from UMLS.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"cptCode"),(0,r.kt)("td",{parentName:"tr",align:null},"This code represents the type of procedure that is performed. CPT stands for Current Procedural Terminology. This code a standard terminology used by different members of medical society such as physicians, financial administrators, coders, and other organizations.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"cui"),(0,r.kt)("td",{parentName:"tr",align:null},"UMLS Concept Unique ID (CUI). CUIs are used to uniquely identify concepts across different UMLS sources. Depending on the source of the procedure information, this value may not be available.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"procedureSurfaceForm"),(0,r.kt)("td",{parentName:"tr",align:null},"The covered text that refers to the procedure identified by the annotation. For example, in text ",(0,r.kt)("q",null,"He had a blood pressure test."),", the procedure is ",(0,r.kt)("q",null,"blood pressure"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"procedureNormalizedName"),(0,r.kt)("td",{parentName:"tr",align:null},"The normalized term for the procedure. For example, in text ",(0,r.kt)("q",null,"He had a blood pressure test."),", the procedure is ",(0,r.kt)("q",null,"blood pressure taking"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"sectionSurfaceForm"),(0,r.kt)("td",{parentName:"tr",align:null},"Medical documents have many sections such as patient’s information, previous medical history, family history, etc.  The covered text that identifies which section of the document that spans the annotation. The default value of this feature is ",(0,r.kt)("q",null,"document"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"sectionNormalizedName"),(0,r.kt)("td",{parentName:"tr",align:null},"The normalized term for the section.")))),(0,r.kt)("h3",null,"Sample Response"),(0,r.kt)("p",null,"Sample response from the Procedures annotator for the text: ",(0,r.kt)("inlineCode",{parentName:"p"},"She started chemotherapy April 8th.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n  "unstructured": [\n    {\n      "text": "She started chemotherapy April 8th.",\n      "data": {\n        "ProcedureInd": [\n          {\n            "type": "aci.ProcedureInd",\n            "begin": 12,\n            "end": 24,\n            "coveredText": "chemotherapy",\n            "date": "April 8th",\n            "loincId": "LA6172-6,MTHU010425",\n            "nciCode": "C15632",\n            "cui": "C3665472",\n            "dateSource": "sentence",\n            "dateInMilliseconds": "1649376000000",\n            "snomedConceptId": "363688001,367336001",\n            "procedureSurfaceForm": "chemotherapy",\n            "procedureNormalizedName": "chemotherapy"\n          }\n        ]\n      }\n    }\n  ]\n}\n')))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-clouddocs-annotator-procedure-md-0d9e4616a1d8a07a0ada.js.map