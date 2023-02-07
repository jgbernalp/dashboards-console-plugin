package server

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	models "github.com/jgbernalp/dashboards-datasource-plugin/pkg/api"
	apiv1 "github.com/jgbernalp/dashboards-datasource-plugin/pkg/api/v1"
	proxy "github.com/jgbernalp/dashboards-datasource-plugin/pkg/proxy"
	"github.com/sirupsen/logrus"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/apimachinery/pkg/util/yaml"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

var log = logrus.WithField("module", "server")

type Config struct {
	Port           int
	CertFile       string
	PrivateKeyFile string
	StaticPath     string
}

func Start(cfg *Config) {
	// TODO: watch config maps to reload this info
	datasourcesInfo := loadDatasourcesInfo()

	muxRouter := mux.NewRouter()

	muxRouter.PathPrefix("/proxy/{datasourceName}/").HandlerFunc(proxy.CreateProxyHandler(cfg.CertFile, datasourcesInfo))
	muxRouter.HandleFunc("/api/v1/datasources/{name}", apiv1.CreateDashboardsHandler(datasourcesInfo))
	muxRouter.PathPrefix("/").Handler(http.FileServer(http.Dir(cfg.StaticPath)))

	tlsConfig := &tls.Config{
		MinVersion: tls.VersionTLS12,
	}

	server := http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Port),
		Handler:      muxRouter,
		TLSConfig:    tlsConfig,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	log.Infof("server listening on port: %d", cfg.Port)

	if cfg.CertFile != "" && cfg.PrivateKeyFile != "" {
		panic(server.ListenAndServeTLS(cfg.CertFile, cfg.PrivateKeyFile))
	} else {
		log.Warn("not using TLS")
		panic(server.ListenAndServe())
	}
}

func loadDatasourcesInfo() map[string]models.DataSource {
	datasources := make(map[string]models.DataSource)

	config, err := rest.InClusterConfig()
	if err != nil {
		log.WithError(err).Error("cannot get in cluster config")
		return datasources
	}

	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.WithError(err).Error("cannot create k8s client")
		return datasources
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	labelSelector := labels.SelectorFromSet(labels.Set{"console.openshift.io/dashboard-datasource": "true"})

	configMapList, err := client.CoreV1().ConfigMaps("console-dashboards").List(ctx, metav1.ListOptions{LabelSelector: labelSelector.String()})
	if err != nil {
		log.WithError(err).Error("cannot read config map list")
		return datasources
	}

	for _, configMap := range configMapList.Items {
		var configMapData models.DataSource
		err = yaml.Unmarshal([]byte(configMap.Data["dashboard-datasource.yaml"]), &configMapData)

		if err != nil {
			log.WithError(err).Errorf("cannot unmarshall configmap: %s", configMap.Name)
		} else {
			datasources[configMapData.Metadata.Name] = configMapData
			log.WithField("datasource-name", configMapData.Metadata.Name).Debugf("Loaded datasource: %s", configMapData.Metadata.Name)
		}
	}

	return datasources
}
