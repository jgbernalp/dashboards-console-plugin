import { Grid, GridItem, gridSpans } from '@patternfly/react-core';
import { ErrorBoundary } from '@perses-dev/components';
import { PanelGroupId, usePanelGroup } from '@perses-dev/dashboards';
import { ErrorAlert } from '../components/ErrorAlert';
import { GridItemContent } from './GridItemContent';

export interface GridLayoutProps {
  panelGroupId: PanelGroupId;
}

const toGridSpans = (span: number): gridSpans => {
  if (span >= 1 && span <= 12) {
    return span as gridSpans;
  }

  return 1;
};

/**
 * Layout component that arranges children in a Grid based on the definition.
 */
export function GridLayout(props: GridLayoutProps) {
  const { panelGroupId } = props;
  const groupDefinition = usePanelGroup(panelGroupId);

  return (
    <Grid hasGutter>
      {groupDefinition.itemLayouts.map(({ i, w, h }) => (
        <ErrorBoundary key={i} FallbackComponent={ErrorAlert}>
          <GridItem
            key={`grid-${i}`}
            span={toGridSpans(w)}
            rowSpan={toGridSpans(h)}
          >
            <GridItemContent
              panelGroupItemId={{ panelGroupId, panelGroupItemLayoutId: i }}
            />
          </GridItem>
        </ErrorBoundary>
      ))}
    </Grid>
  );
}
