---
title: "Install Configuration Editor Using Docker"
excerpt: "Install Using Docker."
categories: configeditor
slug: download_docker
toc: true
---
<!-- ---

copyright:
  years: 2022
lastupdated: "2022-09-13"

keywords: annotator clinical data, clinical data, annotation

subcollection: wh-acd

--- -->

<!-- # Overview -->

The following will walk through the steps necessary to set up and configure a system with the Annotator for Clinical Data Configuration Editor (ACD Configuration Editor) using Docker.  This sets up a local copy of the Configuration Editor in an "all-in-one" single system that can be used to create, edit and preview Annotator for Clinical Data (ACD) cartridges.  The Configuration Editor can also deploy and test against a remote ACD instance that you have access to.  The diagram below shows the flows in and out of the server you'll be setting up.  Ensure any firewalls are open to allow this traffic.

![Configuration Editor on Docker](../../images/ACDCE_on_docker.png)

## Prerequisites

The ACD Configuration Editor setup we use here should be installed on a dedicated system with these requirements:

### System requirements

- Hardware: Processor Architecture: x86_64 / amd64 ; vCPU: 4+ ; Memory: 64GB+ ; Storage: 200GB+
- OS: CentOS 7/8 (RHEL should also work; Ubuntu may work but hasn't been tested)

  **NOTE:** The disk where Docker stores its images and where ACD Configuration Editor is installed needs to have 200GB of storage free.  Note: If you are using IBM Cloud with a VM, it may dafault to a 25GB base disk which will not fit the images and the Configuration Editor, so increase that or add a second larger disk and install Docker and its registry to that along with the ACD Configuration Editor.

### Software requirements

Refer to the [Installation and configuration of prerequisite software](/configeditor/download_docker/#installation-and-configuration-of-prerequisite-software) instructions below.

- Docker Community Edition
- HTTP Server (or some reverse proxy)
- Java 8
- Perl

## Installation and configuration of prerequisite software

- Install and configure HTTP proxy

  The ACD Configuration Editor needs to access several services through a reverse proxy (single host endpoint). The instructions below are to set up an Apache HTTP server, however, any reverse proxy server could be configured for this.  Note also this setup will end up with a self-signed certificate being used by Apache HTTP and presented to the browser/client.   For installing a real certificate see [http://httpd.apache.org/docs/2.4/ssl/ssl_faq.html#realcert](http://httpd.apache.org/docs/2.4/ssl/ssl_faq.html#realcert) or use Let's Encrypt to generate one such as [https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-centos-7](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-centos-7)

  Run this command to install the Apache HTTP server and set it to auto-start with the system:<br/>
  `sudo yum install httpd mod_ssl`

- Allow outbound connections (SELinux-enabled systems need to allow connections):<br/>
  `sudo /usr/sbin/setsebool -P httpd_can_network_connect on`

- (Optional) If your server is set up with a firewall locally, allow incoming connections on your firewall to port 443.  If the system has a local firewall daemon running, you can use:

  - `sudo firewall-cmd --permanent --add-port=443/tcp`
  - `sudo firewall-cmd --reload`

- Configure HTTP

  As root, update the file `/etc/httpd/conf.d/ssl.conf` by adding the following lines near the end of the file, right before the `</VirtualHost>` at the end of the file.  This configures the HTTP proxy to route incoming calls.

```
# Add these lines to /etc/httpd/conf.d/ssl.conf right before the ending </VirtualHost> entry
# block access to swagger docs
<LocationMatch "/services/.*/api/swagger">
    ProxyPass "!"
</LocationMatch>
<LocationMatch "/services/.*/documentation">
    ProxyPass "!"
</LocationMatch>
# sets up httpd as a proxy to front end calls to the ACD Configuration Editor services and a target acd endpoint
# you may need to change localhost to the actual localhost name if you cannot do a curl https://localhost:9281/services/cartridge for example
SSLProxyEngine on
ProxyRequests Off
ProxyPass /services/cartridge https://localhost:9281/services/cartridge
ProxyPassReverse /services/cartridge https://localhost:9281/services/cartridge
#ProxyPass /services/clinical_data_annotator  https://localhost:9272/services/clinical_data_annotator
#ProxyPassReverse /services/clinical_data_annotator https://localhost:9272/services/clinical_data_annotator
# reverse proxy to add in an ACD target deployment instance - change this to your acd instance(s) url endpoints.
# note you will also need to add configuration to the acd-ce.properties file for each acd target instance as documented below.
#ProxyPass /acd-dev/api https://acdroute.yourdevserver.com/services/clinical_data_annotator/api
#ProxyPassReverse /acd-dev/api https://acdroute.yourdevserver.com/services/clinical_data_annotator/api
#ProxyPass /acd/api https://acdroute.yourserver.com/services/clinical_data_annotator/api
#ProxyPassReverse /acd/api https://acdroute.yourserver.com/services/clinical_data_annotator/api
# =========
# USERS: add additional reverse proxy aliases to any other ACD targets here like entry above
# =======
ProxyTimeout 120
SSLProxyVerify none
SSLProxyCheckPeerCN off
SSLProxyCheckPeerName off
SSLProxyCheckPeerExpire off
```

  &nbsp;&nbsp;&nbsp;&nbsp;Changes to default `ssl.conf` file:<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;April 6, 2020:  Added `SSLProxyCheckPeerExpire off`

- Start HTTP proxy by running:<br/>
  `sudo apachectl start`

- Configure HTTP proxy to restart when the system starts by running:

  - `sudo systemctl enable httpd`

  - Logs are in `/etc/httpd/logs` (you need to be root to see them by default) in case you need to look at logs

  - Note: By default, the Configuration Editor is running unsecured and users will be prompted to only provide their name and email address.  You can, however, add a plugin for the HTTP server to secure access to the system.  The auth_openidc module, for example, can be used and configured to check credentials against an openIDC provider, such as IBM AppID.  These docs [https://github.com/zmartzone/mod_auth_openidc](https://github.com/zmartzone/mod_auth_openidc) and [https://cloud.ibm.com/docs/appid?topic=appid-web-apps](https://cloud.ibm.com/docs/appid?topic=appid-web-apps) are for those tools.  See sample instructions below for setting that up after you have the base Configuration Editor installed.  Another level of security can be done with firewall access at the network layer just to limit which networks can access the HTTP server.

- Install Java - you can use this command:<br/>
  `sudo yum install java-1.8.0-openjdk`

- Install Docker and set it up to allow use from non-root and to auto-start

  - Follow these instructions to install Docker: [https://docs.docker.com/install/linux/docker-ce/centos/](https://docs.docker.com/install/linux/docker-ce/centos/)
  - Follow these instructions to allow non-root users to use Docker and to enable Docker to automatically start: [https://docs.docker.com/install/linux/linux-postinstall/](https://docs.docker.com/install/linux/linux-postinstall/)
  - Ensure Docker is started before proceeding and can be run as non-root.  (Using the command `docker -version` as regular user or similar.)

- Verify Perl is installed (or install it)

  Run the command `perl -version`.  If you get an error that the command is not installed, install it with:<br/>
  `sudo yum install perl`

## Installing ACD Configuration Editor

Download the ACD Configuration Editor deployment bundle and place it on the target machine:

https://github.com/merative/acd-containers/tree/master/config-editor

**Note:** If updating an existing installation, be sure to back up and merge changes into your `acd-ce.properties` file (see Updating the Configuration Editor below).

Untar the container images by running the command `tar -xvf config-editor-<timestamp>.tar.gz`.

Run the command `cd Docker` to change the directory.

Update the properties file with the name of the host your users will be accessing the Configuration Editor from (the host name they will enter into the browser) by using the following command against the `ace-ce.properties` file:<br/>
  `sed -i 's/%SERVER%/<hostname>/g' acd-ce.properties`

Note:  If the host name changes (the host used by the browser to get to the system) you'll need to update it in `acd-ce.properties` and restart the acd-ce processes.

In the `acd-ce.properties` file is also the configuration file where configuration data goes. It defaults to `%HOME%/installs/config/`.  You need to change this to a real directory that is read/write for the Docker process user (set below) and should be a directory you will back up.  For example (replace `<user>` with your user name):<br/>
  `sed -i 's/%HOME%/\/home\/<user>/g' acd-ce.properties`

Finally, in the `acd-ce.properties` file, is the user and group that Docker will start the containers as.  It is defined near the top on a line that starts with something similar to this:<br/>
  `com_ibm_watson_health_common_docker_user=<userid>:<groupid>;\`

Edit this line in the file.  The `<userid>` should be a user id on your local system that has RWX permission to the `installs/config` target directory defined above.  The group should be set to `0`.

The user can be a uid (the id of the user, e.g., `1001`, or your own user id which you can get by using the `id` command on Linux).

You can test what you use here by running:<br/>
  `docker run -u <userid>:0 hello-world`

Back up your properties file.  Everytime you update it, the file will be overwritten and you'll want to merge back any changes you made here.<br/>
  `cp acd-ce.properties acd-ce.properties.bak`

Sign on to the container registry with the credentials provided when the product was purchased.<br/>
  `Docker login <container-registry> -u <application-ID> -p <password>`

Now to start the acd-ce processes (i.e. the Docker containers), run the following command:<br/>
  `./run-acd-ce.sh`

This command will stop any running containers, remove any old images, load the current images and start the Docker containers.

To restart the acd-ce processes with the latest configuration from `acd-ce.properties`, you can use:<br/>
  `./run-acd-ce.sh -restart`

The ACD Configuration Editor should now be running.   To test it go to:<br/>
  `https://<your host>/services/cartridge/cartridge-main.html`

You will get an error about the self-signed certificate in the browser, but you can use advanced option to continue to the site.  In Google Chrome, if there is no button to proceed, click on the advanced warning text and type `thisisunsafe` (all one word lower-case--type it after clicking on the warning) and it should proceed.  This is only needed the first time in.  To fix this, add a trusted CA-issued certificate to the Apache HTTP server.

The first prompt is going to ask for your name and email to identify any configuration items you create and what you have access to.  Note that there is no actual authentication configured unless you added it to the HTTP server above (with the OIDC module).

After you are in, you are at the main ACD Configuration Editor catalog page.  Initially, there are no default cartridges.  You can install the base [Clinical Insights](https://github.com/merative/acd-cartridges) cartridge via an import and extend that cartridge or create your own new cartridge.  In the upper right corner of the page, click the mortar board tutorial link to see Introductory videos and click the "?" icon to view the Getting Started Guide.

Periodically, refer to this page for updates to the Configuration Editor packages and see below for update instructions.

## Enabling outbound connections (optional)

If you are going to connect to an external ACD instance, you need to add the standard certifying authorities to the Java trust store used by the services.  Copy the default Java `cacerts` file certificates into the trust store used by the ACD Configuration Editor services and then restart the services with the following command.

The following command will copy all CAs from the Java `cacerts` file into the trust store used by the Configuration Editor processes.  You may need to adjust the `srckeystore` path to match your exact Java version or location.  Adjust the `java-1.8.0-...` directory to your level and the `/tmp/` target should match where you pointed the install to run from in the `acd-ce.properties` file.

  `keytool -importkeystore -srckeystore /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.262.b10-1.el7.x86_64/jre/lib/security/cacerts -destkeystore /tmp/installs/config/truststore/trust.jks -srcstorepass changeit -deststorepass wats0n`

After running this successfully, run the `./run-acd-ce.sh -restart` command to restart the containers to pick up the change.

To configure external ACD Hosts for deploying published cartridges from the Configuration Editor, you must provide them in the `acd-ce.properties` file and provide proxy redirects in the `ssl.conf` Apache HTTP configuration file.  To add ACD target hosts, you can add them to the `acd-ce.properties` file. An example of adding an ACD target to an ACD container edition instance is:

```
com_ibm_watson_health_car_acd_host_1_label="Annotator_for_Clinical_Data_Container_Edition)";\
com_ibm_watson_health_car_acd_host_1_url=https://{your container edition url};\
com_ibm_watson_health_car_acd_host_1_proxy=wh-acd-ce;\
com_ibm_watson_health_car_acd_host_1_auth=Bearer;\
com_ibm_watson_health_car_acd_host_1_phi=false;\
```

ACD Hosts must be indexed in the properties file using `com_ibm_watson_health_car_acd_host_{index}` as the beginning of their property name. The possible properties are:

- `_label` which is the name for the host that will be shown in the Configuration Editor
- `_url` which is what will be shown in the host description in the Configuration Editor
- `_proxy` which is the proxy you have configured in your `ssl.conf` file (see Installation and Configuration of Prerequisite Software) to allow requests to the hosts and avoid CORS errors
- `_phi` which is either true or false based on whether this ACD Host can support protected health information
- `_auth` which specifies the type of authentication the host requires. The three possible auth types are:

  - APIKey: Used for IBM Cloud hosts. It will prompt the user to enter their API Key, and then use the identity server specified in the properties file in the field `com_ibm_watson_health_car_identity_server` (by default, `https://iam.cloud.ibm.com/identity/token`) in order to request a bearer token using the API Key the user entered.
  - Bearer: Used for an ACD Container Edition host, and will prompt the user for their Bearer token to the ACD Container Edition, and expire every 24 hours.
  - Leaving the field blank: You can leave the auth field blank if your host does not require any authentication.

As you add new ACD Hosts, you must configure a proxy in your `ssl.conf` file in order to allow requests to the hosts and avoid CORS errors.  The proxy specified in your `ssl.conf` file must match the proxy in your `acd-ce.properties` file for that host.

## Adding security to HTTP server (optional)

You can use the OIDC module in Apache HTTP server to provide an authentication layer.  You will need an OpenID Connect Provider to do the actual authentication and need to add this Configuration Editor HTTP server as a client to it.  Below are the basic steps to do this.  See the detailed usage and support instructions of this plugin at [https://github.com/zmartzone/mod_auth_openidc](https://github.com/zmartzone/mod_auth_openidc).<br/>

- `sudo yum install mod_auth_openidc`
- **Note:** On CentOS 8, you need to run `sudo dnf module enable mod_auth_openidc` (or `sudo dnf module enable mod_auth_openidc:2.3` or `2.4`, etc.)

Edit `/etc/httpd/conf.d/auth_openidc.conf` as root.  For example, `sudo vi /etc/httpd/conf.d/auth_openidc.conf`.

In that file, add these lines to the top:

```
OIDCRedirectURI https://<your host>/services/redirect_uri
OIDCCryptoPassphrase passPhrase!             (change this to something random)
OIDCProviderMetadataURL <your openid connect provider metadata url>/.well-known/openid-configuration          (get from your oidc provider)
OIDCClientID ******                              (get from your oidc provider when you register this client app)
OIDCClientSecret **********               (get from your oidc provider when you register this client app)
# echo back the claim headers to the client so it knows the user id and email  
Header echo ^OIDC_CLAIM_
# configure which uris to protect with openid-connect plugin
<Location /services>
    AuthType openid-connect
    Require valid-user
</Location>
```

Configure your OpenID Connect Provider (e.g., IBM AppId, Google, Azure AD, Keycloak, etc.) to add this client and the call redirect URL to obtain the client id and secret needed in the configuration file above.

In the `acd-ce.properties` file, the `OIDC_*` headers are configured that are used to populate the fields of the user email and name and for checking authorizations.

The ACD Configuration Editor can be configured to put a 'Logout' button on the user interface. This button can clear cookies and redirect to an authentication URL to perform logout. In order to configure the ability to logout of your instance, you can configure certain parameters under the Cartridge service in the `acd-ce.properties` file. These properties are:

- `com_ibm_watson_health_car_auth_enable_logout` Set this property as true to enable logout.
- `com_ibm_watson_health_car_auth_logout_url` Set this property to the URL your authentication method uses to perform logout, if applicable.

  - Note:  Your "url" property must be encoded to ensure it is correctly pulled into the ACD Configuration Editor. An easy way to perform the encoding is with the Javascript method `encodeURIComponent` or with [https://www.urlencoder.org/](https://www.urlencoder.org/).
  - Your URL will likely need a redirect URL, in which case we recommend redirecting to the Configuration Editor main page, which is at `your-acd-config-editor-site/services/cartridge/cartridge-main.html`.

- `com_ibm_watson_health_car_auth_logout_cookies` Set this property to the cookies your authentication method uses to store session information. If there are multiple cookies, comma-separate them. These will be cleared in the logout process.

An example configuration is:

```
com_ibm_watson_health_car_auth_enable_logout=true;\
com_ibm_watson_health_car_auth_logout_url=https://us-south.appid.cloud.ibm.com/oauth/v4/{my_appid_tenant_id}/cloud_directory/sso/logout?redirect_uri=https%3A%2F%2Fmy-acd-instance%2Fservices%2Fcartridge&client_id={my_appid_client_id};\
com_ibm_watson_health_car_auth_logout_cookies=mod_auth_openidc_session;
```

## Backing up your data

All configuration data such as cartridges, flows, dictionaries, filters, etc., are stored by default in the `%HOME%/installs/config/artifactstore/` directory on the local machine. This is set in the `acd-ce.properties` file and you can change this as needed.   Back this directory up often and if you have to recover your ACD Configuration Editor machine you can restore this from the point of your last backup.

## Stopping the Configuration Editor

Run the following command to stop the containers running the Configuration Editor:<br/>
`./run-acd-ce.sh -stop`

## Updating the Configuration Editor

To update to a newer version of the ACD Configuration Editor, follow these steps:

1. Back up existing `acd-ce.properties` file in your `acd-ce` directory.
2. Download the latest acd-ce tar file again and unpack it as above (see Installing ACD Configuration Editor)
3. Modify the default `acd-ce.properties` file to merge in any changes you made from your backup (replacing the `%SERVER%` with the host name and updating the shared configuration directory, for example)
4. Clear out the shared keystore/truststore. To do this, go to the shared config directory set in the `acd-ce.properties` file with the `*_shared_config_dir` property and run these commands to clear the shared certificates and truststore:

  `rm -r certs`
  `rm -r keystore`
  `rm -r truststore`
5. Sign on to the container registry with the credentials provided when the product was purchased.<br/>
  `Docker login <container-registry> -u <application-ID> -p <password>`

6. Back in the `acd-ce` directory where the tar file was unpacked to, run `./run-acd-ce.sh` to update all the images and restart the containers with the latest build and your modified properties file.

## Notices

The Configuration Editor is Java compatible.

![Java Compatible](../../images/Java.png)

[View Program Terms](https://www14.software.ibm.com/cgi-bin/weblap/lap.pl?li_formnum=L-KMNL-BTV7T4)
