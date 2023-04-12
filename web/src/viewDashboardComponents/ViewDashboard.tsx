import { ErrorAlert, ErrorBoundary } from '@perses-dev/components';
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
import { DashboardApp, DashboardAppProps } from './DashboardApp';

export interface ViewDashboardProps extends DashboardAppProps {
  datasourceApi: DatasourceStoreProviderProps['datasourceApi'];
  isEditing?: boolean;
}

/**
 * The View for displaying a Dashboard, along with the UI for selecting variable values.
 */
export function ViewDashboard(props: ViewDashboardProps) {
  const {
    dashboardResource,
    datasourceApi,
    dashboardTitleComponent,
    emptyDashboard,
    onSave,
    onDiscard,
    initialVariableIsSticky,
    isReadonly,
    isEditing,
  } = props;
  const { spec } = dashboardResource;
  const dashboardDuration = spec.duration ?? '1h';
  const initialTimeRange = useInitialTimeRange(dashboardDuration);

  return (
    <DatasourceStoreProvider
      dashboardResource={dashboardResource}
      datasourceApi={datasourceApi}
    >
      <DashboardProvider
        initialState={{ dashboardResource, isEditMode: !!isEditing }}
      >
        <TimeRangeProvider
          initialTimeRange={initialTimeRange}
          enabledURLParams={true}
        >
          <TemplateVariableProvider initialVariableDefinitions={spec.variables}>
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              <DashboardApp
                dashboardResource={dashboardResource}
                dashboardTitleComponent={dashboardTitleComponent}
                emptyDashboard={emptyDashboard}
                onSave={onSave}
                onDiscard={onDiscard}
                initialVariableIsSticky={initialVariableIsSticky}
                isReadonly={isReadonly}
              />
            </ErrorBoundary>
          </TemplateVariableProvider>
        </TimeRangeProvider>
      </DashboardProvider>
    </DatasourceStoreProvider>
  );
}
