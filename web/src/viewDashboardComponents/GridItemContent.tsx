import { PanelGroupItemId, usePanel } from '@perses-dev/dashboards';
import { Panel } from './Panel';

export interface GridItemContentProps {
  panelGroupItemId: PanelGroupItemId;
}

/**
 * Resolves the reference to panel content in a GridItemDefinition and renders the panel.
 */
export function GridItemContent(props: GridItemContentProps) {
  const { panelGroupItemId } = props;
  const panelDefinition = usePanel(panelGroupItemId);

  return <Panel definition={panelDefinition} />;
}
