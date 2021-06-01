---
title: "Manage Access"
excerpt: "Managing Access to IBM ACD."
categories: security
slug: manage-access
toc: true
---


## Managing Access to ACD
If you have applications that run outside of the cluster and want to provide secure access to the ACD service in the cluster you can use the Openshift provided OAuth service with a [proxy](https://github.com/openshift/oauth-proxy) and a service account to do RBAC access to the service.
In the example below we'll use the latest version of the openshift oauth proxy.  See [instructions here](https://catalog.redhat.com/software/containers/openshift4/ose-oauth-proxy/5cdb2133bed8bd5717d5ae64?container-tabs=gti) for how to pull this image.

1. Create a project/namespace for the proxy to run in (I used acd-oauth-proxy)
1. Download the yaml below and save it as oauth-proxy.yaml.  Edit it with these changes:
   * `namespace: acd-oauth-proxy` to the namespace you created in 1.
   * In the args section on this line `--upstream=https://ibm-wh-acd-acd.whcs-acd.svc`  - change the whcs-acd to the namespace your acd instance is running in (the target service)
   * On this line `--openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":"whcs-acd"}}`- change the namespace again to match your target acd namespace.
   ```yaml oauth-proxy.yaml
    kind: List
    apiVersion: v1
    items:
    # Create a proxy service account and ensure it will use the route "proxy"
    - apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: proxy
        annotations:
          serviceaccounts.openshift.io/oauth-redirectreference.primary: '{"kind":"OAuthRedirectReference","apiVersion":"v1","reference":{"kind":"Route","name":"proxy"}}'
    # Create a secure connection to the proxy via a route
    - apiVersion: route.openshift.io/v1
      kind: Route
      metadata:
        name: proxy
      spec:
        to:
          kind: Service
          name: proxy
        tls:
          termination: Reencrypt
    - apiVersion: v1
      kind: Service
      metadata:
        name: proxy
        annotations:
          service.alpha.openshift.io/serving-cert-secret-name: proxy-tls
      spec:
        ports:
        - name: proxy
          port: 443
          targetPort: 8443
        selector:
          app: proxy
    # Launch a proxy as a deployment
    # use           - --set-xauthrequest=true option to send back the user info in the response to nginx or client
    # see https://catalog.redhat.com/software/containers/openshift4/ose-oauth-proxy/5cdb2133bed8bd5717d5ae64?container-tabs=gti
    - apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: proxy
      spec:
        replicas: 1
        selector:
          matchLabels:
            app: proxy
        template:
          metadata:
            labels:
              app: proxy
          spec:
            serviceAccountName: proxy
            containers:
            - name: oauth-proxy
              image: registry.redhat.io/openshift4/ose-oauth-proxy
              imagePullPolicy: IfNotPresent
              ports:
              - containerPort: 8443
                name: public
              args:
              - --https-address=:8443
              - --provider=openshift
              - --request-logging=true
              - --openshift-service-account=proxy
              - --upstream=https://ibm-wh-acd-acd.whcs-acd.svc
              - --openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":"whcs-acd"}}
              - --ssl-insecure-skip-verify=false
              - --upstream-ca=/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt
              - --tls-cert=/etc/tls/private/tls.crt
              - --tls-key=/etc/tls/private/tls.key
              - --cookie-secret=SECRET
              - --footer=-
              volumeMounts:
              - mountPath: /etc/tls/private
                name: proxy-tls
            volumes:
            - name: proxy-tls
              secret:
                secretName: proxy-tls
   ```
1. Run `oc project acd-oauth-proxy` (change to your project used in  step 1 above).
1. `oc create -f oauth-proxy.yaml`
   * This should create a deployment for the proxy, a service to that deployment, a route to that service and a proxy service account all in your new project that was created in step 1.
1. Create a role (named serviceview) on the namespace where acd is running and bind that role to the service account created above. Change whcs-acd to your acd namespace and acd-oauth-proxy to the namespace/project created in step 1 where the proxy runs.
    * `oc create role serviceview --verb=get --resource=service -n whcs-acd`
    * `oc adm policy add-role-to-user serviceview system:serviceaccount:acd-oauth-proxy:proxy --role-namespace=whcs-acd -n whcs-acd`
1. In the openshift console go to User Management->Service Accounts, select Project you created in step 1. Find the `proxy` service account and open it.  In the secrets find the proxy-token-nnnn secret and open it.  In the data of that secret reveal/copy the 'token' data - that is the bearer token to use for this proxy user.
1. Use that token as a bearer token to call acd through the proxy route passing the bearer token on the Authorization header (eg:
`curl -X GET -H "Authorization: Bearer eyJ....z9g" -k https://proxy-acd-oauth-proxy.apps.youserver.com/services/clinical_data_annotator/api/v1/flows?version=2021-05-18`

The delegate-urls parms says for which paths it should foward and what the caller needs to have to allow it.  In this example we forward all calls ('/') if the caller has `get` access to the services in the target acd namespace  (which we created the role and granted that permission the service account).  More info on openshift rbac access is here - https://docs.openshift.com/container-platform/4.7/authentication/using-rbac.html

More options and details for the proxy are availble at [OpenShift OAuth Proxy](https://github.com/openshift/oauth-proxy#openshift-oauth-proxy).

### Troubleshooting

To diagnose problems follow these steps:
1. Ensure the deployment and pod are running in the proxy namespace created in step 1 above.
   * Check the pod logs to ensure it is starting without errors.
1. Ensure you can login with the token as the service account and view the services in the target acd namespace
   * `oc login https://api.youserver.com:6443  --token <yourtoken>  --insecure-skip-tls-verify=true` - ensure your token is good
   * `oc whoami` - ensure you are the service account
   * `oc get service ibm-wh-acd-acd -n whcs-acd`  - change whcs-acd to your acd target namespace and ensure you can view the service as the service account user.  If role binding is setup correctly you will see the service info.  If not, you will see an `Error from server (Forbidden)`.
1. Check the logs on the proxy pod in the console for access errors.
1. Check the logs in the acd service for errors if it gets to ACD.
