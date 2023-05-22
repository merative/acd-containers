"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[5210],{3624:function(e,t,a){a.d(t,{Z:function(){return E}});var n=a(7294),o=a(8650),r=a.n(o),l=a(1597),s=a(3383),i=a(2157),c=a(5900),u=a.n(c),d=function(e){var t,a=e.title,o=e.theme,r=e.tabs,l=void 0===r?[]:r;return n.createElement("div",{className:u()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=l.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===o,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},m=function(e){var t=e.relativePagePath,a=e.repository,o=(0,l.useStaticQuery)("1364590287").site.siteMetadata.repository,r=a||o,s=r.baseUrl,i=r.subDirectory,c=s+"/edit/"+r.branch+i+"/src/pages"+t;return s?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:c},"Edit this page on GitHub"))):null},p=a(4703),h=a(1721),g=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,o=e.slug,s=o.split("/").filter(Boolean).slice(-1)[0],i=a.map((function(e){var t,a=r()(e,{lower:!0,strict:!0}),i=a===s,c=new RegExp(s+"/?(#.*)?$"),d=o.replace(c,a);return n.createElement("li",{key:e,className:u()((t={},t["PageTabs-module--selected-item--aBB0K"]=i,t),"PageTabs-module--list-item--024o6")},n.createElement(l.Link,{className:"PageTabs-module--link--Kz-7R",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},i))))))},t}(n.Component),f=g,b=a(7296),y=a(5387),v=a(3732),w=function(e){var t=e.date,a=new Date(t);return t?n.createElement(v.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(v.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},E=function(e){var t=e.pageContext,a=e.children,o=e.location,c=e.Title,u=t.frontmatter,h=void 0===u?{}:u,g=t.relativePagePath,v=t.titleType,E=h.tabs,k=h.title,C=h.theme,P=h.description,x=h.keywords,N=h.date,D=(0,y.Z)().interiorTheme,T=(0,l.useStaticQuery)("2456312558").site.pathPrefix,A=T?o.pathname.replace(T,""):o.pathname,U=E?A.split("/").filter(Boolean).slice(-1)[0]||r()(E[0],{lower:!0}):"",z=C||D;return n.createElement(i.Z,{tabs:E,homepage:!1,theme:z,pageTitle:k,pageDescription:P,pageKeywords:x,titleType:v},n.createElement(d,{title:c?n.createElement(c,null):k,label:"label",tabs:E,theme:z}),E&&n.createElement(f,{title:k,slug:A,tabs:E,currentTab:U}),n.createElement(b.Z,{padded:!0},a,n.createElement(m,{relativePagePath:g}),n.createElement(w,{date:N})),n.createElement(p.Z,{pageContext:t,location:o,slug:A,tabs:E,currentTab:U}),n.createElement(s.Z,null))}},682:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return s},default:function(){return u}});var n=a(3366),o=(a(7294),a(4983)),r=a(3624),l=["components"],s={},i={_frontmatter:s},c=r.Z;function u(e){var t=e.components,a=(0,n.Z)(e,l);return(0,o.kt)(c,Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",null,"Planning for performance and capacity of Annotator for Clinical Data"),(0,o.kt)("p",null,"Response time for ",(0,o.kt)("em",{parentName:"p"},"analyze")," calls to Annotator for Clinical Data depends on the document size and the flow used as well as the content and the systems that ACD is deployed on, so it is recommended to test with your data and configuration.  For planning purposes, the provided ",(0,o.kt)("a",{parentName:"p",href:"../../clouddocs/clinical_insights_overview/"},"clinical insights")," flow processes a typical 2K document (about 1 page of clinical text) in about 2 seconds so this can be used as a high-level approximation."),(0,o.kt)("h3",null,"Scaling"),(0,o.kt)("p",null,"ACD scales both vertically and horizontally in terms of the number of concurrent documents it can process at one time.  The maximum concurrent documents at a time can be used to plan for peak demand needs.   The concurrent documents and response time averaged together can then be used to calculate a maximum throughput."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Vertical scaling refers to a single ACD replica which can scale up to the number of virtual CPUs on the system with a limit of 16."),(0,o.kt)("li",{parentName:"ul"},"Horizontal scaling refers to adding more replicas to the ACD instance.")),(0,o.kt)("p",null,"For production environments, it is recommended to use 3 replicas to have triple-active HA (and across 3 zones when used in a multi-zone region in a cloud environment).  With triple-active architectures, you can plan for 2 replicas to be available and each replica to handle 50% of your steady-state workload to allow for a zone or replica to be down during updates. For development environments, a 2-replica or even single-replica instance may be used depending on your availability and scaling needs."),(0,o.kt)("p",null,"For example, if running a production environment with 3 replicas on 16 vCPU systems, the ACD instance would have top capacity of 48 (3x16) concurrent documents and you can plan on 32 (2x16) even during zone outages or system updates.   To scale up, add more replicas to the instance (and ensure you have the required worker capacity in the cluster).  Note that a single replica can handle up to a maximum of 16 concurrent documents if the CPU capacity of the system is 16 or higher.   Note also that ACD replicas are set up to not get scheduled on the same system by default, so the worker pool count should be at least as big as the replica count.   For each ACD replica you should allocate at least 64GB of memory.   In addition, you need to have room for the base cluster pods and workloads and spare capacity available during system updates.  In general, ACD runs best on systems that are 16vCPU x 64GB or 8vCPU x 32GB (using 2 of these per ACD replica). The smaller systems allow for less disruptive updates with a little more overhead and memory/cpu fragmentation and less CPU available.  Additional systems can be used if CPU becomes a bottleneck.  To configure or adjust the replica count on an ACD instance, see the ",(0,o.kt)("a",{parentName:"p",href:"../../management/scaling/"},"Scaling ACD")," section under management."),(0,o.kt)("p",null,"As you plan capacity, consider the number of vCPU licenses purchased for Annotator for Clinical Data.   You should purchase enough licenses to match the maximum capacity of concurrent documents the system is configured to handle (number of replicas times worker system CPU capacity by default).  If you want to lower the licenses needed you can lower the replica count and/or use machines with lower number of CPUs on them. "))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-planning-perf-and-capacity-md-1855da7d375d6dc4ec75.js.map