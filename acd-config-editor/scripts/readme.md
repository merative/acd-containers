# Watson Annotator for Clinical Data Configuration Editor stand-alone installation Instructions

## Pulling new images for acd ce
* Setup the pull password using
```
docker login -u iamapikey -p **\<your-api-key\>** us.icr.io
```
* Download the  acd-ce-images.txt file and pull-acd-ce.sh script file to a directory
* Create a acd-ce subdirectory
* In that acd-ce subdirectory place the scripts needed to setup and run acd-ce :
  * [acd-ce.properties](../acd-ce.properties)
  * [run-acd-ce.sh](./run-acd-ce.sh)
  * [docker_deploy_service.sh](../../docker_deploy/docker_deploy_service.sh)    
  * [service_generate_effective_properties.sh](../../service/service_generate_effective_properties.sh)
  * [ace-ce-images.txt](./acd-ce-images.txt)
  * [notices file](https://ibm.ent.box.com/folder/92863154197)  maintained by Kristin M.
* Run ./pull-acd-ce.sh  and wait a while
* When you are done the image files will be in the acd-ce sub  directory as .tar.gz files
* tar up that acd-ce subdir with COPYFILE_DISABLE=1 tar -cvf acd-ce.<date>.tar acd-ce  command (see [this link for why i pass that env var first](https://unix.stackexchange.com/questions/282055/a-lot-of-files-inside-a-tar))
* Test the new build - automated cypress testing is being built out here: https://github.ibm.com/watson-health-cognitive-services/whcs-service-cartridge/tree/cypress-ui-testing/service-cartridge/cypress
* Upload the latest files to the EAP url under the download files page https://epwt-w3.mybluemix.net/software/support/trial/earlyprograms/suppt/program/programs_edit_pw.wss?id=bkexkx
* Kathy Sitar set this up for us and Dave H can make you an editor.  You'll have to edit the page to point to the new file and remove the old file and text.

## Running acd ce

* On a 64g machine w/ docker and perl untar the file into a an acd-ce dir with 'tar -xvf acd-ce.tar acd-ce'
* Run the following to install.  The environment properties are found alongside these instructions.
    ```
    # update acd-ce.properties with the external hostname it will be reached from
    sed -i 's/%SERVER%/<yourhostname>/g' acd-ce.properties

    # Install acd ce
    ./docker_deploy_service.sh -environment_properties acd-ce.properties -registry_namespace <registry namespace> -store_password <keystore/truststore password>
    ```

## Testing
* To test the acd part of the installation, run a sample curl request against the service
  ```
  curl -v -k "https://localhost:9272/services/clinical_data_annotator/api/v1/status/health_check"
  ```
 * To test the acd ce part of the installation, open a browser to the host name
  ```
   https://<yourhostname>:9281/services/cartridge/cartridge-editor.html"
  ```
  *NOTE:* You will have to accept the security exception for self-signed certificate and login with your name and email.
