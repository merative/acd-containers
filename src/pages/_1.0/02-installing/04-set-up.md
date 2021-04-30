---
title: "Setting Up ACD"
excerpt: "Setup of ACD."
categories: installing
slug: set-up
toc: true
---

## Namespace

ACD and its operator require a dedicated namespace.

### Namespace Installation

Create the namespace.

```
oc create namespace <namespace>
```

### Namespace Removal

To remove the namespace run the following:

```
oc delete namespace <namespace>
```

## Secrets

ACD and its operator require the following secrets.

1. A pull secret is needed to pull images from the image registry in the CDT account. Note: Request access to CDT and get an API key to be used in secret creation steps.
2. A single cluster wide self-signed certificate is needed to communicate between ACD services within the cluster.
3. A keystore containing the self-signed certificate and the keystore's password is needed for deployments.


### Secret Installation

Create the secret containing the container registry image pull secret.

For more details on creating a pull secret, see IBM Cloud documentation for [using an image pull secret to access images in other IBM Cloud accounts or external private registries from a non-default Kubernetes namespace](https://cloud.ibm.com/docs/containers?topic=containers-registry#other ).

```
kubectl create secret docker-registry cp.stg.icr.io \
    --docker-server=cp.stg.icr.io \
    --docker-username=iamapikey \
    --docker-password=<apikey> \
    --docker-email=<email_address> \
    --namespace=<namespace>
```

Create the secret containing the Websphere Liberty keystore.

```
keystore_pwd=<keystore_password>
java -cp ../../config/whcs-devops/tools/service-encryption.jar com.ibm.watson.health.services.Encryption -e ${keystore_pwd} > password
kubectl create secret generic whcs-acd-keystore \
                              --namespace <namespace> \
                              --from-file=password
```

Create the secret containing the Websphere Liberty truststore.

```
truststore_pwd=<truststore_password>
java -cp ../../config/whcs-devops/tools/service-encryption.jar com.ibm.watson.health.services.Encryption -e ${truststore_pwd} > password
kubectl create secret generic whcs-acd-truststore \
                              --namespace <namespace> \
                              --from-file=password
```

Create the config file for the self-signed certificate.

```
vi whcs-int.cfg
-------------------------------------------------------------------------------
[ req ]
default_bits       = 2048
default_keyfile    = key.pem
distinguished_name = req_distinguished_name
req_extensions     = v3_req
prompt = no

[ req_distinguished_name ]
commonName             = '<cluster_name>' #CN=
organizationalUnitName = '<org_unit_name>' #OU=
organizationName       = '<org_name>' #O=
localityName           = '<locality_name>' #L=
stateOrProvinceName    = '<state>' #S=
countryName            = '<country>' #C=

[ v3_req ]
subjectAltName = @alt_names
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[ alt_names ]
DNS.1 = <cluster_name>
-------------------------------------------------------------------------------
```
Create the self-signed certificate and java keystore.

```
# Generate key
openssl genrsa -out whcs-int.key 2048

# Create signing request
openssl req -new \
            -config whcs-int.cfg \
            -key whcs-int.key \
            -out whcs-int.csr

# Create x509 PEM certificate
openssl x509 -req \
             -days 365 \
             -sha256 \
             -extensions v3_req \
             -extfile whcs-int.cfg \
             -in whcs-int.csr \
             -out whcs-int.pem \
             -signkey whcs-int.key

# Create liberty service keystore
openssl pkcs12 -export \
               -in whcs-int.pem \
               -inkey whcs-int.key \
               -name whcs-int \
               -out whcs-int.p12 \
               -passin pass:${keystore_pwd} \
               -passout pass:${keystore_pwd}
```

Create the secret containing the keystore certificate.

```
kubectl create secret generic whcs-acd-certs-keystore-p12 \
                              --namespace <namespace> \
                              --from-file=whcs-int.p12
```

Create the secret containing the truststore certificate.

```
kubectl create secret generic whcs-acd-certs-truststore-pem \
                              --namespace <namespace> \
                              --from-file=whcs-int.pem
```

If the deployment is using Cloud Object Storage (COS) as the artifact service provider, the COS credentials need to be inserted as secrets. At present, this is a required secret. It is not used for file backed storage and will be made optional in the near future.

```
echo '<cos_apikey>' | tr -d '\n' > apikey.txt
echo '<cos_id>' | tr -d '\n' > username
echo '<cos_secret>' | tr -d '\n' > password
kubectl create secret generic whcs-acd-as \
                              --namespace <namespace> \
                              --from-file=apikey.txt \
                              --from-file=username \
                              --from-file=password
```

### Secret Removal

To remove the secrets run the following:

```
kubectl delete secret docker-registry cp.stg.icr.io \
                              --namespace <namespace>

kubectl delete secret generic whcs-acd-keystore \
                              --namespace <namespace>

kubectl delete secret generic whcs-acd-truststore \
                              --namespace <namespace>

kubectl delete secret generic whcs-acd-certs-keystore-p12 \
                              --namespace <namespace>

kubectl delete secret generic whcs-acd-certs-truststore-pem \
                              --namespace <namespace>

kubectl delete secret generic whcs-acd-as \
                              --namespace <namespace>
```

### Secret Update

To update the secrets, follow the instructions for Secret Removal and Secret Installation, recreating each secret with the desired updates. Once the secret updates have been made, stop and restart the deployment or delete each pod to force the new containers to pick up the updated secrets.

## Storage (Optional)

If the deployment will use persistent file based storage instead of IBM Cloud Object (COS) storage, the Persistent Volume (PV) and Persistent Volume Claim (PVC) must be created.

### Persistent Volume and Claim Installation

Create the persistent volume claim.

```
 oc create -f file-store-pvc.yaml
```

The following is an example of a PVC that has been tested with this chart.

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: whcs-acd-file-store-pvc
  namespace: whcs-demo
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 1Gi
  storageClassName: ocs-storagecluster-cephfs
  volumeMode: Filesystem
  volumeName: whcs-acd-file-store-pv
```

Create the persistent volume.

A minimum size of 1 gigabyte is recommended. Access mode must be set to ReadWriteMany. Note that the persistent volume has a `claimRef` field which refers back to the persistent volume claim so ensure its references for name, namespace, and uid are correct.

```
 oc create -f file-store-pv.yaml
```

The following is an example of a PV that has been tested with this chart.
```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: whcs-acd-file-store-pv
spec:
  accessModes:
  - ReadWriteMany
  capacity:
    storage: 1Gi
  claimRef:
    apiVersion: v1
    kind: PersistentVolumeClaim
    name: whcs-acd-file-store-pvc
    namespace: whcs-demo
    uid: 4353a4d2-306f-4fcd-a0cf-ea43e052ad7d
  csi:
    driver: openshift-storage.cephfs.csi.ceph.com
    fsType: ext4
    nodeStageSecretRef:
      name: rook-csi-cephfs-node
      namespace: openshift-storage
    volumeAttributes:
      clusterID: openshift-storage
      fsName: ocs-storagecluster-cephfilesystem
      storage.kubernetes.io/csiProvisionerIdentity: 1580324955446-8081-openshift-storage.cephfs.csi.ceph.com
    volumeHandle: 0001-0011-openshift-storage-0000000000000001-52314a98-5e3c-11ea-af7e-0a580a83008f
  persistentVolumeReclaimPolicy: Retain
  storageClassName: ocs-storagecluster-cephfs
  volumeMode: Filesystem
```

### Persistent Volume and Claim Removal

To remove the persistent volume and claim run the following:

```
oc delete pvc whcs-acd-file-store-pvc -n whcs-demo
oc delete pv whcs-acd-file-store-pv -n whcs-demo
```
## Security Policy

ACD requires the following security policy.

### Custom PodSecurityPolicy definition:
```
PodSecurityPolices are NOT used on OpenShift.
```

### SecurityContextConstraints Requirements

This chart requires a [`restricted`](https://docs.openshift.com/container-platform/4.2/authentication/managing-security-context-constraints.html#security-context-constraints-about_configuring-internal-oauth) SecurityContextConstraints (SCCs) to be bound to the service account during installation. To meet this requirement there may be cluster-scoped, as well as namespace-scoped, pre- and post-actions that need to occur.

The predefined SecurityContextConstraints resource named [`restricted`](https://ibm.biz/cpkspec-scc) should be used and applied to pods as the security context for this chart.  Here is example if you need to configure your own security context.

#### Custom SecurityContextConstraints definition:
```
apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
metadata:
  annotations:
    kubernetes.io/description: An example of a 'restricted' SCC which denies access to all host features and requires
      pods to be run with a UID, and SELinux context that are allocated to the namespace.  This
      is the most restrictive SCC.
    release.openshift.io/create-only: "true"
  name: whcs-restricted-scc
allowHostDirVolumePlugin: false
allowHostIPC: false
allowHostNetwork: false
allowHostPID: false
allowHostPorts: false
allowPrivilegeEscalation: false
allowPrivilegedContainer: false
allowedCapabilities: null
defaultAddCapabilities: null
fsGroup:
  type: MustRunAs
groups: []
priority: null
readOnlyRootFilesystem: false
requiredDropCapabilities:
- KILL
- MKNOD
- SETUID
- SETGID
runAsUser:
  type: MustRunAsRange
seLinuxContext:
  type: MustRunAs
supplementalGroups:
  type: RunAsAny
users: []
volumes:
- configMap
- downwardAPI
- emptyDir
- persistentVolumeClaim
- projected
- secret
```

If the SCCs resource does not exist in the cluster, create it with the following command:

```
oc create -f whcs-restricted-scc.yaml
```

If the `acd-sa` service account in your target namespace is not bound to the custom SCCs resource, bind it with the following command:

`oc adm policy add-scc-to-group whcs-restricted-scc system:serviceaccounts:<namespace> --as system:admin`

For example, to add the SCC to all service accounts in the `whcs-demo` namespace:

```
oc adm policy add-scc-to-group whcs-restricted-scc system:serviceaccounts:whcs-demo --as system:admin
```ication supports.