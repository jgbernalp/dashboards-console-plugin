package proxy

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"

	"github.com/gorilla/mux"
	models "github.com/jgbernalp/dashboards-datasource-plugin/pkg/api"
	oscrypto "github.com/openshift/library-go/pkg/crypto"
	"github.com/sirupsen/logrus"
)

var log = logrus.WithField("module", "proxy")

// These headers aren't things that proxies should pass along. Some are forbidden by http2.
// This fixes the bug where Chrome users saw a ERR_SPDY_PROTOCOL_ERROR for all proxied requests.
func FilterHeaders(r *http.Response) error {
	badHeaders := []string{
		"Connection",
		"Keep-Alive",
		"Proxy-Connection",
		"Transfer-Encoding",
		"Upgrade",
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Methods",
		"Access-Control-Allow-Origin",
		"Access-Control-Expose-Headers",
	}
	for _, h := range badHeaders {
		r.Header.Del(h)
	}
	return nil
}

func CreateProxyHandler(serviceCAfile string, datasourcesInfo map[string]models.DataSource) func(http.ResponseWriter, *http.Request) {
	datasourceProxies := make(map[string]*httputil.ReverseProxy)

	// TODO: allow custom CA per datasource
	serviceCertPEM, err := os.ReadFile(serviceCAfile)
	if err != nil {
		log.Fatalf("failed to read %s file: %v", serviceCAfile, err)
	}
	serviceProxyRootCAs := x509.NewCertPool()
	if !serviceProxyRootCAs.AppendCertsFromPEM(serviceCertPEM) {
		log.Fatal("no CA found for Kubernetes services")
	}
	serviceProxyTLSConfig := oscrypto.SecureTLSConfig(&tls.Config{
		RootCAs: serviceProxyRootCAs,
	})

	transport := &http.Transport{
		Proxy: http.ProxyFromEnvironment,
		Dial: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
		}).Dial,
		TLSClientConfig:     serviceProxyTLSConfig,
		TLSHandshakeTimeout: 10 * time.Second,
	}

	for name, datasource := range datasourcesInfo {
		targetURL := fmt.Sprintf("https://%s.%s.svc.cluster.local:%d", datasource.Spec.Plugin.Spec.Service.Name, datasource.Spec.Plugin.Spec.Service.Namespace, datasource.Spec.Plugin.Spec.Service.Port)
		proxyURL, err := url.Parse(targetURL)

		if err != nil {
			log.WithError(err).Errorf("cannot parse service URL", targetURL)
		} else {
			reverseProxy := httputil.NewSingleHostReverseProxy(proxyURL)
			reverseProxy.FlushInterval = time.Millisecond * 100
			reverseProxy.Transport = transport
			reverseProxy.ModifyResponse = FilterHeaders
			datasourceProxies[name] = reverseProxy
		}
	}

	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		datasourceName := vars["datasourceName"]

		if len(datasourceName) == 0 {
			log.Errorf("cannot proxy request, datasource name was not provided")
			http.Error(w, "datasource name was not provided", http.StatusBadRequest)
			return
		}

		datasourceProxy, ok := datasourceProxies[datasourceName]

		if !ok || datasourceProxy == nil {
			log.Errorf("cannot proxy request, datasource not found: %s", datasourceName)
			http.Error(w, "datasource not found", http.StatusNotFound)
			return
		}

		http.StripPrefix(fmt.Sprintf("/proxy/%s", datasourceName), http.HandlerFunc(datasourceProxy.ServeHTTP)).ServeHTTP(w, r)
	}
}
