"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[3926],{3624:function(e,t,a){a.d(t,{Z:function(){return E}});var n=a(7294),r=a(8650),o=a.n(r),c=a(1597),l=a(3383),i=a(2157),s=a(5900),d=a.n(s),p=function(e){var t,a=e.title,r=e.theme,o=e.tabs,c=void 0===o?[]:o;return n.createElement("div",{className:d()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=c.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},m=function(e){var t=e.relativePagePath,a=e.repository,r=(0,c.useStaticQuery)("1364590287").site.siteMetadata.repository,o=a||r,l=o.baseUrl,i=o.subDirectory,s=l+"/edit/"+o.branch+i+"/src/pages"+t;return l?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:s},"Edit this page on GitHub"))):null},u=a(4703),h=a(1721),b=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,l=r.split("/").filter(Boolean).slice(-1)[0],i=a.map((function(e){var t,a=o()(e,{lower:!0,strict:!0}),i=a===l,s=new RegExp(l+"/?(#.*)?$"),p=r.replace(s,a);return n.createElement("li",{key:e,className:d()((t={},t["PageTabs-module--selected-item--aBB0K"]=i,t),"PageTabs-module--list-item--024o6")},n.createElement(c.Link,{className:"PageTabs-module--link--Kz-7R",to:""+p},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},i))))))},t}(n.Component),g=b,k=a(7296),f=a(5387),N=a(3732),y=function(e){var t=e.date,a=new Date(t);return t?n.createElement(N.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(N.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},E=function(e){var t=e.pageContext,a=e.children,r=e.location,s=e.Title,d=t.frontmatter,h=void 0===d?{}:d,b=t.relativePagePath,N=t.titleType,E=h.tabs,v=h.title,w=h.theme,x=h.description,A=h.keywords,S=h.date,T=(0,f.Z)().interiorTheme,P=(0,c.useStaticQuery)("2456312558").site.pathPrefix,B=P?r.pathname.replace(P,""):r.pathname,D=E?B.split("/").filter(Boolean).slice(-1)[0]||o()(E[0],{lower:!0}):"",O=w||T;return n.createElement(i.Z,{tabs:E,homepage:!1,theme:O,pageTitle:v,pageDescription:x,pageKeywords:A,titleType:N},n.createElement(p,{title:s?n.createElement(s,null):v,label:"label",tabs:E,theme:O}),E&&n.createElement(g,{title:v,slug:B,tabs:E,currentTab:D}),n.createElement(k.Z,{padded:!0},a,n.createElement(m,{relativePagePath:b}),n.createElement(y,{date:S})),n.createElement(u.Z,{pageContext:t,location:r,slug:B,tabs:E,currentTab:D}),n.createElement(l.Z,null))}},35:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return l},default:function(){return d}});var n=a(3366),r=(a(7294),a(4983)),o=a(3624),c=["components"],l={},i={_frontmatter:l},s=o.Z;function d(e){var t=e.components,a=(0,n.Z)(e,c);return(0,r.kt)(s,Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The substance use tobacco model provides information about tobacco use that applies to the patient."),(0,r.kt)("span",{className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"1152px"}},"\n      ",(0,r.kt)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"39.583333333333336%",position:"relative",bottom:"0",left:"0",backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABnElEQVQoz2WS627aQBCF/RqpxM2wGNvBLhibuL5fEmxjaIEitSJvUFV9ikh566/abVO16o/R7s7ZOTPn7GplWVKVJUVZkuc59WNNmqZEUUQcx9j2PbZtM5vNmEwmjEYjdF1nOhPM9CFTp2by+Mq77IVB+ANttVohQxI8BAEbz2O73aoIw5D1eq1w13XxPE8187w1lmVhGgLDTRHpd/T4G9PtDU0WyIt1XfP06UiYZ6rYcRyWy6Xa+0GA7/tkWcblcqYoKzz/AdO0MITOXL/D0O+wjTHaxvdpu44kSfiQxERJohpIuZJsPB4riTKk5MFgoIhWnqdw0zQRcwNjYWLZ92hhlnI6nzkeDxz6PWWREwQ+p9OJqqoYDofM53OEEIjfq+NI+b5SIb1VmBCKXBHumh1JmvHU7CmqHVEU0/c9RVH8SyiEIpCP5LrvlSUSk7FYLFRei4qc6/UzTXugOX6hOX6l3X/k+XZTvv5POGUpJ9xs/+TeGqkJ4zTher1y6Hu6tmHftXRdy+VyUV5K3/4u+iXNUt9JTvWWk6s8/wRoDABE48ZxlgAAAABJRU5ErkJggg==')",backgroundSize:"cover",display:"block"}}),"\n  ",(0,r.kt)("picture",{parentName:"span"},"\n          ",(0,r.kt)("source",{parentName:"picture",srcSet:["/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/0eda2/tobacco.webp 288w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/460e2/tobacco.webp 576w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/e0ca3/tobacco.webp 1152w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/236e1/tobacco.webp 1552w"],sizes:"(max-width: 1152px) 100vw, 1152px",type:"image/webp"}),"\n          ",(0,r.kt)("source",{parentName:"picture",srcSet:["/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/7fc1e/tobacco.png 288w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/a5df1/tobacco.png 576w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/3cbba/tobacco.png 1152w","/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/7f043/tobacco.png 1552w"],sizes:"(max-width: 1152px) 100vw, 1152px",type:"image/png"}),"\n          ",(0,r.kt)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/acd-containers/static/2d4d31ece82220f0e6c53ee7f5ad224d/3cbba/tobacco.png",alt:"tobacco",title:"tobacco",loading:"lazy",decoding:"async",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",top:"0",left:"0"}}),"\n        "),"\n    "),(0,r.kt)("p",null,"The demo application above shows an example of how to use the scores from the substance use tobacco model to create attributes.  In this example, “quit smoking” has a high ",(0,r.kt)("em",{parentName:"p"},"use")," score and is promoted to a TobaccoUse attribute by the cartridge scoring rules. The example also has a high ",(0,r.kt)("em",{parentName:"p"},"current")," score which results in a value of ",(0,r.kt)("em",{parentName:"p"},"current")," for the TobaccoUse attribute."),(0,r.kt)("p",null,"The usage section of the JSON response indicates how the tobacco use applies to a patient."),(0,r.kt)("h2",null,"usage"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"useScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evidence that there has been tobacco use by the patient.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"noneScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evidence that there has been no tobacco use by the patient.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"discussedScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Other mentions of tobacco that do not directly apply to the patient (For example:  “No smoking or eating within 2 hours of the procedure.“)")))),(0,r.kt)("h2",null,"useStatus"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"currentScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evidence that the patient is an active tobacco user.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"stoppedScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evidence that the patient is a former tobacco user.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"neverScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Evidence that the patient has never used tobacco products.")))),(0,r.kt)("p",null,"Note that the status events only look at local context clues and do not try to reason across large distances in the text or multiple documents.  "),(0,r.kt)("h2",null,"Other tobacco features"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Feature"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"exposureScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The patient has been exposed to second-hand smoke.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"nonPatientScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The tobacco use does not apply to the patient. (For example: “Her grandfather was a heavy smoker.“)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"treatmentScore"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The patient is receiving treatment for their tobacco use.")))),(0,r.kt)("h3",null,"Sample Response"),(0,r.kt)("p",null,"Consider the following sample text."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"The patient is trying to quit smoking.")),(0,r.kt)("p",null,"The clinical insight features for “quit smoking” might look as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'"insightModelData": {\n  "tobacco": {\n    "usage": {\n      "useScore": 1,\n      "noneScore": 0,\n      "discussedScore": 0\n    },\n    "useStatus": {\n      "currentScore": 0.996,\n      "stoppedScore": 0.002,\n      "neverScore": 0\n    },\n    "exposureScore": 0,\n    "nonPatientScore": 0,\n    "treatmentScore": 0.003\n  }\n}\n')))}d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-clouddocs-substance-use-tobacco-md-d0da9048bb3bd3825188.js.map