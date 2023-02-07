import * as React from 'react';
import getDataSource from '../getDatasource';

const DEFAULT_PROXY_URL =
  '/api/proxy/plugin/dashboards-console-plugin/backend/proxy/cluster-prometheus-proxy/api/v1/status/config';
const DEFAULT_DATASOURCE_NAME = 'cluster-prometheus-proxy';

export default function ProxyTestPage() {
  const [response, setResponse] = React.useState<string | undefined>(undefined);
  const [endpoint, setEndpoint] = React.useState<string>(DEFAULT_PROXY_URL);
  const [datasourceName, setDatasourceName] = React.useState<string>(
    DEFAULT_DATASOURCE_NAME,
  );

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

  const handleFetchDatasource = () => {
    getDataSource(datasourceName)
      .then(async (res) => {
        setResponse(JSON.stringify(res, null, 2));
      })
      .catch((err) => {
        console.error(err);
        setResponse(String(err));
      });
  };

  return (
    <div style={{ margin: 'var(--pf-global--spacer--md)' }}>
      <div style={{ marginBottom: 'var(--pf-global--spacer--md)' }}>
        <input
          type="text"
          onChange={(e) => setEndpoint(e.target.value)}
          value={endpoint}
          style={{
            width: '100%',
            display: 'block',
          }}
        />
        <button onClick={handleFetch}>Fetch Endpoint</button>
      </div>
      <div style={{ marginBottom: 'var(--pf-global--spacer--md)' }}>
        <input
          type="text"
          onChange={(e) => setDatasourceName(e.target.value)}
          value={datasourceName}
          style={{
            width: '100%',
            display: 'block',
          }}
        />
        <button onClick={handleFetchDatasource}>Fetch Datasource</button>
      </div>
      <div>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
