---
title: "Troubleshooting the OAuth Proxy"
excerpt: "Troubleshooting the ACD Container Edition OAuth Proxy"
categories: troubleshooting
slug: troubleshooting-the-oauth-proxy
toc: true
---
<!--                                                                    -->
<!-- (C) Copyright Merative US L.P. and others 2018, 2023                -->
<!--                                                                    -->
<!-- SPDX-License-Identifier: Apache-2.0                                -->
<!--                                                                    -->


## Troubleshooting the OAuth proxy

To diagnose problems follow these steps:

1. Ensure the OAuth proxy deployment and pod are running in the proxy namespace
   - Check the pod logs to ensure it is starting without errors

1. Ensure you can log in with the token as the service account and view the services in the target ACD namespace.

   - `oc login https://api.yourserver.com:6443  --token <yourtoken>  --insecure-skip-tls-verify=true` - ensure your token is good
   - `oc whoami` - ensure you are the service account
   - `oc get service merative-acd-acd -n ${acd_namespace}`  
     - In your ACD target namespace, ensure you can view the service as the service account user.  If role binding is set up correctly, you will see the service info.  If not, you will see an `Error from server (Forbidden)`.

1. Check the proxy logs for access errors:

   `oc logs <pod> --namespace ${proxy_namespace}`

   - `<pod>` is the proxy pod name, for example `proxy-749c996465-bt6zc`
   - `${proxy_namespace}` namespace where the proxy was installed

   See [Logging and Monitoring](/troubleshooting/logging-monitoring) for more details.

1. Check the ACD instance logs for errors during request processing.

   See [Logging and Monitoring](/troubleshooting/logging-monitoring) for more details.
