"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[8862],{3624:function(e,t,a){a.d(t,{Z:function(){return C}});var n=a(7294),r=a(8650),l=a.n(r),i=a(1597),o=a(3383),s=a(2618),c=a(5900),m=a.n(c),d=function(e){var t,a=e.title,r=e.theme,l=e.tabs,i=void 0===l?[]:l;return n.createElement("div",{className:m()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=i.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},u=function(e){var t=e.relativePagePath,a=e.repository,r=(0,i.useStaticQuery)("1364590287").site.siteMetadata.repository,l=a||r,o=l.baseUrl,s=l.subDirectory,c=o+"/edit/"+l.branch+s+"/src/pages"+t;return o?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:c},"Edit this page on GitHub"))):null},p=a(4703),g=a(1721),h=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,o=r.split("/").filter(Boolean).slice(-1)[0],s=a.map((function(e){var t,a=l()(e,{lower:!0,strict:!0}),s=a===o,c=new RegExp(o+"/?(#.*)?$"),d=r.replace(c,a);return n.createElement("li",{key:e,className:m()((t={},t["PageTabs-module--selected-item--aBB0K"]=s,t),"PageTabs-module--list-item--024o6")},n.createElement(i.Link,{className:"PageTabs-module--link--Kz-7R",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},s))))))},t}(n.Component),f=h,k=a(7296),N=a(5387),b=a(3732),y=function(e){var t=e.date,a=new Date(t);return t?n.createElement(b.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(b.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},C=function(e){var t=e.pageContext,a=e.children,r=e.location,c=e.Title,m=t.frontmatter,g=void 0===m?{}:m,h=t.relativePagePath,b=t.titleType,C=g.tabs,v=g.title,E=g.theme,P=g.description,w=g.keywords,S=g.date,D=(0,N.Z)().interiorTheme,A=(0,i.useStaticQuery)("2456312558").site.pathPrefix,x=A?r.pathname.replace(A,""):r.pathname,O=C?x.split("/").filter(Boolean).slice(-1)[0]||l()(C[0],{lower:!0}):"",T=E||D;return n.createElement(s.Z,{tabs:C,homepage:!1,theme:T,pageTitle:v,pageDescription:P,pageKeywords:w,titleType:b},n.createElement(d,{title:c?n.createElement(c,null):v,label:"label",tabs:C,theme:T}),C&&n.createElement(f,{title:v,slug:x,tabs:C,currentTab:O}),n.createElement(k.Z,{padded:!0},a,n.createElement(u,{relativePagePath:h}),n.createElement(y,{date:S})),n.createElement(p.Z,{pageContext:t,location:r,slug:x,tabs:C,currentTab:O}),n.createElement(o.Z,null))}},6177:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return m}});var n=a(3366),r=(a(7294),a(4983)),l=a(3624),i=["components"],o={},s={_frontmatter:o},c=l.Z;function m(e){var t=e.components,a=(0,n.Z)(e,i);return(0,r.kt)(c,Object.assign({},s,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Annotator for Clinical Data (ACD) Container Edition has the following prerequisites:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Red Hat OpenShift Container Platform (OCP) 4.7 or later",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Commencing with OpenShift Container Platform 4.8, Red Hat will denote all even numbered minor releases (e.g. 4.8, 4.10, 4.12) as Extended Update Support (EUS) releases. ACD will support the EUS releases. For more lifecycle policy information please see the ",(0,r.kt)("a",{parentName:"li",href:"https://www.ibm.com/support/pages/ibm-continuous-delivery-support-lifecycle-policy"},"IBM Continuous Delivery Support Lifecycle Policy")," (IBM CD), and the ",(0,r.kt)("a",{parentName:"li",href:"https://access.redhat.com/support/policy/updates/openshift"},"Red Hat OpenShift Container Platform Life Cycle Policy"),"."),(0,r.kt)("li",{parentName:"ul"},"NOTE: ACD has been tested on and supports OCP on AWS and ROSA."))),(0,r.kt)("li",{parentName:"ul"},"Share storage for ACD configuration storage - This can be:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"A persistent volume claim against a ",(0,r.kt)("a",{parentName:"li",href:"https://docs.openshift.com/container-platform/4.6/storage/understanding-persistent-storage.html#pv-access-modes_understanding-persistent-storage"},"ReadWriteMany shared file system"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"This is most often used with on-premise, cloud-based clusters based on VMWare or OpenStack with an NFS file system. If using a shared file system ensure it supports\npersistent volume claims of ReadWriteMany (RWX) access mode across all zones and nodes of the cluster."))),(0,r.kt)("li",{parentName:"ul"},"An object bucket",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"On IBM Cloud - IBM Cloud Object Storage (COS) with a Regional bucket in the same cloud region as the cluster using Standard Storage Class"),(0,r.kt)("li",{parentName:"ul"},"On AWS - S3 Bucket in the same region"))))),(0,r.kt)("li",{parentName:"ul"},"Command line tools",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.openshift.com/container-platform"},"oc")," - OpenShift CLI for interacting with the cluster"))),(0,r.kt)("li",{parentName:"ul"},"Login credentials and other cluster connection details from your cluster administrator"),(0,r.kt)("li",{parentName:"ul"},"A ",(0,r.kt)("a",{parentName:"li",href:"/acd-containers/installing/installing/#create-a-project-(namespace)"},"dedicated OpenShift project (namespace)")," per ACD deployment"),(0,r.kt)("li",{parentName:"ul"},"Purchased ACD registry credentials for pulling images from the ACD registry"),(0,r.kt)("li",{parentName:"ul"},"A secret for accessing a storage bucket, if ",(0,r.kt)("a",{parentName:"li",href:"/acd-containers/planning/storage/"},"planning to use an object storage bucket"))),(0,r.kt)("p",null,"Obtain the connection details for your OpenShift Container Platform cluster from your administrator. For additional planning and installation details, see:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/acd-containers/planning/namespace"},"Plan for your installation"),", such as preparing for persistent storage, considering security options, and planning for performance and capacity."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/acd-containers/installing/installing/#overview"},"Install ACD"),", such as creating a namespace, creating secrets, ",(0,r.kt)("a",{parentName:"li",href:"/acd-containers/installing/installing/#add-the-acd-operator-to-the-catalog"},"installing the catalog"),", ",(0,r.kt)("a",{parentName:"li",href:"/acd-containers/installing/installing/#install-the-acd-operator"},"installing the operator"),", and ",(0,r.kt)("a",{parentName:"li",href:"/acd-containers/installing/installing/#install-the-acd-service"},"installing the ACD service"),".",(0,r.kt)("br",null))),(0,r.kt)("h2",null,"Resources required"),(0,r.kt)("p",null,"By default, an ACD installation requires the following minimum resources:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Component"),(0,r.kt)("th",{parentName:"tr",align:null},"Number of worker nodes"),(0,r.kt)("th",{parentName:"tr",align:null},"CPU/node"),(0,r.kt)("th",{parentName:"tr",align:null},"Memory/node (G)"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ACD"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"8 min (16 recommended )"),(0,r.kt)("td",{parentName:"tr",align:null},"64")))),(0,r.kt)("p",null,"For high availability, run 3 replicas of the ACD service on a minimum of 3 worker nodes that have 16 CPU/node and 64 GB of memory. For a development or test environment, 1 or 2 replicas can be configured and 8 CPU/node may be used.  "),(0,r.kt)("p",null,"By default, the ACD pods may use all of the CPUs on a node. If needed, you can limit the ACD deployment CPU usage (see ",(0,r.kt)("a",{parentName:"p",href:"../../management/configuring"},"Configuration"),")."),(0,r.kt)("p",null,"These are the requirements for ACD. The cluster itself has additional requirements for master, infrastructure and possible additional worker node for monitoring, logging and other components or applications being run. Please see the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.openshift.com/container-platform/4.7/scalability_and_performance/recommended-host-practices.html"},"OpenShift recommended host practices")," for guidance on adding infrastructure nodes and moving resources to those nodes."))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-installing-prereqs-md-9283981e06bb5586c78f.js.map