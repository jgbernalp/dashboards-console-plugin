import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import { dashboardSample } from './SampleData';
import { useDatasourceApi } from './DataSourceAPI';
import { ViewDashboard } from '../viewDashboardComponents/ViewDashboard';
import { PersesDashboardProviders } from './PersesDashboardProvider';

const queryClient = new QueryClient({
    defaultOptions: { 
        queries: { 
            refetchOnWindowFocus: false 
        } 
    }
  });

const datasourceApi = useDatasourceApi();

export default function PersesPage(){
    return (
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={WindowHistoryAdapter}>
            <PersesDashboardProviders>
                <ViewDashboard
                dashboardResource={dashboardSample}
                datasourceApi={datasourceApi}
                initialVariableIsSticky={false}
                isReadonly={true}
                />
            </PersesDashboardProviders>
        </QueryParamProvider>
      </QueryClientProvider>
    )
}