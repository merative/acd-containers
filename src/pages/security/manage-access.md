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

1. Create a project/namespace for the proxy to run in (the examples below used ibm-wh-acd-oauth-proxy)

    ```
    oc create namespace ibm-wh-acd-oauth-proxy
    ```

1. Download the yaml below and save it as ibm-wh-acd-oauth-proxy.yaml.  Edit it with these changes:
   * `namespace: ibm-wh-acd-oauth-proxy` to the namespace you created in 1.
   * In the args section on this line `--upstream=https://ibm-wh-acd-acd.<namespace>.svc`  - change <namespace\> to the namespace your acd instance is running in (the target service)
   * On this line `--openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":<namespace>}}`- change <namespace\> again to match your target acd namespace.

   ```yaml ibm-wh-acd-oauth-proxy.yaml
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
              - --upstream=https://ibm-wh-acd-acd.<namespace>.svc
              - --openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":"<namespace>"}}
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

1. Run `oc project ibm-wh-acd-oauth-proxy` (change to your project used in  step 1 above).
1. `oc create -f ibm-wh-acd-oauth-proxy.yaml`
   * This should create a deployment for the proxy, a service to that deployment, a route to that service and a proxy service account all in your new project that was created in step 1.
1. Because we are using the `--openshift-delegate-urls` option of the proxy we need to give the service account that checks the token permission to create a tokenreviews at the cluster level.  We'll do this by binding the proxy service account to the predefined `system:auth-delegator` cluster role.
   * `oc adm policy add-cluster-role-to-user system:auth-delegator -z proxy -n ibm-wh-acd-oauth-proxy` (change project name as needed)
1. The delegate-urls above says it will check the user/token coming in has the ability to do a get on the services in the target namespace as what will check to ensure the service account has access to the target acd instance.   We need to create a namespace-scoped role on the target acd project and grant access to the service account that will be used to call acd.  To start, create a role (named serviceview) on the namespace where acd is running and bind that role to the service account created above. Change <namespace\> to your acd namespace and ibm-wh-acd-oauth-proxy to the namespace/project created in step 1 where the proxy runs.
    * `oc create role serviceview --verb=get --resource=service -n <namespace>`
    * `oc adm policy add-role-to-user serviceview system:serviceaccount:ibm-wh-acd-oauth-proxy:proxy --role-namespace=<namespace> -n <namespace>`
1. Create a token to use on the service account
   * `oc serviceaccounts new-token proxy -n ibm-wh-acd-oauth-proxy`  (change the project name as needed).  Copy the token returned (not this is also stored in a secret named proxy-token-nnnnn in the target project and when you delete that it will remove the token from the account after a bit. You can add additional tokens and remove the secret to rotate your tokens for your app.
1. Use that token as a bearer token to call acd through the proxy route passing the bearer token on the Authorization header (eg:
`curl -X GET -H "Authorization: Bearer eyJ....z9g" -k https://proxy-ibm-wh-acd-oauth-proxy.apps.youserver.com/services/clinical_data_annotator/api/v1/flows?version=2021-05-18`

The delegate-urls parms says for which paths it should foward and what the caller needs to have access to allow it.  In this example we forward all calls ('/') if the caller has `get` access to the services in the target acd namespace  (which we created the role and granted that permission the service account).  More info on openshift rbac access is here - https://docs.openshift.com/container-platform/4.7/authentication/using-rbac.html
Note here we have the proxy service account doing double duty - it is used to run the proxy service and do the token review (so it needed that cluster role binding) and we have it as the service account that is calling into ACD and bound it to that serviceview role to allow it.  In practice you have many service accounts and use their tokens to act as different acd tenants.
Also note if your application runs in the cluster you may want to consider using [bound service access tokens](https://docs.openshift.com/container-platform/4.7/authentication/bound-service-account-tokens.html) to have the tokens dynamically generated and rotated by the kubelet using the [TokenRequest api](https://jpweber.io/blog/a-look-at-tokenrequest-api/).

More options and details for the proxy are availble at [OpenShift OAuth Proxy](https://github.com/openshift/oauth-proxy#openshift-oauth-proxy).

Information on troubleshooting the OAuth Proxy is found at [Troubleshooting the OAuth Proxy](/troubleshooting/troubleshooting-the-oauth-proxy/).

### Multitenancy with ACD

ACD is stateless as far as the text it analyzes and returns however it does store configuration data through cartridges and flows and profiles and associated configuration artifacts.  You can use a single ACD instance with multiple 'tenants' which provides each tenant its own configuration storage area.  In order to use multitenancy you must use a security proxy as described above and use a different service account for each tenant. That provides security and passes back the tenant through a header to ACD but ACD needs to be configured to honor that header (it will use a defaultTenant as a tenant value for all calls otherwise).  In the ACD deployment (operand) when you create the instance you can set the tenantHeader value in the custom resource definition to specify the header to use as the tenant.  With the OAuth proxy above use the value of `X-Forwarded-User` (which the proxy sets to the service account name).  In the ACD custom resource definition this is `tenantHeader: X-Forwarded-User`.  You can edit or patch your instance to change or set it at create time.
