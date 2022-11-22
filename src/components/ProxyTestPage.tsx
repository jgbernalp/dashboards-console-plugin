import * as React from 'react';

const DEFAULT_PROXY_URL =
  '/api/proxy/plugin/dashboards-datasource-plugin/backend/namespaces/openshift-kube-apiserver/pods?limit=250&cluster=local-cluster';

export default function ProxyTestPage() {
  const [response, setResponse] = React.useState<string | undefined>(undefined);
  const [endpoint, setEndpoint] = React.useState<string>(DEFAULT_PROXY_URL);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  const handleFetch = () => {
    fetch(endpoint)
      .then(async (res) => {
        console.log(res);

        if (res.ok) {
          const jsonResponse = await res.json();
          setResponse(JSON.stringify(jsonResponse, null, 2));
        } else {
          throw new Error('Invalid response');
        }
      })
      .catch((err) => {
        console.error(err);
        setResponse(String(err));
      });
  };

  return (
    <div style={{ margin: 'var(--pf-global--spacer--md)' }}>
      <input
        type="text"
        onChange={handleEndpointChange}
        value={endpoint}
        style={{
          width: '100%',
          display: 'block',
          marginBottom: 'var(--pf-global--spacer--md)',
        }}
      />
      <button onClick={handleFetch}>Fetch</button>
      <div>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
