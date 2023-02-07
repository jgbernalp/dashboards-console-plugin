const BACKEND_API = '/api/proxy/plugin/dashboards-console-plugin/backend';

async function getDataSource(datasourceName: string) {
  const datasource = await fetch(
    `${BACKEND_API}/api/v1/datasources/${datasourceName}`,
  );

  try {
    const jsonData = await datasource.json();

    const basePath = `/api/proxy/plugin/dashboards-console-plugin/backend/proxy/${datasourceName}`;
    const dataSourceType = jsonData?.spec?.plugin?.kind;

    return { basePath, dataSourceType };
  } catch (err) {
    console.error(err);
  }

  return null;
}

export default getDataSource;
