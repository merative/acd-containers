# Watson Health Cognitive Services (WHCS) Docker Instructions

## Prerequisites
* Install Docker
  * Install the Docker engine from https://docs.docker.com/install/
  * Verify Docker is installed using the following command
    ```
    docker --version
    ```
  * If ports are restricted in docker, make sure that port 9272 is opened
* Install Java
  * Install the Java 1.8 JRE from https://openjdk.java.net/install/
  * Verify Java is installed using the following command
    ```
    java -version
    ```
* Access to Docker images through one of the following:
  * IBM Cloud CLI - For details see https://cloud.ibm.com/docs/services/Registry?topic=registry-getting-started#getting-started
    ```
    ibmcloud login --apikey **\<your-api-key\>** -a https://api.ng.bluemix.net
    ibmcloud plugin install container-registry -r Bluemix -f
    ibmcloud cr login
    ```
  * Docker CLI - For details see https://cloud.ibm.com/docs/services/Registry?topic=registry-registry_access
    ```
    docker login -u iamapikey -p **\<your-api-key\>** us.icr.io
    ```

## Running
* Run the following to install.  The environment properties are found alongside these instructions.
    ```
    # update properties with the external hostname it will be reached from 
    sed -i 's/%SERVER%/<yourhostname>/g' det.properties
    
    # Install DET
    ./docker_deploy_service.sh -environment_properties det.properties -registry_namespace <registry namespace> -store_password <keystore/truststore password>
    ```

## Testing
* To test the acd part of the installation, run a sample curl request against the service
  ```
  curl -v -k "https://localhost:9272/services/clinical_data_annotator/api/v1/status/health_check"
  ```
 * To test the det part of the installation, open a browser to the host name 
  ```
   https://<yourhostname>:9281/services/cartridge/cartridge-editor.html"
  ```
  *NOTE:* You will have to accept the security exception for self-signed certificate and login with your name and email.
