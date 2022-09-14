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

# Script to pull all images for configuration editor
# by default it will pull to local repo, then copy it to a tar.gz and delete from local repository
#########################################################################
#Global vars
#########################################################################
SCRIPT_NAME=$(basename -- "$0")
#label="latest"                        # change to label of image to use
IMAGE_FILE_LIST=acd-ce-images.txt
remove=true
registry="us.icr.io"
registry_namesapce="vdt-acd-rns"

UNAME="$(uname -s)"


echo "####################"
echo "Executing $SCRIPT_NAME"

#########################################################################
#Common functions
#########################################################################
print_help() {
  echo "$SCRIPT_NAME Pulls latest ACD Configuration Editor (aka DET) images to local docker repo; If images are already local it will update them."
  echo "  The files are large so the images get removed from the repo and the local file system when done."
  echo "  In order to pull the images you should set the docker password to enable pulling it from the repo (eg: docker login -u iamapikey -p <your_apikey> us.icr.io)"
  echo "Usage: $SCRIPT_NAME [options...]"
  echo "Options:"
  echo "  -image-list FILE  file to use that has list of images.  Defailt is ${IMAGE_FILE_LIST}"
  echo "  -remove|-r <true|false> remove the images from local repo when done. Default is ${remove}"
  echo "  -target-dir DIR the relative path or directory to store the images in.  Default is ${target_dir}"
  echo "  -registry name of the container registry hosting ACD service images. Default is ${registry}"
  echo "  -regist;ry_namespace namespace for the ACD service images in the container registry.  Default is ${registry_namesapce}"

}

pull_image() {
  local qualified_name=$1
  local target_file=$2

  docker pull ${qualified_name}  # 1>/dev/null
  if [ $? != 0 ]; then
    echo "docker pull ${qualified_name} failed"
    return 1;
  fi
  echo " saving image to zip file"
  docker save ${qualified_name} | gzip > ${target_file}
  if [ $? != 0 ]; then
    echo "docker save ${qualified_name} failed"
    return 1;
  fi

  echo "save is done"
  return 0;
}

#########################################################################
#Parameter management
#########################################################################
#Parameter defaults
image_file_list=$IMAGE_FILE_LIST
target_dir=acd-ce
rc=0



while [[ $# -gt 0 ]]
do
  key="${1}"
  case $key in

    -help|-h|-\?)
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
    -remove|-r)
      remove="$2"
      echo "setting remove to ${2}"
      shift
      ;;
    -target-dir)
      target_dir="$2"
      echo "setting target-dir to ${2}"
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
      echo "Unknown parameter ${key}".
      print_help
      exit 1
  esac
  shift
done

# Parameters checking

#########################################################################
#Mainline
#########################################################################
echo "image_file_list=${image_file_list}"
echo "target directory = $target_dir"
if [ ! -w "${target_dir}" ]; then echo directory "${target_dir}" doesn\'t exists or is not writable; exit 1; fi
if [ -z "${registry}" ]; then echo parameter registry wasn\'t provided; exit 1; fi
if [ -z "${registry_namespace}" ]; then echo paramater registry_namespace wasn\'t provided; exit 1; fi

[ ! -f $image_file_list ] && { echo "$image_file_list" not found; exit 1; }
while read -r image_name
do
  if  ! echo "${image_name}" | grep -q '^ *#'   # ignore comments
  then
    full_image_name="${registry}/${registry_namespace}/${image_name}"
    target="${target_dir}/${image_name}.tar.gz"
    echo " pulling ${full_image_name} into ${target}"
    pull_image "${full_image_name}" "${target}"
  fi
done < "${image_file_list}"
# remove all at end if asked too
if [ ${remove} == true ]; then
   echo " removing images from local registry"
   while read -r image_name
   do
     if  ! echo "${image_name}" | grep -q '^ *#'   # ignore comments
     then
       full_image_name="${registry}/${registry_namespace}/${image_name}"
       echo " removing  ${full_image_name} "
       docker rmi "${full_image_name}" -f
       if [ $? != 0 ]; then
          echo "docker rmi ${full_image_name} failed"
          rc=$?
       fi
     fi
   done < "${image_file_list}"

   # remove danglers
   danglers=$(docker images -q -f dangling=true)
   if [ -n "${danglers}" ]; then
      docker rmi ${danglers}
   fi

fi

exit $rc
