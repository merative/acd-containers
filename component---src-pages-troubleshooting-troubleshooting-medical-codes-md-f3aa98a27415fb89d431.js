(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{"013z":function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),o=a("NmYn"),i=a.n(o),c=a("Wbzz"),b=a("Xrax"),l=a("k4MR"),s=a("TSYQ"),d=a.n(s),u=a("QH2O"),m=a.n(u),p=a("qKvR"),x=function(e){var t,a=e.title,n=e.theme,r=e.tabs,o=void 0===r?[]:r;return Object(p.b)("div",{className:d()(m.a.pageHeader,(t={},t[m.a.withTabs]=o.length,t[m.a.darkMode]="dark"===n,t))},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12"},Object(p.b)("h1",{id:"page-title",className:m.a.text},a)))))},g=a("BAC9"),O=function(e){var t=e.relativePagePath,a=e.repository,n=Object(c.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||n,o=r.baseUrl,i=r.subDirectory,b=o+"/edit/"+r.branch+i+"/src/pages"+t;return o?Object(p.b)("div",{className:"bx--row "+g.row},Object(p.b)("div",{className:"bx--col"},Object(p.b)("a",{className:g.link,href:b},"Edit this page on GitHub"))):null},f=a("FCXl"),j=a("dI71"),h=a("I8xM"),T=function(e){function t(){return e.apply(this,arguments)||this}return Object(j.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,r=n.split("/").filter(Boolean).slice(-1)[0],o=a.map((function(e){var t,a=i()(e,{lower:!0,strict:!0}),o=a===r,b=new RegExp(r+"/?(#.*)?$"),l=n.replace(b,a);return Object(p.b)("li",{key:e,className:d()((t={},t[h.selectedItem]=o,t),h.listItem)},Object(p.b)(c.Link,{className:h.link,to:""+l},e))}));return Object(p.b)("div",{className:h.tabsContainer},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12 bx--col-no-gutter"},Object(p.b)("nav",{"aria-label":t},Object(p.b)("ul",{className:h.list},o))))))},t}(r.a.Component),v=a("MjG9"),w=a("CzIb"),N=a("Asxa"),k=a("OIbQ"),P=a.n(k),y=function(e){var t=e.date,a=new Date(t);return t?Object(p.b)(N.c,{className:P.a.row},Object(p.b)(N.a,null,Object(p.b)("div",{className:P.a.text},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};t.a=function(e){var t=e.pageContext,a=e.children,n=e.location,r=e.Title,o=t.frontmatter,s=void 0===o?{}:o,d=t.relativePagePath,u=t.titleType,m=s.tabs,g=s.title,j=s.theme,h=s.description,N=s.keywords,k=s.date,P=Object(w.a)().interiorTheme,I=Object(c.useStaticQuery)("2456312558").site.pathPrefix,M=I?n.pathname.replace(I,""):n.pathname,E=m?M.split("/").filter(Boolean).slice(-1)[0]||i()(m[0],{lower:!0}):"",L=j||P;return Object(p.b)(l.a,{tabs:m,homepage:!1,theme:L,pageTitle:g,pageDescription:h,pageKeywords:N,titleType:u},Object(p.b)(x,{title:r?Object(p.b)(r,null):g,label:"label",tabs:m,theme:L}),m&&Object(p.b)(T,{title:g,slug:M,tabs:m,currentTab:E}),Object(p.b)(v.a,{padded:!0},a,Object(p.b)(O,{relativePagePath:d}),Object(p.b)(y,{date:k})),Object(p.b)(f.a,{pageContext:t,location:n,slug:M,tabs:m,currentTab:E}),Object(p.b)(b.a,null))}},BAC9:function(e,t,a){e.exports={bxTextTruncateEnd:"EditLink-module--bx--text-truncate--end--2pqje",bxTextTruncateFront:"EditLink-module--bx--text-truncate--front--3_lIE",link:"EditLink-module--link--1qzW3",row:"EditLink-module--row--1B9Gk"}},I8xM:function(e,t,a){e.exports={bxTextTruncateEnd:"PageTabs-module--bx--text-truncate--end--267NA",bxTextTruncateFront:"PageTabs-module--bx--text-truncate--front--3xEQF",tabsContainer:"PageTabs-module--tabs-container--8N4k0",list:"PageTabs-module--list--3eFQc",listItem:"PageTabs-module--list-item--nUmtD",link:"PageTabs-module--link--1mDJ1",selectedItem:"PageTabs-module--selected-item--YPVr3"}},OIbQ:function(e,t,a){e.exports={bxTextTruncateEnd:"last-modified-date-module--bx--text-truncate--end--123zi",bxTextTruncateFront:"last-modified-date-module--bx--text-truncate--front--3xeKz",text:"last-modified-date-module--text--24m-4",row:"last-modified-date-module--row--2BquN"}},QH2O:function(e,t,a){e.exports={bxTextTruncateEnd:"PageHeader-module--bx--text-truncate--end--mZWeX",bxTextTruncateFront:"PageHeader-module--bx--text-truncate--front--3zvrI",pageHeader:"PageHeader-module--page-header--3hIan",darkMode:"PageHeader-module--dark-mode--hBrwL",withTabs:"PageHeader-module--with-tabs--3nKxA",text:"PageHeader-module--text--o9LFq"}},Wbu4:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return c})),a.d(t,"default",(function(){return s}));var n=a("wx14"),r=a("zLVn"),o=(a("q1tI"),a("7ljp")),i=a("013z"),c=(a("qKvR"),{}),b={_frontmatter:c},l=i.a;function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)(l,Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",null,"Missing Medical Codes"),Object(o.b)("p",null,"Medical codes are supported as of the 2018AA version of the UMLS library. Ensure you are using the 2018AA or higher version of UMLS. For the ",Object(o.b)("a",{parentName:"p",href:"/acd-containers/clouddocs/annotator_concept_detection/"},"concept detection")," and ",Object(o.b)("a",{parentName:"p",href:"/acd-containers/clouddocs/annotator_attribute_detection/"},"attribute detection")," annotators, ensure you have specified the optional configuration parameter to return the medical codes in your flow definition."))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-troubleshooting-troubleshooting-medical-codes-md-f3aa98a27415fb89d431.js.map