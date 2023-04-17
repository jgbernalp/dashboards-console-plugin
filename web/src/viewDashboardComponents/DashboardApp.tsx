import { ErrorBoundary } from '@perses-dev/components';
import { ErrorAlert } from '../components/ErrorAlert';
import { Dashboard } from './Dashboard';
import { ClusterDropDown } from './dashboardHeader/ClusterDropDown';
import { DashboardsDropDown } from './dashboardHeader/DashboardsDropDown';
import { IntervalRefreshDropDown } from './dashboardHeader/IntervalRefreshDropDown';
import { TimeRangeDropDown } from './dashboardHeader/TimeRangeDropDown';

export const DashboardApp = () => {
  return (
    <div>
      <div className="co-m-nav-title co-m-nav-title--detail">
        <div className="monitoring-dashboards__header">
          <h1 className="co-m-pane__heading">Dashboards</h1>
          <div className="monitoring-dashboards__options">
            <div className="form-group monitoring-dashboards__dropdown-wrap">
              <label
                htmlFor="monitoring-time-range-dropdown"
                className="monitoring-dashboards__dropdown-title"
              >
                Time Range
              </label>
              <TimeRangeDropDown />
            </div>
            <div className="form-group monitoring-dashboards__dropdown-wrap">
              <label
                htmlFor="refresh-interval-dropdown"
                className="monitoring-dashboards__dropdown-title"
              >
                Refresh interval
              </label>
              <IntervalRefreshDropDown />
            </div>
          </div>
        </div>
        <div className="monitoring-dashboards__variables">
          <div className="monitoring-dashboards__dropdowns">
            <div className="form-group monitoring-dashboards__dropdown-wrap">
              <label
                htmlFor="dashboards-dropdown"
                className="monitoring-dashboards__dropdown-title"
              >
                Dashboards
              </label>
              <DashboardsDropDown />
            </div>
            <div className="form-group monitoring-dashboards__dropdown-wrap">
              <label
                htmlFor="dashboards-variable-dropdown"
                className="monitoring-dashboards__dropdown-title"
              >
                Cluster
              </label>
              <ClusterDropDown />
            </div>
          </div>
        </div>
      </div>
      <div className="co-dashboard-body">
        <ErrorBoundary FallbackComponent={ErrorAlert}>
          <Dashboard />
        </ErrorBoundary>
      </div>
    </div>
  );
};
