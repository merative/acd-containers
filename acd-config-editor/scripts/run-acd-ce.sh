#!/bin/bash
# ***************************************************************** 
#                                                                   
# Licensed Materials - Property of IBM                              
#                                                                   
# (C) Copyright IBM Corp. 2001, 2022. All Rights Reserved.          
#                                                                   
# US Government Users Restricted Rights - Use, duplication or       
# disclosure restricted by GSA ADP Schedule Contract with IBM Corp. 
#                                                                   
# ***************************************************************** 

#########################################################################
#Global vars
#########################################################################
SCRIPT_NAME=$(basename -- "$0")
repository="us.icr.io"
registry_namespace="vdt-acd-rns"
label="latest"
IMAGE_FILE_LIST="/home/jenkins/workspace/whcs-devops-ucd/acd-ce_new/acd-main/acd-ce/acd-ce-images.txt"
remove=true

UNAME="$(uname -s)"


echo "####################"
echo "Executing $SCRIPT_NAME"

#########################################################################
#Common functions
#########################################################################
print_help() {
  echo "$SCRIPT_NAME Loads the Watson Annotator for Clinical Data Configuration editory into a local docker repo and runs it."
  echo " by default it will stop all running containers, clear the images and reload the images from the latest source files and then start new containers."
  echo "Usage: $SCRIPT_NAME [options...]"
  echo "Options:"
  echo "  -restart  Restarts the containers with the latest configuration data without reloading the images from their source. Use this if you changed the properties file for configuration."
  echo "  -stop    Stops all containers running on the system and don't restart them."
  echo "  -remove  Stops all containers and removes all images and doesn't restart them."
  echo "  -env-props FILE environment properties file to use. Default is acd-ce.properties"
  echo "  -image-list FILE  file to use that has list of images.  Default is $IMAGE_FILE_LIST"
  echo "  -registry name of the container registry hosting ACD service images. Default is ${registry}"
  echo "  -registry_namespace namespace for the ACD service images in the container registry.  Default is ${registry_namesapce}"

}


load_image() {
  local image_file=$1

  docker load < ${image_file} # 1>/dev/null
  if [ $? != 0 ]; then
    echo "docker load \< ${image_file} failed"
    return 1;
  fi
  return 0;
}



#########################################################################
#Parameter management
#########################################################################
#Parameter defaults
image_file_list=$IMAGE_FILE_LIST
env_properties=acd-ce.properties
restart=false;
stop=false;
remove=false;
rc=0

while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in

    -help|-h)
      helpRequest=true
      print_help
      exit 0
      shift
      ;;
    -image-list)
      image_file_list="$2"
      echo "setting image_file_list to ${image_file_list}"
      shift
      ;;
    -env-props)
      env_properties="$2"
      echo "setting env_props to ${env_properties}"
      [ ! -f ${env_properties} ] && { echo env file "${env_properties}" not found; exit 1; }
      shift
      ;;
    -restart)
      echo "restarting acd configuration editor"
      restart=true;
      shift
      ;;
    -stop)
      echo "stopping acd configuration editor"
      stop=true;
      shift
      ;;
    -remove)
      echo "removing acd configuration editor"
      remove=true;
      shift
      ;;
    -registry)
      registry="$2"
      echo "setting registry to ${2}"
      shift
      ;;
    -registry_namespace)
      registry_namespace="$2"
      echo "setting registry_namespace to ${2}"
      shift;;
    *)
      echo "Unknown paramater ${key}".
      print_help
      exit 1
  esac
  shift
done

# Parameters checking

#########################################################################
#Mainline
#########################################################################


# first stop any running containers
# The following has problems when no containers are running
# docker container ls | grep -v CONTAINER | awk '{print $1}' | xargs -L1 docker container stop
echo " stopping all running containers..."
docker container ls | grep -v CONTAINER | awk '{print $1}' | xargs -n 1 -I {} docker container stop {}
echo " ...containers stopped!"

# if stop option was used that is all we do
if [ ${stop} = true ]; then
   exit $rc;
fi

# if just restarting skip the image reload
if [ ${restart} != true ]; then
  echo "image_file_list : ${image_file_list}"
  # now remove all containers
  docker container ls --all | grep -v CONTAINER | awk '{print $1}' | xargs -n 1 -I {} docker container rm {}
  # remove all existing images first otherwise it may rename ones
  # now remove all images that are in some acd namespace
  docker images | grep -v REPOSITORY | grep acd | awk '{print $1}' | xargs -n 1 -I {} docker rmi {}
  [ ! -f $image_file_list ] && { echo image list file "$image_file_list" not found; exit 1; }

# if asked to remove we stop after removing the containers and images
  if [ ${remove} = true ]; then
    echo "ACD containers stopped and images removed. Attempting to remove network."
    docker network rm service_bridge
    exit $rc;
  fi
  # load up the images from the shipped files
  while read -r image_name
  do
    if  ! echo "${image_name}" | grep -q '^ *#'   # ignore comments
    then
      image_file="${image_name}.tar.gz"
      echo " loading  ${image_file}"
      load_image "${image_file}"
    fi
  done < "${image_file_list}"
fi
# start containers for acd, dictionary and cartridge service

# update acd_ce.properties w/ external host name

# Install cacerts to truststore - need to create empty trust store first ...
# keytool -importkeystore -srckeystore /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.222.b10-1.el7_7.x86_64/jre/lib/security/cacerts -destkeystore /tmp/installs/config/truststore/trust.jks -srcstorepass changeit -deststorepass wats0n
# start up all containers for acd_ce
[ ! -f ${env_properties} ] && { echo "${env_properties}" not found; exit 1; }
./docker_deploy_service.sh -environment_properties ${env_properties} -image_list ${image_file_list} -registry ${registry} -registry_namespace ${registry_namespace} -store_password wats0n
echo "done"
exit $rc
