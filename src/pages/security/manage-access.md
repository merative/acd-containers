---
title: "Manage Access"
excerpt: "Managing Access to ACD."
categories: security
slug: manage-access
toc: true
---


## Managing Access to ACD

If you have applications that run outside of the cluster and want to provide secure access to the ACD service in the cluster, you can use the OpenShift-provided OAuth service with a [proxy](https://github.com/openshift/oauth-proxy) and a service account to do role-based access control (RBAC) access to the service.
In the example below we'll use a 4.8 version of the OpenShift OAuth proxy.  See [instructions here](https://catalog.redhat.com/software/containers/openshift4/ose-oauth-proxy/5cdb2133bed8bd5717d5ae64?container-tabs=gti) for how to pull this image.  You can update the version to match your openshift version.  We set the replica count to 2 which gives some level of HA and distributes the workload some, you may need to increase this based on load.

1. Create a project/namespace for the proxy to run in (the examples below use `acd-oauth-proxy`)

    ```
    proxy_namespace=acd-oauth-proxy
    oc create namespace ${proxy_namespace}
    ```

2. Download the yaml below and save it as "acd-oauth-proxy.yaml".  Edit it with these changes:
   * In the args section, on this line `--upstream=https://merative-acd-acd.<acd_namespace>.svc` change <acd_namespace\> to the namespace your ACD instance is running in (the target service).
   * On this line `--openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":<acd_namespace>}}`change <acd_namespace\> again to match your target ACD namespace.

   ```yaml acd-oauth-proxy.yaml
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
        replicas: 2
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
              image: registry.redhat.io/openshift4/ose-oauth-proxy:v4.8
              imagePullPolicy: IfNotPresent
              ports:
              - containerPort: 8443
                name: public
              args:
              - --https-address=:8443
              - --provider=openshift
              - --request-logging=true
              - --openshift-service-account=proxy
              - --upstream=https://merative-acd-acd.<acd_namespace>.svc
              - --openshift-delegate-urls={"/":{"resource":"services","verb":"get","namespace":"<acd_namespace>"}}
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

3. Change to your project/namespace used in Step 1:

  ```yaml
  oc project ${proxy_namespace}
  ```

4. Set a variable for your ACD namespace. Replace <acd_namespace> with your target ACD namespace name.

  ```yaml
  acd_namespace=<acd_namespace>
  ```

5. Next apply the yaml file.  This should create a deployment for the proxy, a service to that deployment, a route to that service, and a proxy service account in your new project that was created in Step 1:

  ```yaml
  oc create -f acd-oauth-proxy.yaml
  ```

6. Because we are using the `--openshift-delegate-urls` option of the proxy, we need to configure the service account that checks the token permission to create a TokenReview at the cluster level.  We'll do this by binding the proxy service account to the predefined `system:auth-delegator` cluster role:

  ```yaml
  oc adm policy add-cluster-role-to-user system:auth-delegator -z proxy -n ${proxy_namespace}
  ```

7. The `--openshift-delegate-urls` parameter above says it will check if the user/token coming in has the ability to do a `get` operation on the services in the target namespace, and will check to ensure the service account has access to the target ACD instance.  We need to create a namespace-scoped role on the target ACD project and grant access to the service account that will be used to call ACD.  To start, create a role (named `serviceview`) on the namespace where ACD is running:

  ```yaml
  oc create role serviceview --verb=get --resource=service -n ${acd_namespace}
  ```

8. Now bind that role to the service account created above:

  ```yaml
  oc adm policy add-role-to-user serviceview system:serviceaccount:${proxy_namespace}:proxy --role-namespace=${acd_namespace} -n ${acd_namespace}
  ```

9. Create a token to use on the service account:

  ```yaml
  oc serviceaccounts new-token proxy -n ${proxy_namespace}
  ```

  Copy the token returned.

  **Note**: This token is also stored in a secret named "proxy-token-nnnnn" in the target project, and when you delete that it will remove the token from the account after a bit. You can add additional tokens and remove the secret to rotate your tokens for your app.

10. Use the token you just created as a bearer token to call ACD through the proxy route passing the bearer token on the Authorization header.  For example:

  ```yaml
  curl -X GET -H "Authorization: Bearer eyJ....z9g" -k "https://<proxy_route_name>-<proxy_route_namespace>.apps.yourserver.com/services/clinical_data_annotator/api/v1/flows?version=2021-05-18"
  ```

The `openshift-delegate-urls` parameter says which paths it should forward and what the caller needs to have access to in order to allow it.  In the preceding example, we forward all calls ('/') if the caller has `get` access to the services in the target ACD namespace (for which we created the role and granted permission to the service account).  For more informnation on OpenShift RBAC access refer to https://docs.openshift.com/container-platform/4.7/authentication/using-rbac.html

Note that we have the proxy service account doing double-duty.  It is used to run the proxy service and do the TokenReview (so it needed the cluster role binding).  We also have it as the service account that is calling into ACD and we bound it to the `serviceview` role to allow it.  In practice, you have many service accounts and their tokens are used to act as different ACD tenants.

Also note that if your application runs in the cluster, you may want to consider using [bound service access tokens](https://docs.openshift.com/container-platform/4.7/authentication/bound-service-account-tokens.html) to have the tokens dynamically generated and rotated by the kubelet using the [TokenRequest API](https://jpweber.io/blog/a-look-at-tokenrequest-api/).

More options and details for the proxy are available at [OpenShift OAuth Proxy](https://github.com/openshift/oauth-proxy#openshift-oauth-proxy).

Information on troubleshooting the OAuth Proxy is found at [Troubleshooting the OAuth Proxy](/troubleshooting/troubleshooting-the-oauth-proxy/).

### Multitenancy with ACD

ACD is stateless as far as the text it analyzes and annotations it returns, however, it does store configuration data through cartridges, flows, profiles and associated configuration artifacts.  You can use a single ACD instance with multiple tenants which will provide each tenant its own configuration storage area.  

In order to use multitenancy, you must use a security proxy as described above and use a different service account for each tenant. That provides security and passes back the tenant through a header to ACD, but ACD needs to be configured to honor that header (otherwise, it will use a defaultTenant as a tenant value for all calls).  In the ACD deployment (operand), when you create the instance, you can set the `tenantHeader` value in the custom resource definition to specify the header to use as the tenant.  With the OAuth proxy above, use the value of `X-Forwarded-User` (which the proxy sets to the service account name).  In the ACD custom resource definition, this is `tenantHeader: X-Forwarded-User`.  You can edit or you can patch your instance to change or set it at create time.

### Network Policies with ACD

A set of Network Policies are created in the target ACD namespace during the installation process. These Network Policies will only allow network traffic to flow from the ACD macro service to its back-end micro services within the same namespace.  The ACD macro service will also accept incoming connections from any namespace to port 9443 (via the ACD service object) such as a Route ingress pod, Proxy pod, or other cluster application pod.

You can disable the Network Policy creation from the web console by setting `Network policy enabled` to false.  When installing from the command line, set the `networkPolicy.enabled` property to false.  This will remove any networking restrictions in the ACD namespace.

You can further enhance security by only allowing the ACD macro service to accept network traffic from a specific source namespace and/or its pods.  This can be done during instance creation in the web console by using the YAML View and adding network policy ingress selectors definitions at `spec.networkPolicy.ingress.fromSelectors`.  From the command line, set `networkPolicy.ingress.fromSelectors`.

**Note:** Creating Network Policy definitions is an advanced topic and requires a good understanding of Network Policies configurations. More information can be found at [Kubernetes Network Policy Documentation](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

Steps:

1. Use an existing Kubernetes label or add one to the source's namespace or deployment descriptor.  This label is used in the Network Policy to determine which incoming network traffic is allowed into the macro service.
1. Modify the ACD instance yaml configuration (CSV) from the web console by adding a yaml block to the `fromSelectors` object.  There are two types of selectors, `namespaceSelector` and `podSelector`.  Choose one or both depending on the scope of restriction you want.  These selectors will get added to the "networkpolicy-acd-macroservice.yaml" `networkPolicy` definition in the ACD namespace.

Example:

```
spec:
  networkPolicy:
    enabled: true
    ingress:
      fromSelectors:
      - namespaceSelector:
          matchLabels:
            <label name>: <label value>
        podSelector:
          matchLabels:
            <label name>: <label value>

# Note that the use of the hyphen (-) on the selectors determines if this restriction is an AND or OR rule.  In the above example, both the 'namespaceSelector' and 'podSelector' have to match since they are in the same array.
```

#### Egress

There are no egress Network Policies defined for the ACD namespace by default.  All pods within the ACD namespace can send data outside of the namespace including to the internet unless you have other restrictions in place.  It is also possible to restrict egress traffic from within the ACD namespace using Network Policy egress rules.
