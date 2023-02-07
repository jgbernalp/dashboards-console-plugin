#!/usr/bin/env bash

set -euo pipefail

PREFER_PODMAN=0
PUSH=0
TAG="dev"
REGISTRY_ORG="gbernal"

while getopts ":pto:" flag; do
    case $flag in
        p) PREFER_PODMAN=1;;
        t) TAG=$OPTARG;;
        o) REGISTRY_ORG=$OPTARG;;
        \?) echo "Invalid option: -$flag" 
            exit;;
    esac
done

if [[ -x "$(command -v podman)" && $PREFER_PODMAN == 1 ]]; then
    OCI_BIN="podman"
else
    OCI_BIN="docker"
fi

BASE_IMAGE="quay.io/${REGISTRY_ORG}/dashboards-console-plugin"
IMAGE=${BASE_IMAGE}:${TAG}

echo "Building image '${IMAGE}' with ${OCI_BIN}"
$OCI_BIN build -t $IMAGE .
