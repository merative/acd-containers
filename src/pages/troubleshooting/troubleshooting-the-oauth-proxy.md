---
title: "Troubleshooting the OAuth Proxy"
excerpt: "Troubleshooting the IBM ACD Container Edition OAuth Proxy"
categories: troubleshooting
slug: troubleshooting-the-oauth-proxy
toc: true
---

## Troubleshooting the OAuth Proxy

To diagnose problems follow these steps:

1. Ensure the OAuth proxy deployment and pod are running in the proxy namespace
   - Check the pod logs to ensure it is starting without errors

1. Ensure you can login with the token as the service account and view the services in the target acd namespace.

   - `oc login https://api.yourserver.com:6443  --token <yourtoken>  --insecure-skip-tls-verify=true` - ensure your token is good
   - `oc whoami` - ensure you are the service account
   - `oc get service ibm-wh-acd-acd -n ${acd_namespace}`  - In your acd target namespace, ensure you can view the service as the service account user.  If role binding is setup correctly you will see the service info.  If not, you will see an `Error from server (Forbidden)`.

1. Check the proxy logs for access errors

   ```
   oc logs <pod> --namespace ${proxy_namespace}
   ```

   - `<pod>` is the proxy pod name, for example `proxy-749c996465-bt6zc`
   - `${proxy_namespace}` namespace where the proxy was installed

   See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.

1. Check the ACD instance logs for errors during request processing.

   See [Logging and Montioring](/troubleshooting/logging-monitoring) for more details.
