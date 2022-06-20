#!/bin/bash
# Licensed Materials - Property of IBM
#
# Copyright IBM Corp. 2012, 2019 All Rights Reserved.
#
# US Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.

#########################################################################
#Global vars
#########################################################################
SCRIPT_NAME="$(basename "$0")"
echo "####################"
echo "Executing $SCRIPT_NAME"

./tests/run-test.sh "ivttest" "MVT"
exit $?
