"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[6794],{3624:function(e,t,a){a.d(t,{Z:function(){return y}});var n=a(7294),r=a(8650),i=a.n(r),s=a(1597),l=a(3383),o=a(2618),m=a(5900),c=a.n(m),p=function(e){var t,a=e.title,r=e.theme,i=e.tabs,s=void 0===i?[]:i;return n.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=s.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},d=function(e){var t=e.relativePagePath,a=e.repository,r=(0,s.useStaticQuery)("1364590287").site.siteMetadata.repository,i=a||r,l=i.baseUrl,o=i.subDirectory,m=l+"/edit/"+i.branch+o+"/src/pages"+t;return l?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:m},"Edit this page on GitHub"))):null},u=a(4703),h=a(1721),k=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,l=r.split("/").filter(Boolean).slice(-1)[0],o=a.map((function(e){var t,a=i()(e,{lower:!0,strict:!0}),o=a===l,m=new RegExp(l+"/?(#.*)?$"),p=r.replace(m,a);return n.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=o,t),"PageTabs-module--list-item--024o6")},n.createElement(s.Link,{className:"PageTabs-module--link--Kz-7R",to:""+p},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},o))))))},t}(n.Component),N=k,g=a(7296),b=a(5387),f=a(3732),E=function(e){var t=e.date,a=new Date(t);return t?n.createElement(f.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(f.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},y=function(e){var t=e.pageContext,a=e.children,r=e.location,m=e.Title,c=t.frontmatter,h=void 0===c?{}:c,k=t.relativePagePath,f=t.titleType,y=h.tabs,T=h.title,v=h.theme,w=h.description,x=h.keywords,P=h.date,C=(0,b.Z)().interiorTheme,D=(0,s.useStaticQuery)("2456312558").site.pathPrefix,S=D?r.pathname.replace(D,""):r.pathname,Z=y?S.split("/").filter(Boolean).slice(-1)[0]||i()(y[0],{lower:!0}):"",F=v||C;return n.createElement(o.Z,{tabs:y,homepage:!1,theme:F,pageTitle:T,pageDescription:w,pageKeywords:x,titleType:f},n.createElement(p,{title:m?n.createElement(m,null):T,label:"label",tabs:y,theme:F}),y&&n.createElement(N,{title:T,slug:S,tabs:y,currentTab:Z}),n.createElement(g.Z,{padded:!0},a,n.createElement(d,{relativePagePath:k}),n.createElement(E,{date:P})),n.createElement(u.Z,{pageContext:t,location:r,slug:S,tabs:y,currentTab:Z}),n.createElement(l.Z,null))}},5707:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return l},default:function(){return c}});var n=a(3366),r=(a(7294),a(4983)),i=a(3624),s=["components"],l={},o={_frontmatter:l},m=i.Z;function c(e){var t=e.components,a=(0,n.Z)(e,s);return(0,r.kt)(m,Object.assign({},o,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",null,"Troubleshooting Uninstall"),(0,r.kt)("h3",null,"Removing a Terminating Namespace"),(0,r.kt)("p",null,"Occasionally some of the custom resources managed by an operator may remain in “Terminating” status waiting on a finalizer to complete. The resources remain in the “Terminating” state even after you have performed all the uninstall steps, or you are not able to uninstall from the web console because the uninstall option is greyed out."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Check that the namespace is stuck in Terminating state upon deletion."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get namespace <namespace>\n")),(0,r.kt)("p",{parentName:"li"},"Output:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"NAME               STATUS        AGE\nmy-acd-namespace   Terminating   46m\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Check for the ",(0,r.kt)("inlineCode",{parentName:"p"},"NamespaceFinalizersRemaining")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"NamespaceContentRemaining")," messages in the ",(0,r.kt)("inlineCode",{parentName:"p"},"STATUS")," section of the command output and perform the next step for each of the listed resources."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get namespace <namespace> -o yaml\n")),(0,r.kt)("p",{parentName:"li"},"Output:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'status:\n  conditions:\n  - lastTransitionTime: "2021-06-23T18:20:03Z"\n    message: All resources successfully discovered\n    reason: ResourcesDiscovered\n    status: "False"\n    type: NamespaceDeletionDiscoveryFailure\n  - lastTransitionTime: "2021-06-23T18:20:03Z"\n    message: All legacy kube types successfully parsed\n    reason: ParsedGroupVersions\n    status: "False"\n    type: NamespaceDeletionGroupVersionParsingFailure\n  - lastTransitionTime: "2021-06-23T18:20:21Z"\n    message: All content successfully deleted, may be waiting on finalization\n    reason: ContentDeleted\n    status: "False"\n    type: NamespaceDeletionContentFailure\n  - lastTransitionTime: "2021-06-23T18:20:03Z"\n    message: \'Some resources are remaining: acds.wh-acd.ibm.com has 1 resource instances\'\n    reason: SomeResourcesRemain\n    status: "True"\n    type: NamespaceContentRemaining\n  - lastTransitionTime: "2021-06-23T18:20:03Z"\n    message: \'Some content in the namespace has finalizers remaining: helm.sdk.operatorframework.io/uninstall-release in 1 resource instances\'\n    reason: SomeFinalizersRemain\n    status: "True"\n    type: NamespaceFinalizersRemaining\n  phase: Terminating\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Delete all the remaining resources listed in the previous step."),(0,r.kt)("p",{parentName:"li"},"For each of the resources to be deleted, do the following:"),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Get the object kind of the resource which needs to be removed. See the message in the above output."),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"message: Some resources are remaining: acds.wh-acd.ibm.com has 1 resource instances")),(0,r.kt)("p",{parentName:"li"},"Here ",(0,r.kt)("inlineCode",{parentName:"p"},"acds.wh-acd.ibm.com")," is the object kind.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Get the Object name corresponding to the object kind."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get  <object-kind> -n  <namespace>\n")),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get acds.wh-acd.ibm.com -n my-acd-namespace\n")),(0,r.kt)("p",{parentName:"li"},"Example output:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"NAME                           AGE\nacd-instances                  26h\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Patch the resources."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'oc patch -n <namespace> <object-kind>/<object-name> --type=merge -p \'{"metadata": {"finalizers":null}}\'\n')),(0,r.kt)("p",{parentName:"li"},"Example:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'oc patch -n my-acd-namespace \\\nacds.wh-acd.ibm.com/acd-instance \\\n--type=merge -p \'{"metadata": {"finalizers":null}}\'\n')),(0,r.kt)("p",{parentName:"li"},"Output:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"acd.wh-acd.ibm.com/acd-instance patched\n"))))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Verify that the namespace is deleted."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get namespace <namespace>\n")),(0,r.kt)("p",{parentName:"li"},"Output:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'Error from server (NotFound): namespaces "my-acd-namespace" not found\n')))),(0,r.kt)("p",null,"Use these troubleshooting steps with caution. Read more about the ",(0,r.kt)("a",{parentName:"p",href:"https://www.openshift.com/blog/the-hidden-dangers-of-terminating-namespaces"},"hidden dangers of terminating namespaces")," and troubleshooting similar issues when ",(0,r.kt)("a",{parentName:"p",href:"https://access.redhat.com/solutions/4165791"},"unable to delete a resource"),"."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-troubleshooting-troubleshooting-uninstall-md-b0c063fba4b76df5b47a.js.map