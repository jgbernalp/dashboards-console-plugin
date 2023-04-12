import { ErrorAlert, ErrorBoundary } from '@perses-dev/components';
import { usePanelGroup, PanelGroupId } from '@perses-dev/dashboards';
import { GridItemContent } from './GridItemContent';
import { Gallery } from '@patternfly/react-core';

export interface GridLayoutProps {
  panelGroupId: PanelGroupId;
}

/**
 * Layout component that arranges children in a Grid based on the definition.
 */
export function GridLayout(props: GridLayoutProps) {
  const { panelGroupId } = props;
  const groupDefinition = usePanelGroup(panelGroupId);

  return (
    <Gallery hasGutter minWidths={{ default: '360px' }}>
      {groupDefinition.itemLayouts.map(({ i }) => (
        <div key={i}>
          <ErrorBoundary FallbackComponent={ErrorAlert}>
            <GridItemContent
              panelGroupItemId={{ panelGroupId, panelGroupItemLayoutId: i }}
            />
          </ErrorBoundary>
        </div>
      ))}
    </Gallery>
  );
}
