"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[1918],{3624:function(e,t,a){a.d(t,{Z:function(){return w}});var n=a(7294),r=a(8650),o=a.n(r),i=a(1597),s=a(3383),l=a(2157),c=a(5900),u=a.n(c),d=function(e){var t,a=e.title,r=e.theme,o=e.tabs,i=void 0===o?[]:o;return n.createElement("div",{className:u()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=i.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},m=function(e){var t=e.relativePagePath,a=e.repository,r=(0,i.useStaticQuery)("1364590287").site.siteMetadata.repository,o=a||r,s=o.baseUrl,l=o.subDirectory,c=s+"/edit/"+o.branch+l+"/src/pages"+t;return s?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:c},"Edit this page on GitHub"))):null},h=a(4703),g=a(1721),p=function(e){function t(){return e.apply(this,arguments)||this}return(0,g.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,s=r.split("/").filter(Boolean).slice(-1)[0],l=a.map((function(e){var t,a=o()(e,{lower:!0,strict:!0}),l=a===s,c=new RegExp(s+"/?(#.*)?$"),d=r.replace(c,a);return n.createElement("li",{key:e,className:u()((t={},t["PageTabs-module--selected-item--aBB0K"]=l,t),"PageTabs-module--list-item--024o6")},n.createElement(i.Link,{className:"PageTabs-module--link--Kz-7R",to:""+d},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},l))))))},t}(n.Component),f=p,b=a(7296),k=a(5387),y=a(3732),v=function(e){var t=e.date,a=new Date(t);return t?n.createElement(y.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(y.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},w=function(e){var t=e.pageContext,a=e.children,r=e.location,c=e.Title,u=t.frontmatter,g=void 0===u?{}:u,p=t.relativePagePath,y=t.titleType,w=g.tabs,C=g.title,E=g.theme,N=g.description,P=g.keywords,T=g.date,x=(0,k.Z)().interiorTheme,D=(0,i.useStaticQuery)("2456312558").site.pathPrefix,A=D?r.pathname.replace(D,""):r.pathname,_=w?A.split("/").filter(Boolean).slice(-1)[0]||o()(w[0],{lower:!0}):"",q=E||x;return n.createElement(l.Z,{tabs:w,homepage:!1,theme:q,pageTitle:C,pageDescription:N,pageKeywords:P,titleType:y},n.createElement(d,{title:c?n.createElement(c,null):C,label:"label",tabs:w,theme:q}),w&&n.createElement(f,{title:C,slug:A,tabs:w,currentTab:_}),n.createElement(b.Z,{padded:!0},a,n.createElement(m,{relativePagePath:p}),n.createElement(v,{date:T})),n.createElement(h.Z,{pageContext:t,location:r,slug:A,tabs:w,currentTab:_}),n.createElement(s.Z,null))}},1343:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return s},default:function(){return u}});var n=a(3366),r=(a(7294),a(4983)),o=a(3624),i=["components"],s={},l={_frontmatter:s},c=o.Z;function u(e){var t=e.components,a=(0,n.Z)(e,i);return(0,r.kt)(c,Object.assign({},l,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Timeouts can occur during analyze calls if the documents you send to ACD take too long to process.  This can be due to the size of the document or the configuration of the cartridge and its artifacts with the content of the document or a combination of both.  In addition, there are various components in the path which can be configured to adjust their timeouts.  "),(0,r.kt)("h2",null,"OpenShift Route timeouts"),(0,r.kt)("p",null,"OpenShift uses Routes for ingress access to the ACD or any proxy authentication service you are exposing in front of ACD. The default timeout for this is 30 seconds.  You can adjust this by adding the ",(0,r.kt)("em",{parentName:"p"},"haproxy.router.openshift.io/timeout")," annotation to the route you are using.  There are other annotations recommended on routes to help balance the traffic across route instances - see the\n",(0,r.kt)("a",{parentName:"p",href:"/acd-containers/security/manage-access/"},"Manage Access")," page for details."),(0,r.kt)("h2",null,"Load balancer timeouts"),(0,r.kt)("p",null,"Ingress controllers on OpenShift are tied to load balancers that expose the routes outside the cluster network.  These are configured in the ingress controller or in the cloud specific load balancer settings.  On AWS OCP, if the ingress controller is of type Internal you can set the timeout on the Classic load balancer associated with the domain name in the AWS Console on its Attributes settings.  In OCP 4.11 and later this can be configured in the ingress controller yaml itself - see ",(0,r.kt)("a",{parentName:"p",href:"https://docs.openshift.com/container-platform/4.11/networking/configuring_ingress_cluster_traffic/configuring-ingress-cluster-traffic-aws.html"},"OpenShift documentation")," for details. "),(0,r.kt)("h2",null,"ACD timeouts"),(0,r.kt)("p",null,"The default timeout between ACD and its microservices is 60 seconds.  If an annotator in the flow takes longer than this, ACD will return a 504 Gateway Timeout error back to the caller.  This timeout can be adjusted by adding this environment variable to the merative-acd-acd deployment "),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"env variable"),(0,r.kt)("th",{parentName:"tr",align:null},"description"),(0,r.kt)("th",{parentName:"tr",align:null},"default (if not set)"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"clinical_data_annotator_acd_api_request_timeout_read"),(0,r.kt)("td",{parentName:"tr",align:null},"timeout in milliseconds for any microservice call from acd"),(0,r.kt)("td",{parentName:"tr",align:null},"60000")))),(0,r.kt)("h2",null,"Reduction of document size"),(0,r.kt)("p",null,"One way to reduce timeouts on the client side is to break the document into smaller chunks to send to ACD.  This is pretty straightforward but care should be taken to try to break the document on a page or sentence boundary so the syntactical and lexical parsing is maintained.  Sometimes there are natural breaks in large documents or headers that can be scanned for to assist with this."),(0,r.kt)("h2",null,"Reducing the wait time in service queues"),(0,r.kt)("p",null,"In order to protect the system from overrunning system resources such as memory and CPU, each ACD service has a configured limit of how many concurrent requests it will handle and a configured queue size where it buffers overflow requests.  If any ACD service is experiencing persistent high queue lengths it will slow down processing.  To see if documents are queueing up in ACD or any of its microservices, look at the metric ",(0,r.kt)("em",{parentName:"p"},"clinical_data_annotator_api_queued_time_seconds"),"  (see ",(0,r.kt)("a",{parentName:"p",href:"/acd-containers/troubleshooting/logging-monitoring/#enabling-and-configuring-acd-prometheus-metrics"},"Enabling and Configuring ACD prometheus metrics")," for metric enablement) or search the logs for the message “Concurrent event”. To remedy this, add more ACD replicas to your ACD instance (which generally requires more nodes to run on), or reduce the number of documents sent to the ACD instance at once."),(0,r.kt)("h2",null,"Run on larger VMs"),(0,r.kt)("p",null,"The node size on which you choose to put the ACD pods determines how many virtual CPU cores are avaiable. You can reduce the time it takes for ACD to process documents by running on larger nodes with more CPUs.  If you are  using 8 vCPU nodes, consider moving to 16 vCPU nodes and seeing if that helps reduce analyze call times to ACD."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-troubleshooting-troubleshooting-timeouts-md-b4d2f04a179ac7a36dbd.js.map