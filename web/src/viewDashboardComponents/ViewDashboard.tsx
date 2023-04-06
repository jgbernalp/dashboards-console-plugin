// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { BoxProps } from '@mui/material';
import { ErrorBoundary, ErrorAlert } from '@perses-dev/components';
import { TimeRangeProvider, useInitialTimeRange } from '@perses-dev/plugin-system';
import {
  TemplateVariableProvider,
  DashboardProvider,
  DatasourceStoreProviderProps,
  DatasourceStoreProvider,
} from '@perses-dev/dashboards';
import { DashboardApp, DashboardAppProps } from './DashboardApp';


export interface ViewDashboardProps extends Omit<BoxProps, 'children'>, DashboardAppProps {
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
    <DatasourceStoreProvider dashboardResource={dashboardResource} datasourceApi={datasourceApi}>
      <DashboardProvider initialState={{ dashboardResource, isEditMode: !!isEditing }}>
        <TimeRangeProvider initialTimeRange={initialTimeRange} enabledURLParams={true}>
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
