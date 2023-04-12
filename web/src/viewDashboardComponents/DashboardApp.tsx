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

import { ErrorAlert, ErrorBoundary } from '@perses-dev/components';
import { DashboardResource } from '@perses-dev/core';
import { Dashboard, DashboardProps} from './Dashboard';
import { IntervalRefreshDropDown } from './dashboardHeader/IntervalRefreshDropDown';
import { TimeRangeDropDown } from './dashboardHeader/TimeRangeDropDown';
import { DashboardsDropDown } from './dashboardHeader/DashboardsDropDown';
import { ClusterDropDown } from './dashboardHeader/ClusterDropDown';


export interface DashboardAppProps extends Pick<DashboardProps, 'emptyDashboard'> {
  dashboardResource: DashboardResource;
  dashboardTitleComponent?: JSX.Element;

  onSave?: (entity: DashboardResource) => Promise<DashboardResource>;
  onDiscard?: (entity: DashboardResource) => void;
  initialVariableIsSticky?: boolean;
  isReadonly: boolean;
}

export const DashboardApp = (props) => {
  const { emptyDashboard } = props;

  return (
    <div>
      <div className="co-m-nav-title co-m-nav-title--detail">
        <div className="monitoring-dashboards__header">
              <h1 className="co-m-pane__heading">
                  Dashboards 
              </h1>
            <div className="monitoring-dashboards__options">
                <div className="form-group monitoring-dashboards__dropdown-wrap">
                  <label htmlFor="monitoring-time-range-dropdown" className="monitoring-dashboards__dropdown-title">
                    Time Range
                  </label>
                  <TimeRangeDropDown />
                </div>
                <div className="form-group monitoring-dashboards__dropdown-wrap">
                  <label htmlFor="refresh-interval-dropdown" className="monitoring-dashboards__dropdown-title">
                    Refresh interval
                  </label>
                  <IntervalRefreshDropDown />
                </div>
              </div>
          </div>
          <div className="monitoring-dashboards__variables">
            <div className="monitoring-dashboards__dropdowns">
                <div className="form-group monitoring-dashboards__dropdown-wrap">
                  <label htmlFor="dashboards-dropdown" className="monitoring-dashboards__dropdown-title">
                        Dashboards
                  </label>
                  <DashboardsDropDown/>
                </div>
                <div className="form-group monitoring-dashboards__dropdown-wrap">
                  <label htmlFor="dashboards-variable-dropdown" className="monitoring-dashboards__dropdown-title">
                        Cluster
                  </label>
                  <ClusterDropDown/>
                </div>
              </div>
          </div>
        </div>
        <div className="co-dashboard-body">
          <ErrorBoundary FallbackComponent={ErrorAlert}>
            <Dashboard emptyDashboard={emptyDashboard}/>
          </ErrorBoundary>
        </div>
      </div>
  );
};
