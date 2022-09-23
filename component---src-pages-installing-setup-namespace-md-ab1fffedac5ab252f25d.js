"use strict";(self.webpackChunkacd_containers=self.webpackChunkacd_containers||[]).push([[1472],{3624:function(e,t,a){a.d(t,{Z:function(){return b}});var n=a(7294),r=a(8650),s=a.n(r),l=a(1597),o=a(3383),i=a(2618),m=a(5900),c=a.n(m),p=function(e){var t,a=e.title,r=e.theme,s=e.tabs,l=void 0===s?[]:s;return n.createElement("div",{className:c()("PageHeader-module--page-header--NqfPe",(t={},t["PageHeader-module--with-tabs--vbQ-W"]=l.length,t["PageHeader-module--dark-mode--WCeH8"]="dark"===r,t))},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12"},n.createElement("h1",{id:"page-title",className:"PageHeader-module--text--Er2EO"},a)))))},d=function(e){var t=e.relativePagePath,a=e.repository,r=(0,l.useStaticQuery)("1364590287").site.siteMetadata.repository,s=a||r,o=s.baseUrl,i=s.subDirectory,m=o+"/edit/"+s.branch+i+"/src/pages"+t;return o?n.createElement("div",{className:"bx--row EditLink-module--row--BEmSX"},n.createElement("div",{className:"bx--col"},n.createElement("a",{className:"EditLink-module--link--IDrl1",href:m},"Edit this page on GitHub"))):null},u=a(4703),h=a(1721),f=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.title,a=e.tabs,r=e.slug,o=r.split("/").filter(Boolean).slice(-1)[0],i=a.map((function(e){var t,a=s()(e,{lower:!0,strict:!0}),i=a===o,m=new RegExp(o+"/?(#.*)?$"),p=r.replace(m,a);return n.createElement("li",{key:e,className:c()((t={},t["PageTabs-module--selected-item--aBB0K"]=i,t),"PageTabs-module--list-item--024o6")},n.createElement(l.Link,{className:"PageTabs-module--link--Kz-7R",to:""+p},e))}));return n.createElement("div",{className:"PageTabs-module--tabs-container--Cdfzw"},n.createElement("div",{className:"bx--grid"},n.createElement("div",{className:"bx--row"},n.createElement("div",{className:"bx--col-lg-12 bx--col-no-gutter"},n.createElement("nav",{"aria-label":t},n.createElement("ul",{className:"PageTabs-module--list--xLqxG"},i))))))},t}(n.Component),g=f,k=a(7296),v=a(5387),y=a(3732),N=function(e){var t=e.date,a=new Date(t);return t?n.createElement(y.X2,{className:"last-modified-date-module--row--XJoYQ"},n.createElement(y.sg,null,n.createElement("div",{className:"last-modified-date-module--text--ogPQF"},"Page last updated: ",a.toLocaleDateString("en-GB",{day:"2-digit",year:"numeric",month:"long"})))):null},b=function(e){var t=e.pageContext,a=e.children,r=e.location,m=e.Title,c=t.frontmatter,h=void 0===c?{}:c,f=t.relativePagePath,y=t.titleType,b=h.tabs,C=h.title,w=h.theme,P=h.description,E=h.keywords,S=h.date,V=(0,v.Z)().interiorTheme,x=(0,l.useStaticQuery)("2456312558").site.pathPrefix,D=x?r.pathname.replace(x,""):r.pathname,T=b?D.split("/").filter(Boolean).slice(-1)[0]||s()(b[0],{lower:!0}):"",R=w||V;return n.createElement(i.Z,{tabs:b,homepage:!1,theme:R,pageTitle:C,pageDescription:P,pageKeywords:E,titleType:y},n.createElement(p,{title:m?n.createElement(m,null):C,label:"label",tabs:b,theme:R}),b&&n.createElement(g,{title:C,slug:D,tabs:b,currentTab:T}),n.createElement(k.Z,{padded:!0},a,n.createElement(d,{relativePagePath:f}),n.createElement(N,{date:S})),n.createElement(u.Z,{pageContext:t,location:r,slug:D,tabs:b,currentTab:T}),n.createElement(o.Z,null))}},2879:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return c}});var n=a(3366),r=(a(7294),a(4983)),s=a(3624),l=["components"],o={},i={_frontmatter:o},m=s.Z;function c(e){var t=e.components,a=(0,n.Z)(e,l);return(0,r.kt)(m,Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Each deployment of the ACD operator and its dependent resources need to be scoped to a project for proper isolation."),(0,r.kt)("h2",null,"Create a project (namespace)"),(0,r.kt)("p",null,"Create a namespace into which the ACD instance will be installed by creating a ",(0,r.kt)("a",{parentName:"p",href:"https://docs.openshift.com/container-platform/4.7/applications/projects/working-with-projects.html"},"project"),"."),(0,r.kt)("p",null,"When you create a project, a namespace with the same name is also created."),(0,r.kt)("p",null,"Ensure you use a namespace that is dedicated to a single instance of ACD."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Important"),": Do not use any of the default or system namespaces to install an instance of ACD (some examples of these are: default, kube-system, kube-public, and openshift-operators)."),(0,r.kt)("h2",null,"Setting up ACD Service optional dependencies"),(0,r.kt)("hr",null),(0,r.kt)("h3",null,"Setting up S3-based Configuration Storage"),(0,r.kt)("hr",null),(0,r.kt)("p",null,"If the deployment will use S3-based storage, the S3 credentials need to be inserted into the ACD operand namespace as secrets."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"echo '<cos_id>' | tr -d '\\n' > username\necho '<cos_secret>' | tr -d '\\n' > password\noc create secret generic ibm-wh-acd-as \\\n    --namespace <namespace> \\\n    --from-file=username \\\n    --from-file=password\n")),(0,r.kt)("hr",null),(0,r.kt)("h3",null,"Setting up File-based Storage Configuration Persistent Volume and Claim Setup"),(0,r.kt)("hr",null),(0,r.kt)("p",null,"If the deployment will use persistent file-based storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created."),(0,r.kt)("p",null,"If you are deploying more than one instance of ACD, each deployment is required to have its own PV and PVC within its own project.  "),(0,r.kt)("p",null,"We have tested two methods for providing a shared filesystem for storing ACD persistent data."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#create-ocs"},"Openshift Container Storage (OCS)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#create-nfs"},"NFS"))),(0,r.kt)("p",null,"Create the shared file system using the platform’s tools with encryption enabled. It is recommended to have a minimum of 10 gigabyte of free space within the file system for configuration storage. Access mode must be set to ReadWriteMany (RWX)."),(0,r.kt)("a",{name:"create-ocs"}),(0,r.kt)("h4",null,"Creating an OCS (cephfs) shared filesystem"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install OCS from the Operator Catalog.  This will install the cephfs storage class.  You must provide a block storage class for OCS to use.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"In the ACD namespace, manually create the ACD persistent volume claim from the example ibm-wh-acd-config-storage-cephfs-pvc.yaml file below.  The persistent volume will get dynamically created from the ",(0,r.kt)("inlineCode",{parentName:"p"},"ocs-storagecluster-cephfs")," storage class."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc create -n <your namespace> -f ibm-wh-acd-config-storage-cephfs-pvc.yaml\n")),(0,r.kt)("br",null),"Example PVC file ibm-wh-acd-config-storage-cephfs-pv.yaml",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:"ibm-wh-acd-config-storage-cephfs-pvc.yaml","ibm-wh-acd-config-storage-cephfs-pvc.yaml":!0},"apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: ibm-wh-acd-config-storage-cephfs-pvc\n  spec:\n    accessModes:\n    - ReadWriteMany\n    resources:\n      requests:\n        storage: 10Gi\n    storageClassName: ocs-storagecluster-cephfs\n    volumeMode: Filesystem\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Determine the name of the generated persistent volume that is bound to your PVC.  The PV name starts with ‘pvc-’"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc get pvc -n <acd namespace>\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Patch the generated persistent volume to change the ",(0,r.kt)("inlineCode",{parentName:"p"},"persistentVolumeReclaimPolicy")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"Retain")," so the volume does not get deleted if the PVC is deleted."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'oc patch pv <dynamic-pv-name> -p \'{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}\'\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Continue to the ",(0,r.kt)("a",{parentName:"p",href:"#shared-prep"},"Shared File System Preparation")," step below."))),(0,r.kt)("h4",null,"OCS Persistent Volume and Claim Removal"),(0,r.kt)("p",null,"WARNING: Removing an OCS persistent volume will delete any data stored in that PV."),(0,r.kt)("p",null,"To remove the persistent volume and claim, run the following commands:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"oc delete pvc ibm-wh-acd-config-storage-cephfs-pvc.yaml -n <your namespace>\noc delete pv <dynamic-pv-name>\n")),(0,r.kt)("a",{name:"create-nfs"}),(0,r.kt)("h4",null,"Creating an NFS shared filesystem"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create the persistent volume for NFS"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc create -f ibm-wh-acd-config-storage-nfs-pv.yaml\n")),(0,r.kt)("p",{parentName:"li"},"Note: The path to the NFS volume must be unique for each ACD instance."),(0,r.kt)("br",null),"Example NFS PV file ibm-wh-acd-config-storage-nfs-pv.yaml",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:"ibm-wh-acd-config-storage-nfs-pv.yaml","ibm-wh-acd-config-storage-nfs-pv.yaml":!0},"apiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: ibm-wh-acd-config-storage-nfs-pv\nspec:\n  capacity:\n    storage: 10Gi\n  nfs:\n     server: your-nfs-server\n     path: /your/nfs/path\n  accessModes:\n    - ReadWriteMany\n  persistentVolumeReclaimPolicy: Retain\n  volumeMode: Filesystem\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create the persistent volume claim for NFS"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"oc create -f ibm-wh-acd-config-storage-nfs-pvc.yaml -n <your namespace>\n")),(0,r.kt)("br",null),"Example NFS PVC file ibm-wh-acd-config-storage-nfs-pvc.yaml",(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:"ibm-wh-acd-config-storage-nfs-pvc.yaml","ibm-wh-acd-config-storage-nfs-pvc.yaml":!0},"apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: ibm-wh-acd-config-storage-nfs-pvc\nspec:\n  accessModes:\n    - ReadWriteMany\n  resources:\n    requests:\n      storage: 10Gi\n  volumeMode: Filesystem\n  volumeName: ibm-wh-acd-config-storage-nfs-pv\n")))),(0,r.kt)("h4",null,"NFS Persistent Volume and Claim Removal"),(0,r.kt)("p",null,"To remove the persistent volume and claim, run the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"oc delete pvc ibm-wh-acd-config-storage-nfs-pvc -n <your namespace>\noc delete pv ibm-wh-acd-config-storage-nfs-pv\n")),(0,r.kt)("a",{name:"shared-prep"}),(0,r.kt)("h3",null,"Shared File System Preparation"),(0,r.kt)("p",null,"Once the shared file system is created, the top-level directory should be empty and its GID set to 0 (root) with group ",(0,r.kt)("inlineCode",{parentName:"p"},"rwx")," permissions.  This is required to allow the ACD services write access when running with a restricted SCC.  If the shared file system requires a GID other than zero, you must also set the ",(0,r.kt)("inlineCode",{parentName:"p"},"Supplemental Group ID")," parameter in the ",(0,r.kt)("inlineCode",{parentName:"p"},"File Storage -> PVC")," section during the ACD instance creation.  "),(0,r.kt)("p",null,"Example commands to set the shared file system directory permissions:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"chgrp 0 <top level mount directory>\nchmod g+w <top level mount directory>\n")),(0,r.kt)("p",null,"If you don’t have direct access to the top-level directory of the file share, one technique to set the directory permissions is to start a temporary pod that runs as root with the PVC mounted.  Exec into the pod to run the ",(0,r.kt)("inlineCode",{parentName:"p"},"chgrp")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"chmod")," commands on the mounted share directory."),(0,r.kt)("p",null,"When creating the ACD instance, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Existing PVC Name")," parameter should match the name specified in the PVC that was created in these steps.  The ",(0,r.kt)("inlineCode",{parentName:"p"},"PVC Storage Size")," must also be set to match the size of the shared file system."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-installing-setup-namespace-md-ab1fffedac5ab252f25d.js.map