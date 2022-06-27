(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{"/E/3":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return d}));var n=a("wx14"),r=a("zLVn"),o=(a("q1tI"),a("7ljp")),i=a("013z"),l=(a("qKvR"),{}),c={_frontmatter:l},s=i.a;function d(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)(s,Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",null,"Cartridge Deployment Timeout"),Object(o.b)("p",null,"Some large cartridge deployments can exceed the request timeout thresholds. In that event, you may receive the following error response:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-javascript"},'{\n  "httpCode":"500",\n  "httpMessage":"Internal Server Error",\n  "moreInformation":"Failed to establish a backside connection"\n}\n')),Object(o.b)("p",null,"This timeout occurs outside of Annotator for Clinical Data and does not prevent your cartridge from being successfully deployed. You just won’t get the itemized response confirming successful deployment of each individual artifact within your cartridge. If your cartridge deployment request times out, here are steps you can take to verify successful deployment after giving the process about 15 minutes to complete."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"For initial deployment of a cartridge, you can look for the creation of the default annotator flow to determine whether deployment has completed. The default annotator flow is the last artifact created during the deployment process and its existence signals completion of deployment in the initial deployment of a cartridge.")),Object(o.b)("p",null,"Sample request to retrieve flows for verifying completion of initial cartridge deployment:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-Curl"},'  curl -X GET --header "Authorization: Bearer xxxxxxxxxxxxxxx" \\\n  --header "Accept: application/json" \\\n  "<route_host>/v1/flows?version=2017-10-13"\n')),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"For updates to a previously deployed cartridge and to verify successful deployment of a cartridge in general upon a deployment request timeout, run some sample text through the ",Object(o.b)("em",{parentName:"li"},"POST /v1/analyze")," API and verify that the response adheres to the configurations defined within your cartridge.")))}d.isMDXComponent=!0},"013z":function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),o=a("NmYn"),i=a.n(o),l=a("Wbzz"),c=a("Xrax"),s=a("k4MR"),d=a("TSYQ"),b=a.n(d),u=a("QH2O"),m=a.n(u),p=a("qKvR"),x=function(e){var t,a=e.title,n=e.theme,r=e.tabs,o=void 0===r?[]:r;return Object(p.b)("div",{className:b()(m.a.pageHeader,(t={},t[m.a.withTabs]=o.length,t[m.a.darkMode]="dark"===n,t))},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12"},Object(p.b)("h1",{id:"page-title",className:m.a.text},a)))))},g=a("BAC9"),f=function(e){var t=e.relativePagePath,a=e.repository,n=Object(l.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||n,o=r.baseUrl,i=r.subDirectory,c=o+"/edit/"+r.branch+i+"/src/pages"+t;return o?Object(p.b)("div",{className:"bx--row "+g.row},Object(p.b)("div",{className:"bx--col"},Object(p.b)("a",{className:g.link,href:c},"Edit this page on GitHub"))):null},h=a("FCXl"),j=a("dI71"),O=a("I8xM"),y=function(e){function t(){return e.apply(this,arguments)||this}return Object(j.a)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,n=e.slug,r=n.split("/").filter(Boolean).slice(-1)[0],o=a.map((function(e){var t,a=i()(e,{lower:!0,strict:!0}),o=a===r,c=new RegExp(r+"/?(#.*)?$"),s=n.replace(c,a);return Object(p.b)("li",{key:e,className:b()((t={},t[O.selectedItem]=o,t),O.listItem)},Object(p.b)(l.Link,{className:O.link,to:""+s},e))}));return Object(p.b)("div",{className:O.tabsContainer},Object(p.b)("div",{className:"bx--grid"},Object(p.b)("div",{className:"bx--row"},Object(p.b)("div",{className:"bx--col-lg-12 bx--col-no-gutter"},Object(p.b)("nav",{"aria-label":t},Object(p.b)("ul",{className:O.list},o))))))},t}(r.a.Component),v=a("MjG9"),T=a("CzIb"),w=a("Asxa"),N=a("OIbQ"),k=a.n(N),P=function(e){var t=e.date,a=new Date(t);return t?Object(p.b)(w.c,{className:k.a.row},Object(p.b)(w.a,null,Object(p.b)("div",{className:k.a.text},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null};t.a=function(e){var t=e.pageContext,a=e.children,n=e.location,r=e.Title,o=t.frontmatter,d=void 0===o?{}:o,b=t.relativePagePath,u=t.titleType,m=d.tabs,g=d.title,j=d.theme,O=d.description,w=d.keywords,N=d.date,k=Object(T.a)().interiorTheme,I=Object(l.useStaticQuery)("2456312558").site.pathPrefix,E=I?n.pathname.replace(I,""):n.pathname,C=m?E.split("/").filter(Boolean).slice(-1)[0]||i()(m[0],{lower:!0}):"",z=j||k;return Object(p.b)(s.a,{tabs:m,homepage:!1,theme:z,pageTitle:g,pageDescription:O,pageKeywords:w,titleType:u},Object(p.b)(x,{title:r?Object(p.b)(r,null):g,label:"label",tabs:m,theme:z}),m&&Object(p.b)(y,{title:g,slug:E,tabs:m,currentTab:C}),Object(p.b)(v.a,{padded:!0},a,Object(p.b)(f,{relativePagePath:b}),Object(p.b)(P,{date:N})),Object(p.b)(h.a,{pageContext:t,location:n,slug:E,tabs:m,currentTab:C}),Object(p.b)(c.a,null))}},BAC9:function(e,t,a){e.exports={bxTextTruncateEnd:"EditLink-module--bx--text-truncate--end--2pqje",bxTextTruncateFront:"EditLink-module--bx--text-truncate--front--3_lIE",link:"EditLink-module--link--1qzW3",row:"EditLink-module--row--1B9Gk"}},I8xM:function(e,t,a){e.exports={bxTextTruncateEnd:"PageTabs-module--bx--text-truncate--end--267NA",bxTextTruncateFront:"PageTabs-module--bx--text-truncate--front--3xEQF",tabsContainer:"PageTabs-module--tabs-container--8N4k0",list:"PageTabs-module--list--3eFQc",listItem:"PageTabs-module--list-item--nUmtD",link:"PageTabs-module--link--1mDJ1",selectedItem:"PageTabs-module--selected-item--YPVr3"}},OIbQ:function(e,t,a){e.exports={bxTextTruncateEnd:"last-modified-date-module--bx--text-truncate--end--123zi",bxTextTruncateFront:"last-modified-date-module--bx--text-truncate--front--3xeKz",text:"last-modified-date-module--text--24m-4",row:"last-modified-date-module--row--2BquN"}},QH2O:function(e,t,a){e.exports={bxTextTruncateEnd:"PageHeader-module--bx--text-truncate--end--mZWeX",bxTextTruncateFront:"PageHeader-module--bx--text-truncate--front--3zvrI",pageHeader:"PageHeader-module--page-header--3hIan",darkMode:"PageHeader-module--dark-mode--hBrwL",withTabs:"PageHeader-module--with-tabs--3nKxA",text:"PageHeader-module--text--o9LFq"}}}]);
//# sourceMappingURL=component---src-pages-troubleshooting-troubleshooting-cartridge-deploy-md-d8b18bcc4fd69b812ff5.js.map