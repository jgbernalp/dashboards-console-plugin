import { ErrorBoundary } from '@perses-dev/components';
import { DashboardResource } from '@perses-dev/core';
import {
  DashboardProvider,
  DatasourceStoreProvider,
  DatasourceStoreProviderProps,
  TemplateVariableProvider,
} from '@perses-dev/dashboards';
import {
  TimeRangeProvider,
  useInitialTimeRange,
} from '@perses-dev/plugin-system';
import { ErrorAlert } from '../components/ErrorAlert';
import { DashboardApp } from './DashboardApp';

export interface ViewDashboardProps {
  datasourceApi: DatasourceStoreProviderProps['datasourceApi'];
  dashboardResource: DashboardResource;
}

/**
 * The View for displaying a Dashboard, along with the UI for selecting variable values.
 */
export function ViewDashboard(props: ViewDashboardProps) {
  const { dashboardResource, datasourceApi } = props;
  const { spec } = dashboardResource;
  const dashboardDuration = spec.duration ?? '1h';
  const initialTimeRange = useInitialTimeRange(dashboardDuration);

  return (
    <DatasourceStoreProvider
      dashboardResource={dashboardResource}
      datasourceApi={datasourceApi}
    >
      <DashboardProvider
        initialState={{ dashboardResource, isEditMode: false }}
      >
        <TimeRangeProvider
          initialTimeRange={initialTimeRange}
          enabledURLParams={true}
        >
          <TemplateVariableProvider initialVariableDefinitions={spec.variables}>
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <DashboardApp />
            </ErrorBoundary>
          </TemplateVariableProvider>
        </TimeRangeProvider>
      </DashboardProvider>
    </DatasourceStoreProvider>
  );
}
