import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { ViewDashboard } from '../viewDashboardComponents/ViewDashboard';
import { useDatasourceApi } from './DataSourceAPI';
import { PersesDashboardProviders } from './PersesDashboardProvider';
import { dashboardSample } from './SampleData';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const datasourceApi = useDatasourceApi();

export default function PersesPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider adapter={ReactRouter5Adapter}>
        <PersesDashboardProviders>
          <ViewDashboard
            dashboardResource={dashboardSample}
            datasourceApi={datasourceApi}
          />
        </PersesDashboardProviders>
      </QueryParamProvider>
    </QueryClientProvider>
  );
}
