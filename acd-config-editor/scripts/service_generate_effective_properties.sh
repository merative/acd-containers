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
BASE_DIR="$(cd "$(dirname "$0")"/../..; pwd -P)"
BASE_SCRIPT_DIR="$(cd "$(dirname "$0")"/..; pwd -P)"
SCRIPT_NAME="$(basename "$0")"
UNAME="$(uname -s)"
echo "####################"
echo "Executing $SCRIPT_NAME"

#########################################################################
#Common functions
#########################################################################

#########################################################################
#Parameter management
#########################################################################
#Parameter defaults
endpoint=s3.us-south.cloud-object-storage.appdomain.cloud
secret_dir=
service_name=
staging_dir=.

while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    -component_name)
      component_name="$2"
      echo "component_name=${component_name}"
      shift
      ;;
    -cos_access_id_builds)
      cos_access_id_builds="$2"
      echo "cos_access_id_builds=${cos_access_id_builds}"
      shift
      ;;
    -cos_access_secret_builds)
      cos_access_secret_builds="$2"
      shift
      ;;
    -encryption_enabled)
      encryption_enabled="$2"
      shift
      ;;
    -endpoint)
      endpoint="$2"
      echo "endpoint=${endpoint}"
      shift
      ;;
    -env_group)
      env_group="$2"
      echo "env_group=${env_group}"
      shift
      ;;
    -env_props)
      env_props="$2"
      echo "env_props=${env_props}"
      shift
      ;;
    -secret_dir)
      secret_dir="$2"
      echo "secret_dir=${secret_dir}"
      shift
      ;;
    -service_name)
      service_name="$2"
      echo "service_name=${service_name}"
      shift
      ;;
    -stage)
      stage="$2"
      echo "stage=${stage}"
      stage_upper=$(echo "${stage}" | perl -ne 'print uc')
      shift
      ;;
    -staging_dir)
      staging_dir="$2"
      echo "staging_dir=${staging_dir}"
      shift
      ;;
    *)
      echo "Unknown parameter $1"
  esac
  shift
done

#Required parameters
if [ -z "${service_name}" ]; then
  service_name=$(echo "${component_name}" | perl -p -e 's/WHCS_//g' | perl -p -e 's/_Service//g' | perl -ne 'print lc' | sed "s#_#-#g")
fi
if [ -z "${env_props}" ]; then
  echo "Missing required parameter env_props"
  exit 1
fi
if [ -z "${stage}" ]; then
  echo "Missing required parameter stage"
  exit 1
fi
if [ "${stage}" != "install" ] && [ "${stage}" != "runtime" ]; then
  echo "Invalid parameter stage"
  exit 1
fi

#########################################################################
#Mainline
#########################################################################
set +o errexit

if [ ! -z "${secret_dir}" ]; then
  cos_access_id_builds_encrypted=$(cat ${secret_dir}/whcs_devops_cos/username)
  if [ $? != 0 ]; then
    echo "Retrieve local build id failed"
    exit 1
  fi
  if [ ! -z "${encryption_enabled}" ] && [ "${encryption_enabled}" == "true" ]; then
        cos_access_id_builds=$(java -cp ${BASE_DIR}/whcs-devops-ucd/tools/service-encryption.jar com.ibm.watson.health.services.Encryption -d ${cos_access_id_builds_encrypted})
    if [ $? != 0 ]; then
      echo "Decrypting local build id failed"
      exit 1
    fi
  else
        cos_access_id_builds=${cos_access_id_builds_encrypted}
  fi
  echo "cos_access_id_builds: ${cos_access_id_builds}"

  cos_access_secret_builds_encrypted=$(cat ${secret_dir}/whcs_devops_cos/password)
  if [ $? != 0 ]; then
    echo "Retrieve local build secret failed"
    exit 1
  fi
  if [ ! -z "${encryption_enabled}" ] && [ "${encryption_enabled}" == "true" ]; then
        cos_access_secret_builds=$(java -cp ${BASE_DIR}/whcs-devops-ucd/tools/service-encryption.jar com.ibm.watson.health.services.Encryption -d ${cos_access_secret_builds_encrypted})
    if [ $? != 0 ]; then
      echo "Decrypting local build secret failed"
      exit 1
    fi
  else
        cos_access_secret_builds=${cos_access_secret_builds_encrypted}
  fi
fi

# Retrieve environment properties, unless it's a micro service without properties (concept disambiguation stack)
if [ -e "${staging_dir}/${env_props}.properties" ]; then
  echo "Env props found in staging directory"
elif [ -e "${env_props}" ]; then
  echo "Retrieving env props from specified location"
  echo "rsync -r -L -verbose ${env_props} ${staging_dir}"
  rsync -r -L -verbose ${env_props} ${staging_dir}
  RC=$?
  if [ $RC != 0 ]; then
    echo "rsync failed with rc=$RC"
    exit 1
  fi
else
  echo "Retrieving env props from COS"
  if [ -e "${staging_dir}/${env_props}" ]; then
    echo "Env props already existed locally, skipping COS"
  else
    bucket="ibm.wh.whcs.environments"
    object_dir="env_groups/${env_group}"
    object="${env_props}.properties"
    ${BASE_SCRIPT_DIR}/cos/cos_get.sh -accessKey "${cos_access_id_builds}" \
        -accessSecret "${cos_access_secret_builds}" \
        -bucket "${bucket}" \
        -encryption_enabled "${encryption_enabled}" \
        -endpoint ${endpoint} \
        -object "${object_dir}/${object}" \
        -secret_dir "${secret_dir}"
    if [ $? != 0 ]; then
      echo "Primary artifact download failed."
      exit 1;
    fi
    mv -f ${bucket}/${object_dir}/${object} ${staging_dir}
    rm -rf ${bucket}
  fi
fi

# Generate ${stage} properties
object="${staging_dir}/${env_props}.properties"
# Source env props to get modifiers for later (Must be done prior to service props)
. ${object}
if [ $? != 0 ]; then
  echo "${object} not found"
  exit 1
fi

service_name_suffix=`echo ${service_name} | sed "s#-#_#g" | perl -ne 'print uc'`

override_prop_array_orig=$(perl -pe 's/\\\n//' ${object} | grep OVERRIDE_${stage_upper}_PROPERTIES_${service_name_suffix} | perl -pe "s/OVERRIDE_${stage_upper}_PROPERTIES_${service_name_suffix}=//" | tr ';' '\n')
echo "$override_prop_array_orig"
> ${staging_dir}/service_${stage}.properties
partial_value=""
for array_value in ${override_prop_array_orig[@]}; do
  if [[ "${array_value}" == *"=\""* ]] && [[ "${array_value}" != *"\"" ]]; then
    partial_value="${array_value}"
  elif [ -z "${partial_value}" ]; then
    echo "${array_value}" >> ${staging_dir}/service_${stage}.properties
  elif [[ "${array_value}" == *"\"" ]]; then
    echo "${partial_value}\;${array_value}" >> ${staging_dir}/service_${stage}.properties
    partial_value=""
  else
    partial_value+="\;${array_value}"
  fi
done
echo "==================================================="
echo "====== Start of service_${stage}.properties ========"
cat ${staging_dir}/service_${stage}.properties
echo "====== End of service_${stage}.properties =========="
echo "==================================================="

override_prop_array_orig=$(perl -pe 's/\\\n//' ${object} | grep ENV_OVERRIDE_${stage_upper}_PROPERTIES | perl -pe "s/ENV_OVERRIDE_${stage_upper}_PROPERTIES=//" | tr ';' '\n')
echo "$override_prop_array_orig"
> ${staging_dir}/environment_${stage}.properties
partial_value=""
for array_value in ${override_prop_array_orig[@]}; do
  if [[ "${array_value}" == *"=\""* ]] && [[ "${array_value}" != *"\"" ]]; then
    partial_value="${array_value}"
  elif [ -z "${partial_value}" ]; then
    echo "${array_value}" >> ${staging_dir}/environment_${stage}.properties
  elif [[ "${array_value}" == *"\"" ]]; then
    echo "${partial_value}\;${array_value}" >> ${staging_dir}/environment_${stage}.properties
    partial_value=""
  else
    partial_value+="\;${array_value}"
  fi
done
echo "==================================================="
echo "====== Start of environment_${stage}.properties ===="
cat ${staging_dir}/environment_${stage}.properties
echo "====== End of environment_${stage}.properties ======"
echo "==================================================="

awk -F= '!a[$1]++' ${staging_dir}/service_${stage}.properties ${staging_dir}/environment_${stage}.properties > ${staging_dir}/${stage}_effective.properties
#rm -f ${staging_dir}/service_${stage}.properties
#rm -f ${staging_dir}/environment_${stage}.properties

#Source ${stage} and environment properties
. ${staging_dir}/${stage}_effective.properties
if [ $? != 0 ]; then
  echo "${staging_dir}/${stage}_effective.properties not found"
  exit 1
fi

if [ "${stage}" == "runtime" ]; then
  context_root=$(echo "services/${service_name}" | sed "s#-#_#g")
  service_name_install=${service_name}
  if [ ! -z "$ENV_NAME_MODIFIER" ] ; then
    service_name=${service_name}-${ENV_NAME_MODIFIER}
    context_root=${context_root}_${ENV_NAME_MODIFIER}
  fi
  echo "Setting com_ibm_watson_health_common_service_name_install to ${service_name_install} in ${stage}_effective.properties"
  echo "com_ibm_watson_health_common_service_name_install=${service_name_install}" >> ${staging_dir}/${stage}_effective.properties
  echo "Setting com_ibm_watson_health_common_service_name to ${service_name} in ${stage}_effective.properties"
  echo "com_ibm_watson_health_common_service_name=${service_name}" >> ${staging_dir}/${stage}_effective.properties
  echo "Setting com_ibm_watson_health_common_context_root to ${context_root} in ${stage}_effective.properties"
  echo "com_ibm_watson_health_common_context_root=${context_root}" >> ${staging_dir}/${stage}_effective.properties

# Disable this temporarily
  # if [ -z "${com_ibm_watson_health_common_javax_net_debug}" ]; then
  #     echo "Setting com_ibm_watson_health_common_javax_net_debug to none"
  #     echo "com_ibm_watson_health_common_javax_net_debug=none" >> ${staging_dir}/${stage}_effective.properties
  # fi
  
  if [ ! -z "$ENV_PORT_MODIFIER" ] ; then
    if [ "$com_ibm_watson_health_common_http_port" != "-1" ]; then
      propertyValueHttp=$((com_ibm_watson_health_common_http_port + ENV_PORT_MODIFIER))
      echo "updating com_ibm_watson_health_common_http_port to ${propertyValueHttp} in ${stage}_effective.properties"
    fi
    if [ "$com_ibm_watson_health_common_https_port" != "-1" ]; then
      propertyValueHttps=$((com_ibm_watson_health_common_https_port + ENV_PORT_MODIFIER))
      echo "updating com_ibm_watson_health_common_https_port to ${propertyValueHttps} in ${stage}_effective.properties"
    fi
    if [[ $UNAME == Darwin* ]]; then
      sed -i '' "s#\(com_ibm_watson_health_common_http_port=\).*\$#\1${propertyValueHttp}#" ${staging_dir}/${stage}_effective.properties
      sed -i '' "s#\(com_ibm_watson_health_common_https_port=\).*\$#\1${propertyValueHttps}#" ${staging_dir}/${stage}_effective.properties
    else
      sed -i'' "s#\(com_ibm_watson_health_common_http_port=\).*\$#\1${propertyValueHttp}#" ${staging_dir}/${stage}_effective.properties
      sed -i'' "s#\(com_ibm_watson_health_common_https_port=\).*\$#\1${propertyValueHttps}#" ${staging_dir}/${stage}_effective.properties
    fi
  fi
fi

echo "==================================================="
echo "====== Start of ${stage}_effective.properties ======"
cat ${staging_dir}/${stage}_effective.properties
echo "====== End of ${stage}_effective.properties ========"
echo "==================================================="
