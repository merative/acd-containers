(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{"013z":function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),r=a("NmYn"),o=a.n(r),i=a("Wbzz"),b=a("Xrax"),c=a("k4MR"),s=a("TSYQ"),u=a.n(s),d=a("QH2O"),m=a.n(d),p=a("qKvR"),O=function(e){var t,a=e.title,n=e.theme,l=e.tabs,r=void 0===l?[]:l;return Object(p.b)("div",{className:u()(m.a.pageHeader,(t={},t[m.a.withTabs]=r.length,t[m.a.darkMode]="dark"===n,t))},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12"},Object(p.b)("h1",{id:"page-title",className:m.a.text},a)))))},h=a("BAC9"),j=function(e){var t=e.relativePagePath,a=e.repository,n=Object(i.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||n,r=l.baseUrl,o=l.subDirectory,b=r+"/edit/"+l.branch+o+"/src/pages"+t;return r?Object(p.b)("div",{className:"bx--row "+h.row},Object(p.b)("div",{className:"bx--col"},Object(p.b)("a",{className:h.link,href:b},"Edit this page on GitHub"))):null},f=a("FCXl"),v=a("dI71"),g=a("I8xM"),x=function(e){function t(){return e.apply(this,arguments)||this}return Object(v.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,l=n.split("/").filter(Boolean).slice(-1)[0],r=a.map((function(e){var t,a=o()(e,{lower:!0,strict:!0}),r=a===l,b=new RegExp(l+"/?(#.*)?$"),c=n.replace(b,a);return Object(p.b)("li",{key:e,className:u()((t={},t[g.selectedItem]=r,t),g.listItem)},Object(p.b)(i.Link,{className:g.link,to:""+c},e))}));return Object(p.b)("div",{className:g.tabsContainer},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12 bx--col-no-gutter"},Object(p.b)("nav",{"aria-label":t},Object(p.b)("ul",{className:g.list},r))))))},t}(l.a.Component),w=a("MjG9"),A=a("CzIb"),N=a("Asxa"),T=a("OIbQ"),y=a.n(T),k=function(e){var t=e.date,a=new Date(t);return t?Object(p.b)(N.c,{className:y.a.row},Object(p.b)(N.a,null,Object(p.b)("div",{className:y.a.text},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};t.a=function(e){var t=e.pageContext,a=e.children,n=e.location,l=e.Title,r=t.frontmatter,s=void 0===r?{}:r,u=t.relativePagePath,d=t.titleType,m=s.tabs,h=s.title,v=s.theme,g=s.description,N=s.keywords,T=s.date,y=Object(A.a)().interiorTheme,I=Object(i.useStaticQuery)("2456312558").site.pathPrefix,P=I?n.pathname.replace(I,""):n.pathname,M=m?P.split("/").filter(Boolean).slice(-1)[0]||o()(m[0],{lower:!0}):"",S=v||y;return Object(p.b)(c.a,{tabs:m,homepage:!1,theme:S,pageTitle:h,pageDescription:g,pageKeywords:N,titleType:d},Object(p.b)(O,{title:l?Object(p.b)(l,null):h,label:"label",tabs:m,theme:S}),m&&Object(p.b)(x,{title:h,slug:P,tabs:m,currentTab:M}),Object(p.b)(w.a,{padded:!0},a,Object(p.b)(j,{relativePagePath:u}),Object(p.b)(k,{date:T})),Object(p.b)(f.a,{pageContext:t,location:n,slug:P,tabs:m,currentTab:M}),Object(p.b)(b.a,null))}},BAC9:function(e,t,a){e.exports={bxTextTruncateEnd:"EditLink-module--bx--text-truncate--end--2pqje",bxTextTruncateFront:"EditLink-module--bx--text-truncate--front--3_lIE",link:"EditLink-module--link--1qzW3",row:"EditLink-module--row--1B9Gk"}},I8xM:function(e,t,a){e.exports={bxTextTruncateEnd:"PageTabs-module--bx--text-truncate--end--267NA",bxTextTruncateFront:"PageTabs-module--bx--text-truncate--front--3xEQF",tabsContainer:"PageTabs-module--tabs-container--8N4k0",list:"PageTabs-module--list--3eFQc",listItem:"PageTabs-module--list-item--nUmtD",link:"PageTabs-module--link--1mDJ1",selectedItem:"PageTabs-module--selected-item--YPVr3"}},OIbQ:function(e,t,a){e.exports={bxTextTruncateEnd:"last-modified-date-module--bx--text-truncate--end--123zi",bxTextTruncateFront:"last-modified-date-module--bx--text-truncate--front--3xeKz",text:"last-modified-date-module--text--24m-4",row:"last-modified-date-module--row--2BquN"}},QH2O:function(e,t,a){e.exports={bxTextTruncateEnd:"PageHeader-module--bx--text-truncate--end--mZWeX",bxTextTruncateFront:"PageHeader-module--bx--text-truncate--front--3zvrI",pageHeader:"PageHeader-module--page-header--3hIan",darkMode:"PageHeader-module--dark-mode--hBrwL",withTabs:"PageHeader-module--with-tabs--3nKxA",text:"PageHeader-module--text--o9LFq"}},krWR:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a("wx14"),l=a("zLVn"),r=(a("q1tI"),a("7ljp")),o=a("013z"),i=(a("qKvR"),{}),b={_frontmatter:i},c=o.a;function s(e){var t=e.components,a=Object(l.a)(e,["components"]);return Object(r.b)(c,Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The following sections document the new features and changes that were included for each release of the Annotator for Clinical Data service."),Object(r.b)("h2",null,"February 2022"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Improved medication adverse event model with associatedAdverseEvent modifier links.")),Object(r.b)("h2",null,"November 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Initial release of substance use models for clinical insights.")),Object(r.b)("h2",null,"October 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for UMLS 2021AA. UMLS 2018AA has been removed and 2019AA is now deprecated (will be removed in 2022 when we add support for UMLS 2022AA).")),Object(r.b)("h2",null,"August 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for disambiguation filters.")),Object(r.b)("h2",null,"June 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Annotator for Clinical Data Service container edition GA."),Object(r.b)("li",{parentName:"ul"},"Added relative date support to the temporal models.")),Object(r.b)("h2",null,"May 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for custom fields in concept dictionaries.")),Object(r.b)("h2",null,"March 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Allow custom dictionaries to be enabled for expanded concept detection.")),Object(r.b)("h2",null,"February 2021"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for vocabulary customization in the spell check service.")),Object(r.b)("h2",null,"November 2020"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Initial release of temporal models.")),Object(r.b)("h2",null,"August 2020"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Initial release of normality models for clinical insights.")),Object(r.b)("h2",null,"July 2020"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for UMLS 2020AA. UMLS 2017AA has been removed and 2018AA is now deprecated ",Object(r.b)("em",{parentName:"li"},"(will be removed in 2021 when we add support for UMLS 2021AA)."))),Object(r.b)("h2",null,"April 2020"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Initial release of clinical insight models for Diagnosis, Medication, and Procedure")),Object(r.b)("h2",null,"October 2019"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Asynchronous (non-blocking) cartridge deployment APIs with persisted deployment status.")),Object(r.b)("h2",null,"September 2019"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added ability to apply spelling corrections from the spell check annotator for use by all service annotators.")),Object(r.b)("h2",null,"August 2019"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Added support for UMLS 2019AA. UMLS 2016AB has been truncated and UMLS 2017AA is now deprecated ",Object(r.b)("em",{parentName:"li"},"(will be removed in 2020 when we add support for UMLS 2020AA)."))),Object(r.b)("h2",null,"June 2019"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"When spelling corrections from the spell check annotator are present, the concept detection annotator will leverage those spelling corrections for entity detection."),Object(r.b)("li",{parentName:"ul"},"The IBM Watson Annotator for Clinical Data Service is now available in the IBM Cloud US South location for approved internal IBM solution providers."),Object(r.b)("li",{parentName:"ul"},"Support for attribute detection over derived concepts with longest span.")),Object(r.b)("h2",null,"Service API versioning"),Object(r.b)("p",null,"API requests require a version parameter that takes the date in the format version=YYYY-MM-DD. Send the version parameter with every API request."),Object(r.b)("p",null,"When we change the API in a backwards-incompatible way, we release a new minor version. To take advantage of the changes in a new version, change the value of the version parameter to the new date. If you’re not ready to update to that version, don’t change your version date."))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-clouddocs-release-notes-md-f0df12fb689eee9b02c1.js.map