import { ErrorBoundary } from '@perses-dev/components';
import { usePanelGroupIds } from '@perses-dev/dashboards';
import { GridLayout } from './GridLayout';
import { ErrorAlert } from '../components/ErrorAlert';

// TODO
export const EmptyDashboard = () => {
  return <h1> TODO Empty Dashboard Placeholder </h1>;
};

/**
 * Renders a Dashboard for the provided Dashboard spec.
 */
export function Dashboard() {
  const panelGroupIds = usePanelGroupIds();
  const isEmpty = !panelGroupIds.length;

  return (
    <div style={{ height: '100%' }}>
      <ErrorBoundary FallbackComponent={ErrorAlert}>
        {isEmpty && (
          <div
            style={{ height: '100%', display: 'flex', alignItems: 'center' }}
          >
            <EmptyDashboard />
          </div>
        )}
        {!isEmpty &&
          panelGroupIds.map((panelGroupId) => (
            <GridLayout key={panelGroupId} panelGroupId={panelGroupId} />
          ))}
      </ErrorBoundary>
    </div>
  );
}
