# Dashboards Dynamic Plugin for OpenShift Console

This plugin adds custom datasources for openshift dashboards. It requires OpenShift 4.10+

## Development

[Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and [go](https://go.dev/) are required
to build and run the plugin. To run OpenShift console in a container, either
[Docker](https://www.docker.com) or [podman 3.2.0+](https://podman.io) and
[oc](https://console.redhat.com/openshift/downloads) are required.

### Running locally

1. Install the dependencies running `make install`
2. Start the backend `make start-backend`
3. In a different terminal start the frontend `make start-frontend`
4. In a different terminal start the console
   a. `oc login` (requires [oc](https://console.redhat.com/openshift/downloads) and an [OpenShift cluster](https://console.redhat.com/openshift/create))
   b. `make start-console` (requires [Docker](https://www.docker.com) or [podman 3.2.0+](https://podman.io))

This will run the OpenShift console in a container connected to the cluster you've logged into. The plugin backend server
runs on port 9002 with CORS enabled.

Navigate to <http://localhost:9000> to see the running plugin.

## Deployment on cluster

You can deploy the plugin to a cluster by running the helm chart at `charts/dashboards-console-plugin`.
It will use the image from `quay.io/gbernal/dashboards-console-plugin:0.0.1` and run a go HTTP server
to serve the plugin's assets and proxy to the configured datasources.

```sh
helm upgrade -i  dashboards-console-plugin charts/dashboards-console-plugin -n console-dashboards --create-namespace
```

## Build a testing the image

```sh
make build-image
```
