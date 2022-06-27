(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"013z":function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),i=a("NmYn"),o=a.n(i),l=a("Wbzz"),c=a("Xrax"),b=a("k4MR"),s=a("TSYQ"),d=a.n(s),p=a("QH2O"),m=a.n(p),u=a("qKvR"),h=function(e){var t,a=e.title,n=e.theme,r=e.tabs,i=void 0===r?[]:r;return Object(u.b)("div",{className:d()(m.a.pageHeader,(t={},t[m.a.withTabs]=i.length,t[m.a.darkMode]="dark"===n,t))},Object(u.b)("div",{className:"bx--grid"},Object(u.b)("div",{className:"bx--row"},Object(u.b)("div",{className:"bx--col-lg-12"},Object(u.b)("h1",{id:"page-title",className:m.a.text},a)))))},f=a("BAC9"),O=function(e){var t=e.relativePagePath,a=e.repository,n=Object(l.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||n,i=r.baseUrl,o=r.subDirectory,c=i+"/edit/"+r.branch+o+"/src/pages"+t;return i?Object(u.b)("div",{className:"bx--row "+f.row},Object(u.b)("div",{className:"bx--col"},Object(u.b)("a",{className:f.link,href:c},"Edit this page on GitHub"))):null},j=a("FCXl"),N=a("dI71"),g=a("I8xM"),y=function(e){function t(){return e.apply(this,arguments)||this}return Object(N.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,r=n.split("/").filter(Boolean).slice(-1)[0],i=a.map((function(e){var t,a=o()(e,{lower:!0,strict:!0}),i=a===r,c=new RegExp(r+"/?(#.*)?$"),b=n.replace(c,a);return Object(u.b)("li",{key:e,className:d()((t={},t[g.selectedItem]=i,t),g.listItem)},Object(u.b)(l.Link,{className:g.link,to:""+b},e))}));return Object(u.b)("div",{className:g.tabsContainer},Object(u.b)("div",{className:"bx--grid"},Object(u.b)("div",{className:"bx--row"},Object(u.b)("div",{className:"bx--col-lg-12 bx--col-no-gutter"},Object(u.b)("nav",{"aria-label":t},Object(u.b)("ul",{className:g.list},i))))))},t}(r.a.Component),v=a("MjG9"),x=a("CzIb"),C=a("Asxa"),T=a("OIbQ"),w=a.n(T),I=function(e){var t=e.date,a=new Date(t);return t?Object(u.b)(C.c,{className:w.a.row},Object(u.b)(C.a,null,Object(u.b)("div",{className:w.a.text},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};t.a=function(e){var t=e.pageContext,a=e.children,n=e.location,r=e.Title,i=t.frontmatter,s=void 0===i?{}:i,d=t.relativePagePath,p=t.titleType,m=s.tabs,f=s.title,N=s.theme,g=s.description,C=s.keywords,T=s.date,w=Object(x.a)().interiorTheme,M=Object(l.useStaticQuery)("2456312558").site.pathPrefix,S=M?n.pathname.replace(M,""):n.pathname,L=m?S.split("/").filter(Boolean).slice(-1)[0]||o()(m[0],{lower:!0}):"",D=N||w;return Object(u.b)(b.a,{tabs:m,homepage:!1,theme:D,pageTitle:f,pageDescription:g,pageKeywords:C,titleType:p},Object(u.b)(h,{title:r?Object(u.b)(r,null):f,label:"label",tabs:m,theme:D}),m&&Object(u.b)(y,{title:f,slug:S,tabs:m,currentTab:L}),Object(u.b)(v.a,{padded:!0},a,Object(u.b)(O,{relativePagePath:d}),Object(u.b)(I,{date:T})),Object(u.b)(j.a,{pageContext:t,location:n,slug:S,tabs:m,currentTab:L}),Object(u.b)(c.a,null))}},BAC9:function(e,t,a){e.exports={bxTextTruncateEnd:"EditLink-module--bx--text-truncate--end--2pqje",bxTextTruncateFront:"EditLink-module--bx--text-truncate--front--3_lIE",link:"EditLink-module--link--1qzW3",row:"EditLink-module--row--1B9Gk"}},I8xM:function(e,t,a){e.exports={bxTextTruncateEnd:"PageTabs-module--bx--text-truncate--end--267NA",bxTextTruncateFront:"PageTabs-module--bx--text-truncate--front--3xEQF",tabsContainer:"PageTabs-module--tabs-container--8N4k0",list:"PageTabs-module--list--3eFQc",listItem:"PageTabs-module--list-item--nUmtD",link:"PageTabs-module--link--1mDJ1",selectedItem:"PageTabs-module--selected-item--YPVr3"}},KUlr:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return s}));var n=a("wx14"),r=a("zLVn"),i=(a("q1tI"),a("7ljp")),o=a("013z"),l=(a("qKvR"),{}),c={_frontmatter:l},b=o.a;function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)(b,Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The concept detection service detects medical concepts from unstructured data. The service provides concepts based on the Unified Medical Language System (UMLS). As of the 2018AA version of the UMLS library, the consumers can elect to have a set of ",Object(i.b)("a",{parentName:"p",href:"/acd-containers/clouddocs/medical_codes/"},"medical codes")," associated with the UMLS concepts by specifying the optional configuration parameter to return the medical codes. When medical codes are requested, the UMLS concept annotations from concept detection will include the applicable medical codes as metadata within the annotations."),Object(i.b)("h2",null,"Expanded Concepts"),Object(i.b)("p",null,"Concept detection provides an ",Object(i.b)("em",{parentName:"p"},"expanded")," option that allows you to go beyond exact matching of surface forms in a dictionary. With ",Object(i.b)("strong",{parentName:"p"},"expanded")," set to ",Object(i.b)("inlineCode",{parentName:"p"},"true"),", concept detection will learn from the dictionary entries you have specified and generalize to other ways that concepts can be expressed in text. This allows you to define a core set of surface forms without exhaustively listing every surface form for every concept. This becomes particularly important with compound ideas. Consider the following text:"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"The patient broke his leg and hip when he fell outside his home.")),Object(i.b)("p",null,"There are two different injuries expressed in this text that we want to capture - broken leg and broken hip.  Neither one will have a dictionary entry that covers the way the concept is expressed. In this example, concept detection would return the following concepts with ",Object(i.b)("strong",{parentName:"p"},"expanded")," set ",Object(i.b)("inlineCode",{parentName:"p"},"true"),"."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{\n    "cui": "C0159852",\n    "preferredName": "Fracture of tibia and fibula",\n    "semanticType": "inpo",\n    "source": "umls-expanded",\n    "sourceVersion": "2018AA",\n    "type": "umls.InjuryOrPoisoning",\n    "begin": 12,\n    "end": 25,\n    "coveredText": "broke his leg",\n    "icd10Code": "S82.90X?",\n    "snomedConceptId": "414293001",\n    "vocabs": "MTH,CHV,CCS,ICD9CM,SNOMEDCT_US,ICPC"\n}\n\n...\n\n{\n    "cui": "C0019557",\n    "preferredName": "Hip Fractures",\n    "semanticType": "inpo",\n    "source": "umls-expanded",\n    "sourceVersion": "2018AA",\n    "type": "umls.InjuryOrPoisoning",\n    "begin": 12,\n    "end": 33,\n    "coveredText": "broke his leg and hip",\n    "loincId": "MTHU020794",\n    "icd10Code": "S72.009?",\n    "nciCode": "C26794,C35153",\n    "snomedConceptId": "5913000,263225007",\n    "meshId": "M0010366",\n    "vocabs": "MTH,CHV,LNC,CSP,MSH,NCI,AOD,NCI_CTCAE,NDFRT,COSTAR,SNOMEDCT_US,DXP"\n}\n')),Object(i.b)("p",null,"Expanded detection will look for diseases, conditions, abnormalities, injuries, and procedures defined in the UMLS dictionary that ships with IBM Clinical Data Annotator.\nIn addition, expanded detection will look for all of the concepts defined in custom dictionaries that are enabled for expanded detection in the cartridge configuration."),Object(i.b)("h3",null,"Configurations"),Object(i.b)("p",null,"The following table lists parameters of the concept_detection service."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:"left"},"Configuration"),Object(i.b)("th",{parentName:"tr",align:null},"Values"),Object(i.b)("th",{parentName:"tr",align:null},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"Libraries"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("ul",null,Object(i.b)("li",null,"umls.latest"),Object(i.b)("li",null,"umls.2021AA"),Object(i.b)("li",null,"umls.2020AA"),Object(i.b)("li",null,"umls.2019AA ",Object(i.b)("i",null,"(deprecated - will be removed in 2022)")))),Object(i.b)("td",{parentName:"tr",align:null},"Defines the version of the UMLS library that is used when analyzing unstructured data.*")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"inference_rules"),Object(i.b)("td",{parentName:"tr",align:null}),Object(i.b)("td",{parentName:"tr",align:null},"The name of a derived concept rule set that will be used for deriving additional concepts based on the concepts discovered by the libraries specified.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"filters"),Object(i.b)("td",{parentName:"tr",align:null}),Object(i.b)("td",{parentName:"tr",align:null},"The name of a concept filter that is used to remove unwanted concepts.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"expanded"),Object(i.b)("td",{parentName:"tr",align:null},"true/false"),Object(i.b)("td",{parentName:"tr",align:null},"When true, the concept detection annotator will attempt to expand concept coverage beyond the surface forms explicitly listed in the specified library.  For example - if ",Object(i.b)("q",null,"broken collarbone")," is a surface from for C0159658 (Fracture of clavicle), the expanded option would match textual representations of that concept like ",Object(i.b)("q",null,"broke my collarbone"),".  This option is ",Object(i.b)("i",null,"false")," by default.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"include_optional_fields"),Object(i.b)("td",{parentName:"tr",align:null},"medical_codes / source_vocabularies"),Object(i.b)("td",{parentName:"tr",align:null},"Optional fields that should also be returned for each concept. If not specified, only the libary’s default fields will be returned.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"longest_span"),Object(i.b)("td",{parentName:"tr",align:null},"true/false"),Object(i.b)("td",{parentName:"tr",align:null},"When true ",Object(i.b)("i",null,"(default)"),", only the concept with the longest text span will be returned if there are multiple concepts overlapping the same span of text.")))),Object(i.b)("p",null,"*The value ",Object(i.b)("inlineCode",{parentName:"p"},"umls.latest")," will reference the latest available version of UMLS within the service. As newer versions of UMLS are made available in the service, ",Object(i.b)("inlineCode",{parentName:"p"},"umls.latest")," library configurations will automatically leverage the latest available version of UMLS in the service once available. Declaration of a specific version of UMLS is recommended to avoid undesirable changes in output as newer versions of UMLS are made available within the service. Through declaration of a specific version of UMLS, newer versions of UMLS may be evaluated prior to use in production."),Object(i.b)("h4",null,"Annotation Types"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Concept")),Object(i.b)("h4",null,"Concept"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:"left"},"Fields"),Object(i.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"cui"),Object(i.b)("td",{parentName:"tr",align:"left"},"Concept Unique ID (CUI). CUIs are used to uniquely identify concepts.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"preferredName"),Object(i.b)("td",{parentName:"tr",align:"left"},"Normalized name for the concept.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"semanticType"),Object(i.b)("td",{parentName:"tr",align:"left"},"Shorthand version of the UMLS semantic type.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"source"),Object(i.b)("td",{parentName:"tr",align:"left"},"The library source used for the detection of the concepts.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"sourceVersion"),Object(i.b)("td",{parentName:"tr",align:"left"},"he version of the library source used for the detection of the concepts.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"type"),Object(i.b)("td",{parentName:"tr",align:"left"},"The semantic type associated with the concept.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"begin"),Object(i.b)("td",{parentName:"tr",align:"left"},"The start position of the annotation as a character offset into the text. The smallest possible start position is 0.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"end"),Object(i.b)("td",{parentName:"tr",align:"left"},"The end position of the annotation as character offset into the text. The end position points at the first character after the annotation, such that end-begin equals the length of the coveredText.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"coveredText"),Object(i.b)("td",{parentName:"tr",align:"left"},"The text covered by an annotation as a string.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"cptCode"),Object(i.b)("td",{parentName:"tr",align:"left"},"This code represents the type of procedure that is performed. CPT stands for Current Procedural Terminology. This code a standard terminology used by different members of medical society such as physicians, financial administrators, coders, and other organizations. This value is only available when a CPT Codes file is referenced in the profile.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"sourceVocabularies"),Object(i.b)("td",{parentName:"tr",align:"left"},"This provides the list of UMLS source vocabularies that contained the concept. This is provided when the ",Object(i.b)("strong",{parentName:"td"},"include_optional_fields")," parameter is specified with a value of ",Object(i.b)("inlineCode",{parentName:"td"},"source_vocabularies"),".")))),Object(i.b)("p",null,"The following optional response fields are provided when the ",Object(i.b)("strong",{parentName:"p"},"include_optional_fields")," parameter is specified with a value of ",Object(i.b)("inlineCode",{parentName:"p"},"medical_codes"),"."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:"left"},"Fields"),Object(i.b)("th",{parentName:"tr",align:"left"},"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"loincId"),Object(i.b)("td",{parentName:"tr",align:"left"},"LOINC stands for Logical Observations Identifiers, Names, Codes.  The value for this feature comes from UMLS.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"NCI Code"),Object(i.b)("td",{parentName:"tr",align:"left"},"The ",Object(i.b)("a",{parentName:"td",href:"https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NCI/"},"NCI Thesaurus")," covers vocabulary for cancer-related clinical care, translational and basic research, and public information and administrative activities.  The value for this feature comes from UMLS.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"snomedConceptId"),Object(i.b)("td",{parentName:"tr",align:"left"},"Numerical code provided by the SNOMED dictionaries that represents the cancer.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"MeSHId"),Object(i.b)("td",{parentName:"tr",align:"left"},"The ",Object(i.b)("a",{parentName:"td",href:"https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/MSH/"},"MeSH thesaurus")," is a controlled vocabulary used for indexing, cataloging, and searching for biomedical and health-related information and documents.  The value for this feature comes from UMLS.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"icd9Code"),Object(i.b)("td",{parentName:"tr",align:"left"},"ICD stands for International Classification of Diseases.  The number 9 is a revision number for this code set.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"icd10Code"),Object(i.b)("td",{parentName:"tr",align:"left"},"ICD stands for International Classification of Diseases.  The number 10 is a revision number for this code set.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"left"},"rxNormID"),Object(i.b)("td",{parentName:"tr",align:"left"},"Also called the RXCUI which is a normalized id that is defined in the RxNorm standard and commonly used amongst different organizations.")))),Object(i.b)("h3",null,"Sample Response"),Object(i.b)("p",null,"Sample response from the concept detection annotator for the text: ",Object(i.b)("inlineCode",{parentName:"p"},"She is taking Metformin for her type 2 diabetes.")),Object(i.b)("p",null,"This example provides the optional medical codes and source vocabularies."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-javascript"},'{\n  "unstructured": [\n    {\n      "text": "She is taking Metformin for her type 2 diabetes.",\n      "data": {\n        "concepts": [\n          {\n            "cui": "C0025598",\n            "preferredName": "Metformin",\n            "semanticType": "phsu",\n            "source": "umls",\n            "sourceVersion": "2018AA",\n            "type": "umls.PharmacologicSubstance",\n            "begin": 14,\n            "end": 23,\n            "coveredText": "Metformin",\n            "rxNormId": "6809",\n            "loincId": "LP33332-5,MTHU016062",\n            "nciCode": "C61612",\n            "snomedConceptId": "372567009,109081006",\n            "meshId": "M0013535",\n            "vocabs": "LNC,CSP,MSH,RXNORM,MTHSPL,NCI_NCI-GLOSS,CHV,ATC,NCI_FDA,NCI,LCH_NW,USPMG,NDFRT,SNOMEDCT_US,DRUGBANK,VANDF"\n          },\n          {\n            "cui": "C0011860",\n            "preferredName": "Diabetes Mellitus, Non-Insulin-Dependent",\n            "semanticType": "dsyn",\n            "source": "umls",\n            "sourceVersion": "2018AA",\n            "type": "umls.DiseaseOrSyndrome",\n            "begin": 32,\n            "end": 47,\n            "coveredText": "type 2 diabetes",\n            "loincId": "LA10552-0",\n            "icd10Code": "E11.9",\n            "nciCode": "C26747",\n            "snomedConceptId": "44054006",\n            "meshId": "M0006155",\n            "vocabs": "MTH,NCI_NICHD,LNC,CSP,MSH,HPO,OMIM,COSTAR,CHV,MEDLINEPLUS,NCI,LCH_NW,NDFRT,SNOMEDCT_US,DXP"\n          }\n        ]\n      }\n    }\n  ]\n}\n')))}s.isMDXComponent=!0},OIbQ:function(e,t,a){e.exports={bxTextTruncateEnd:"last-modified-date-module--bx--text-truncate--end--123zi",bxTextTruncateFront:"last-modified-date-module--bx--text-truncate--front--3xeKz",text:"last-modified-date-module--text--24m-4",row:"last-modified-date-module--row--2BquN"}},QH2O:function(e,t,a){e.exports={bxTextTruncateEnd:"PageHeader-module--bx--text-truncate--end--mZWeX",bxTextTruncateFront:"PageHeader-module--bx--text-truncate--front--3zvrI",pageHeader:"PageHeader-module--page-header--3hIan",darkMode:"PageHeader-module--dark-mode--hBrwL",withTabs:"PageHeader-module--with-tabs--3nKxA",text:"PageHeader-module--text--o9LFq"}}}]);
//# sourceMappingURL=component---src-pages-clouddocs-annotator-concept-detection-md-f1e0a79134a4b3491c3e.js.map