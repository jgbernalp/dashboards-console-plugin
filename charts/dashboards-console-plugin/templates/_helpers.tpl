{{/*
Expand the name of the chart.
*/}}
{{- define "openshift-console-plugin.name" -}}
{{- default (default .Chart.Name .Release.Name) .Values.plugin.name | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "openshift-console-plugin.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "openshift-console-plugin.labels" -}}
helm.sh/chart: {{ include "openshift-console-plugin.chart" . }}
{{ include "openshift-console-plugin.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "openshift-console-perses.labels" -}}
helm.sh/chart: {{ include "openshift-console-plugin.chart" . }}
{{ include "openshift-console-perses.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "openshift-console-plugin.selectorLabels" -}}
app: {{ include "openshift-console-plugin.name" . }}
app.kubernetes.io/name: {{ include "openshift-console-plugin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/part-of: {{ include "openshift-console-plugin.name" . }}
{{- end }}

{{/*
Perses selector labels
*/}}
{{- define "openshift-console-perses.selectorLabels" -}}
app: {{ include "openshift-console-perses.name" . }}
app.kubernetes.io/name: {{ include "openshift-console-perses.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/part-of: {{ include "openshift-console-perses.name" . }}
{{- end }}

{{/*
Create the name secret containing the perses certificate
*/}}
{{- define "openshift-console-plugin.certificateSecret" -}}
{{ default (printf "%s-cert" (include "openshift-console-plugin.name" .)) .Values.plugin.certificateSecretName }}
{{- end }}

{{/*
Create the name secret containing the plugin certificate
*/}}
{{- define "openshift-console-perses.certificateSecret" -}}
{{ default (printf "%s-cert" (include "openshift-console-perses.name" .)) .Values.perses.certificateSecretName }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "openshift-console-plugin.serviceAccountName" -}}
{{- if .Values.plugin.serviceAccount.create }}
{{- default (include "openshift-console-plugin.name" .) .Values.plugin.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.plugin.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the patcher
*/}}
{{- define "openshift-console-plugin.patcherName" -}}
{{- printf "%s-patcher" (include "openshift-console-plugin.name" .) }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "openshift-console-plugin.patcherServiceAccountName" -}}
{{- if .Values.plugin.patcherServiceAccount.create }}
{{- default (printf "%s-patcher" (include "openshift-console-plugin.name" .)) .Values.plugin.patcherServiceAccount.name }}
{{- else }}
{{- default "default" .Values.plugin.patcherServiceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the configmap reader
*/}}
{{- define "openshift-console-plugin.configMapReaderName" -}}
{{- printf "%s-configmap-reader" (include "openshift-console-plugin.name" .) }}
{{- end }}

{{/*
Create the name for perses
*/}}
{{- define "openshift-console-perses.name" -}}
{{- default (default .Chart.Name .Release.Name) .Values.perses.name | trunc 63 | trimSuffix "-" }}
{{- end }}
