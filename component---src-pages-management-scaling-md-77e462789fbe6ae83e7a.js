"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[347],{3624:function(e,t,a){a.d(t,{Z:function(){return w}});var n=a(7294),r=a(8650),l=a.n(r),o=a(1597),i=a(3383),s=a(2618),c=a(5900),m=a.n(c),d=function(e){var t,a=e.title,r=e.theme,l=e.tabs,o=void 0===l?[]:l;return n.createElement("div",{className:m()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=o.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,r=(0,o.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||r,i=l.baseUrl,s=l.subDirectory,c=i+"/edit/"+l.branch+s+"/src/pages"+t;return i?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:c},"Edit this page on GitHub"))):null},p=a(4703),h=a(1721),f=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,i=r.split("/").filter(Boolean).slice(-1)[0],s=a.map((function(e){var t,a=l()(e,{lower:!0,strict:!0}),s=a===i,c=new RegExp(i+"/?(#.*)?$"),d=r.replace(c,a);return n.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--aBB0K"]=s,t),"PageTabs-module--list-item--024o6")},n.createElement(o.Link,{className:"PageTabs-module--link--Kz-7R",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},s))))))},t}(n.Component),b=f,g=a(7296),E=a(5387),y=a(3732),v=function(e){var t=e.date,a=new Date(t);return t?n.createElement(y.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(y.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},w=function(e){var t=e.pageContext,a=e.children,r=e.location,c=e.Title,m=t.frontmatter,h=void 0===m?{}:m,f=t.relativePagePath,y=t.titleType,w=h.tabs,k=h.title,x=h.theme,N=h.description,C=h.keywords,P=h.date,D=(0,E.Z)().interiorTheme,T=(0,o.useStaticQuery)("2456312558").site.pathPrefix,A=T?r.pathname.replace(T,""):r.pathname,Z=w?A.split("/").filter(Boolean).slice(-1)[0]||l()(w[0],{lower:!0}):"",B=x||D;return n.createElement(s.Z,{tabs:w,homepage:!1,theme:B,pageTitle:k,pageDescription:N,pageKeywords:C,titleType:y},n.createElement(d,{title:c?n.createElement(c,null):k,label:"label",tabs:w,theme:B}),w&&n.createElement(b,{title:k,slug:A,tabs:w,currentTab:Z}),n.createElement(g.Z,{padded:!0},a,n.createElement(u,{relativePagePath:f}),n.createElement(v,{date:P})),n.createElement(p.Z,{pageContext:t,location:r,slug:A,tabs:w,currentTab:Z}),n.createElement(i.Z,null))}},2961:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return i},default:function(){return m}});var n=a(3366),r=(a(7294),a(4983)),l=a(3624),o=["components"],i={},s={_frontmatter:i},c=l.Z;function m(e){var t=e.components,a=(0,n.Z)(e,o);return(0,r.kt)(c,Object.assign({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The replica count in the ACD deployment determines the number of replicas for each of the ACD deployments, which determines the peak concurrent capacity of the ACD deployment.  If the capacity is exceeded, the system will start to queue up requests to protect the container processes from overload.  If the queues fill up, the system will return errors to the caller indicating the system is not available.  To adjust the workload capacity, ACD deployment instances can be horizontally scaled by adjusting the replica count in the custom resource definition of the instance.\nIn the namespace of the ACD instance under Installed Operators in the console find the ACD operator.  In the ACD operator details, select the Annotator for Clinical Data tab to show the ACD instance and click the name of the ",(0,r.kt)("inlineCode",{parentName:"p"},"acd-instance")," to bring up the Details view of the ACD instance. On the Replicas field, adjust the number up or down as needed."),(0,r.kt)("p",null,"Note: Ensure you have enough capacity on the worker nodes in the cluster to support the number of replicas chosen.  Each replica consumes approximately 64 GB of memory across all of the deployment pods and there needs to be room for non-disruptive rolling updates."))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-management-scaling-md-77e462789fbe6ae83e7a.js.map