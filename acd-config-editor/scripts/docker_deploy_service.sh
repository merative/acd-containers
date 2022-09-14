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

echo "####################"
echo "Executing $SCRIPT_NAME"
if [ -e "$(dirname "$0")/../service" ]; then
  SERVICE_SCRIPT_DIR="$(cd "$(dirname "$0")/../service"; pwd -P)"
else
  SERVICE_SCRIPT_DIR="$(cd "$(dirname "$0")"; pwd -P)"
fi

#########################################################################
#Global vars
#########################################################################
retries_max=120
UNAME="$(uname -s)"

#########################################################################
#Common functions
#########################################################################
print_help() {
  echo "Options:"
  echo "  -action ${action}                                     (start|stop) Start or stop the service."
  echo "  -environment_properties <environment_properties>  Environment properties. For deploying single environment containing multiple services. Mutually exclusive with -service_properties."
  echo "  -image_list <image-list-file> Optional file to be used with env props to override versions per service."
  echo "  -help|-h                                          Script help."
  echo "  -iam_apikey <iam_apikey>                          IAM apikey for accessing image registry."
  echo "  -pull_image ${pull_image}                                 (true|false|refresh) Pull image from repository.  Refresh forces refresh of local repository."
  echo "  -registry_namespace <registry_namespace>          Image registry namespace."
  echo "  -service_properties <service_properties>          Service properties. For deploying single service. Mutually exclusive with -environment_properties."
  echo "  -service_name <service_name>                      Service name for deploying."
  echo "  -service_version ${service_version}                           Service version for deploying."
  echo "  -store_password <store_password>                  Keystore and truststore password. Needed if generating these or inserting certificates as part of the deployment."

  echo "Usage:"
  echo "  $SCRIPT_NAME [options]"

  echo "Examples:"
  echo "  # Deploy all the services for an environment"
  echo "  $SCRIPT_NAME -environment_properties det.properties"
  echo "  # Deploy a specific service"
  echo "  $SCRIPT_NAME -service_name clinical-data-annotator -service_properties clinical-data-annotator.properties -service_version 20190401.0100"
}

generate_jks() {
  mkdir -p ${com_ibm_watson_health_common_shared_config_dir}
  chmod -f 777 ${com_ibm_watson_health_common_shared_config_dir}
  if [ ! -e "${com_ibm_watson_health_common_shared_config_dir}/keystore/key.jks" ]; then
    if [ -z "${store_password}" ]; then
      echo "Keystore parameter not provided"
      return 1;
    fi
    storeType=jks
    # openjdk uses a different certs setup
    if [[ -f /usr/lib/jvm/jre/lib/security/cacerts ]]; then
      storeType=pkcs12
    fi
    mkdir -p ${com_ibm_watson_health_common_shared_config_dir}/keystore
    keytool -genkey \
          -alias 'wh-int' \
          -keyalg RSA \
          -keypass "${store_password}" \
          -keysize 2048 \
          -dname "O=ibm.com,OU=Watson Health" \
          -keystore "${com_ibm_watson_health_common_shared_config_dir}/keystore/key.jks" \
          -storepass "${store_password}" \
          -storetype ${storeType}
    if [ $? != 0 ]; then
      echo "Create keystore failed"
      return 1;
    fi
    mkdir -p ${com_ibm_watson_health_common_shared_config_dir}/certs
    keytool -exportcert \
            -keystore "${com_ibm_watson_health_common_shared_config_dir}/keystore/key.jks" \
            -storepass "${store_password}" \
            -alias 'wh-int' \
            -file "${com_ibm_watson_health_common_shared_config_dir}"/certs/wh-int.crt \
            -rfc
    if [ $? != 0 ]; then
      echo "Create certificate failed"
      return 1;
    fi
    
    if [ ! -e "${com_ibm_watson_health_common_shared_config_dir}/truststore/trust.jks" ]; then
      if [ -z "${store_password}" ]; then
        echo "Keystore parameter not provided"
        return 1;
      fi
      mkdir -p ${com_ibm_watson_health_common_shared_config_dir}/truststore
      keytool -import \
          -keystore "${com_ibm_watson_health_common_shared_config_dir}/truststore/trust.jks" \
          -storepass "${store_password}" \
          -alias 'wh-int' \
          -file "${com_ibm_watson_health_common_shared_config_dir}"/certs/wh-int.crt \
          -noprompt
      if [ $? != 0 ]; then
        echo "importing of cert into truststore failed"
        return 1;
      fi
    fi
    # add .p12 version of client key under certs dir to make service_configure.sh in images
    # pick that up vs generating its own wh-int key in Keystore
    if [ ! -e "${com_ibm_watson_health_common_shared_config_dir}/certs/keystore/wh-int.p12" ]; then
      if [ -z "${store_password}" ]; then
        echo "Keystore parameter not provided"
        return 1;
      fi
      mkdir -p ${com_ibm_watson_health_common_shared_config_dir}/certs/keystore
      keytool -importkeystore \
            -srckeystore "${com_ibm_watson_health_common_shared_config_dir}/keystore/key.jks" \
            -srcstorepass "${store_password}" \
            -srcstoretype pkcs12 \
            -alias 'wh-int' \
            -destkeystore "${com_ibm_watson_health_common_shared_config_dir}"/certs/keystore/wh-int.p12 \
            -deststorepass "${store_password}" \
            -deststoretype pkcs12 \
            -noprompt
      if [ $? != 0 ]; then
        echo "exporting cert to p12 file failed"
        return 1;
      fi
    fi
  fi
}

stop_service() {
  local service_name=$1
  local runtime_properties=$2

  if [ -z "${runtime_properties}" ] || [ ! -e "${runtime_properties}" ]; then
    echo "Runtime properties not found"
    return 1
  fi
  . ${runtime_properties}
  if [ ! -z "${com_ibm_watson_health_common_service_name}" ]; then
    container_name="${com_ibm_watson_health_common_service_name}"
  else
    container_name="${service_name}"
  fi

  container_info=$(docker container inspect ${container_name} 2>&1)
  if [[ "${container_info}" != *"No such container"* ]]; then
    echo "Stopping container ${container_name}"
    docker stop ${container_name} 1>/dev/null
    if [ $? != 0 ]; then
      echo "docker stop failed"
      return 1;
    fi
    docker wait ${container_name} 1>/dev/null
    if [ $? != 0 ]; then
      echo "docker wait failed"
      return 1;
    fi
    docker rm ${container_name} 1>/dev/null
    if [ $? != 0 ]; then
      echo "docker rm failed"
      return 1;
    fi
    echo "Stopping successful"
  fi
}

start_service() {
  local service_name=$1
  local service_version=$2
  local runtime_properties=$3

  if [ -z "${runtime_properties}" ] || [ ! -e "${runtime_properties}" ]; then
    echo "Runtime properties not found"
    return 1
  fi
  . ${runtime_properties}
  if [ ! -z "${com_ibm_watson_health_common_service_name}" ]; then
    container_name="${com_ibm_watson_health_common_service_name}"
  else
    container_name="${service_name}"
  fi

  if [ -z "${store_password}" ]; then
    sed -i'' "s#\(STORE_PWD=\).*\$#\1${store_password}#" ${micro_service_runtime_properties}
  fi

  # Generate keystore
  if [ ! -z "${com_ibm_watson_health_common_shared_config_dir}" ]; then
    generate_jks
    if [ $? != 0 ]; then
      return 1;
    fi
  fi

  echo "Starting container ${container_name}, version ${service_version}"

  # Setup shared file system
  local docker_volumes=
  if [ ! -z "${com_ibm_watson_health_common_docker_volume}" ]; then
    IFS=',' read -r -a docker_volume_array <<< "${com_ibm_watson_health_common_docker_volume}"
    for docker_volume in "${docker_volume_array[@]}"; do
      docker_volumes="${docker_volumes} -v ${docker_volume}"
    done
  fi

  # Setup user mapping
  local docker_user=
  if [ ! -z "${com_ibm_watson_health_common_docker_user}" ]; then
    docker_user="-u ${com_ibm_watson_health_common_docker_user}"
  fi

  local docker_group_add=
  if [ ! -z "${com_ibm_watson_health_common_docker_group_add}" ]; then
    docker_group_add="--group-add ${com_ibm_watson_health_common_docker_group_add}"
    # Hack for RDT until file permissions are set correctly
    if [ ${com_ibm_watson_health_common_docker_group_add} == "30000" ]; then
      docker_group_add="${docker_group_add} --group-add 31001"
    fi
  fi

  # Specify shared memory
  docker_shared_memory_size=
  if [ ! -z "${com_ibm_watson_health_common_docker_shared_memory_size}" ]; then
    docker_shared_memory_size="--shm-size=${com_ibm_watson_health_common_docker_shared_memory_size}"
  fi

  # Create bridge for service communications
  docker_networks=$(docker network ls)
  if [[ "${docker_networks}" != *"service_bridge"* ]]; then
    docker network create service_bridge
    if [ $? != 0 ]; then
      echo "docker network create service_bridge failed"
      return 1;
    fi
  fi

  docker_port_mappings=
  if [ ! -z "${com_ibm_watson_health_common_http_port}" ] && [ "${com_ibm_watson_health_common_http_port}" != "-1" ]; then
    docker_port_mappings="-p ${com_ibm_watson_health_common_http_port}:9080"
  fi
  if [ ! -z "${com_ibm_watson_health_common_https_port}" ] && [ "${com_ibm_watson_health_common_https_port}" != "-1" ]; then
    docker_port_mappings="${docker_port_mappings} -p ${com_ibm_watson_health_common_https_port}:9443"
  fi

  # Display runtime properties
  echo "runtime_properties=${runtime_properties}"

  # Always clear out any dangling images to help with storage
  docker rmi $(docker images -f "dangling=true" -q) 2>/dev/null

  # Refresh image
  image_name=us.icr.io/${registry_namespace}/${service_name}
  if [ "${pull_image}" == "refresh" ]; then
    echo "Removing old ${image_name} images"
    docker rmi $(docker images ${image_name} -q) -f > /dev/null 2>&1
  fi
  if [ "${pull_image}" != "false" ]; then
    docker pull ${image_name}:${service_version}
    if [ $? != 0 ]; then
      echo "docker pull ${image_name}:${service_version} failed"
      return 1;
    fi
  fi

  # Start container
  echo "docker run --restart always --env-file ${runtime_properties} --name ${container_name} ${docker_port_mappings} ${docker_volumes} ${docker_shared_memory_size} ${docker_user} ${docker_group_add} -t ${image_name}:${service_version} > $(hostname -s)_${container_name}.log"
  docker run --restart always \
             --env-file ${runtime_properties} \
             --name ${container_name} \
             ${docker_port_mappings} \
             ${docker_volumes} \
             ${docker_shared_memory_size} \
             ${docker_user} \
             ${docker_group_add} \
             -t ${image_name}:${service_version} \
             > $(hostname -s)_${container_name}.log &
  if [ $? != 0 ]; then
    echo "docker run --name ${container_name} failed"
    return 1;
  fi

  # Wait for container to be in running state
  retries=0
  until [ "$(docker inspect ${container_name} -f {{.State.Running}} 2>/dev/null)" == "true" ] || (( retries++ >= retries_max )); do
    sleep 1m
  done
  if [ "${retries}" -gt "${retries_max}" ]; then
    echo "Container failed to enter running state"
    return 1
  fi

  # Connect service to bridge
  docker network connect service_bridge ${container_name}
  if [ $? != 0 ]; then
    echo "docker network connect service_bridge"
    return 1;
  fi
  cur_dir=$(pwd)
  echo "Starting successful. Logs can be found in: ${cur_dir}/${container_name}.log"
}

start_or_restart_service() {
  local service_name=$1
  local service_version=$2
  local runtime_properties=$3

  stop_service "${service_name}" "${runtime_properties}"
  if [ $? != 0 ]; then
    return 1;
  fi
  start_service "${service_name}" "${service_version}" "${runtime_properties}"
  if [ $? != 0 ]; then
    return 1;
  fi
}

# Need to merge into mainline
start_or_restart_macro_service() {
  local service_name=$1
  local service_version=$2
  local macro_service_runtime_properties=$3

  . ${macro_service_runtime_properties}

  # Restart micro services
#  while IFS= read -r env_var ; do
#    env_var_name=$(echo $env_var | cut -f1 -d=)
#    if [[ ${env_var_name} == 'MICRO_SERVICE_'*'_ENABLE' ]]; then
#      micro_service_name_upper=$(echo $env_var_name | sed "s#=.*##" | sed "s#MICRO_SERVICE_##" | sed "s#_ENABLE##")
#      micro_service_name=$(echo "${micro_service_name_upper}" | perl -ne 'print lc' | tr '_' '-')
#      echo "Processing micro service ${micro_service_name}"
#      micro_service_enabled=$(echo $env_var | cut -f2- -d=)
#      echo "Micro service enabled: ${micro_service_enabled}"
#      micro_service_http_port_variable="MICRO_SERVICE_${micro_service_name_upper}_com_ibm_watson_health_common_http_port"
#      micro_service_http_port=${!micro_service_http_port_variable}
#      micro_service_https_port_variable="MICRO_SERVICE_${micro_service_name_upper}_HTTPS_PORT"
#      micro_service_https_port=${!micro_service_https_port_variable}
#      micro_service_context_root=$(echo "${micro_service_name_upper}" | perl -ne 'print lc')
#      micro_service_url="https://${micro_service_name}:9443/services/${micro_service_context_root}"
#      echo "Micro service url: ${micro_service_url}"
#      if [ "${micro_service_enabled}" == "true" ]; then
#        micro_service_runtime_properties="${macro_service_runtime_properties}_micro"
#        cp "${macro_service_runtime_properties}" "${micro_service_runtime_properties}"
#        echo "MICRO_SERVICE_${micro_service_name_upper}_URL=${micro_service_url}" >> ${macro_service_runtime_properties}
#        if [[ $UNAME == Darwin* ]]; then
#          sed -i '' "s#\(com_ibm_watson_health_common_http_port=\).*\$#\1${micro_service_http_port}#" ${micro_service_runtime_properties}
#          sed -i '' "s#\(com_ibm_watson_health_common_https_port=\).*\$#\1${micro_service_https_port}#" ${micro_service_runtime_properties}
#        else
#          sed -i'' "s#\(com_ibm_watson_health_common_http_port=\).*\$#\1${micro_service_http_port}#" ${micro_service_runtime_properties}
#          sed -i'' "s#\(com_ibm_watson_health_common_https_port=\).*\$#\1${micro_service_https_port}#" ${micro_service_runtime_properties}
#        fi
#        cat "${micro_service_runtime_properties}"
#        start_or_restart_service "${micro_service_name}" "${service_version}" "${micro_service_runtime_properties}"
#        if [ $? != 0 ]; then
#          rm -f "${micro_service_runtime_properties}"
#          return 1;
#        fi
#        rm -f "${micro_service_runtime_properties}"
#      fi
#    fi
#  done < <(set)

  # Start or restart macro service
  cat "${macro_service_runtime_properties}"
  start_or_restart_service "${service_name}" "${service_version}" "${macro_service_runtime_properties}"
  if [ $? != 0 ]; then
    return 1;
  fi
}

# Need to merge into mainline
stop_macro_service() {
  local service_name=$1
  local macro_service_runtime_properties=$2

  # Stop macro service
  stop_service "${service_name}" "${macro_service_runtime_properties}"
  if [ $? != 0 ]; then
    return 1;
  fi

  # Restart micro services
#  while IFS= read -r env_var ; do
#    env_var_name=$(echo $env_var | cut -f1 -d=)
#    if [[ ${env_var_name} == 'MICRO_SERVICE_'*'_ENABLE' ]]; then
#      micro_service_name_upper=$(echo $env_var_name | sed "s#=.*##" | sed "s#MICRO_SERVICE_##" | sed "s#_ENABLE##")
#      micro_service_name=$(echo "${micro_service_name_upper}" | perl -ne 'print lc' | tr '_' '-')
#      echo "Processing micro service ${micro_service_name}"
#      micro_service_enabled=$(echo $env_var | cut -f2- -d=)
#      echo "Micro service enabled: ${micro_service_enabled}"
#      if [ "${micro_service_enabled}" == "true" ]; then
#        stop_service "${micro_service_name}" "${micro_service_runtime_properties}"
#        if [ $? != 0 ]; then
#          return 1;
#        fi
#      fi
#    fi
#  done < <(set)
}

#########################################################################
#Parameter management
#########################################################################
#Parameter defaults
action=start
environment_properties=
image_file_list=
iam_apikey=
pull_image=false
registry_namespace=
service_properties=
service_name=
service_version="latest"

while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    -action)
      action="$2"
      echo "action=${action}"
      shift
      ;;
    -environment_properties)
      environment_properties="$2"
      echo "environment_properties=${environment_properties}"
      shift
      ;;
    -image_list)
      image_file_list="$2"
      echo "image_file_list=${image_file_list}"
      shift
      ;;
    -help|-h)
      helpRequest=true
      print_help
      exit 0
      shift
      ;;
    -iam_apikey)
      iam_apikey="$2"
      echo "iam_apikey=${iam_apikey}"
      shift
      ;;
    -pull_image)
      pull_image="$2"
      echo "pull_image=${pull_image}"
      shift
      ;;
    -registry_namespace)
      registry_namespace="$2"
      echo "registry_namespace=${registry_namespace}"
      shift
      ;;
    -service_properties)
      service_properties="$2"
      echo "service_properties=${service_properties}"
      shift
      ;;
    -service_name)
      service_name="$2"
      echo "service_name=${service_name}"
      shift
      ;;
    -service_version)
      service_version="$2"
      echo "service_version=${service_version}"
      shift
      ;;
    -store_password)
      store_password="$2"
      echo "store_password=${store_password}"
      shift
      ;;

    *)
      echo "Unknown parameter $1"
  esac
  shift
done

# Parameters checking
if [ ! -z "${environment_properties}" ] && [ ! -z "${service_properties}" ]; then
  echo "Either an environment or service must be deployed"
  exit 1;
fi

#########################################################################
#Mainline
#########################################################################
if [ ! -z "${iam_apikey}" ]; then
  docker login -u iamapikey -p "${iam_apikey}" us.icr.io
fi

if [ ! -z "${service_properties}" ]; then
  case "${action}" in
    start)
      start_or_restart_macro_service "${service_name}" "${service_version}" "${service_properties}"
      ;;
    *)
      stop_macro_service "${service_name}" "${service_properties}"
      ;;
  esac
else
  while IFS= read -r env_var ; do
    env_var_name=$(echo $env_var | cut -f1 -d=)
    if [[ ${env_var_name} == 'BUILD_NAME_'* ]]; then
      env_var_value=$(echo $env_var | cut -f2- -d=)
      env_service_name=$(echo $env_var_value | sed "s#_Service_Build##" | perl -ne 'print lc' | tr '_' '-')
      if [ -z "${service_name}" ] || [ "${env_service_name}" == "${service_name}" ]; then
        echo "Processing service: ${env_service_name}"
        env_service_version=${service_version}
        if [ ! -z "${image_file_list}" ]; then
          # echo "Processing image list file ${image_file_list}"
          match_pattern="${env_service_name}:"
          echo ${match_pattern}
          # find if we have a version to override.
          while IFS= read -r image_name ; do
            # echo "Processing image file entry: ${image_name}"
            if [[ ${image_name} == ${match_pattern}* ]]; then
              env_service_version=$(echo "${image_name}" | sed "s#${env_service_name}:##")
              echo "...with service version: ${env_service_version}"
              break
            fi
          done < ${image_file_list}
        else
          echo "NO image list file provided - using latest for all images"
        fi
        service_properties_no_extension=$(echo "${environment_properties}" | sed "s#.properties##")
        comp_name=$(echo "WHCS_${env_var_value}" | sed "s#_Build##")
        ${SERVICE_SCRIPT_DIR}/service_generate_effective_properties.sh \
           -component_name "${comp_name}" \
           -env_props "${service_properties_no_extension}" \
           -stage "runtime"
        if [ $? != 0 ]; then
          echo "Generate service properties failed."
          exit 1;
        fi
        case "${action}" in
          start)
            start_or_restart_service "${env_service_name}" "${env_service_version}" "runtime_effective.properties"
            ;;
          *)
            stop_service "${env_service_name}" "runtime_effective.properties"
            ;;
        esac
        rm -f runtime_effective.properties
      fi
    fi
  done < ${environment_properties}
fi
