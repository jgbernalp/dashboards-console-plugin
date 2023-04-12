import { ErrorBoundary, ErrorAlert } from '@perses-dev/components';
import { PanelDefinition } from '@perses-dev/core';
import { PanelContent } from './PanelContent';
import {
  Card as PFCard,
  CardTitle,
  CardBody,
  GalleryItem,
  CardHeader,
  CardActions,
} from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface PanelProps {
  definition: PanelDefinition;
}

/**
 * Renders a PanelDefinition's content inside of a Card.
 */
export function Panel(props: PanelProps) {
  const { definition } = props;

  const contentDimensions = { width: 458, height: 267 };

  // TODO: handle dashboard defintion variables (i.e. $cluster, $interval)
  const QueryBrowserLink = ({ panelSpec }) => {
    const { t } = useTranslation();
    let URLparams = '';
    const multipleQueries = panelSpec.queries;
    const singleQuery = panelSpec.query;

    if (multipleQueries) {
      multipleQueries.forEach((queryObj, i) => {
        let queryFormat = '&query';
        if (i === 0) {
          queryFormat = 'query';
        }
        URLparams =
          URLparams + queryFormat + i + '=' + queryObj.spec.plugin.spec.query;
      });
    } else if (singleQuery) {
      URLparams = URLparams + 'query0=' + singleQuery.spec.plugin.spec.query;
    } else {
      return;
    }

    return (
      <Link
        aria-label={t('public~Inspect')}
        to={`/monitoring/query-browser?${URLparams}`}
      >
        {t('public~Inspect')}
      </Link>
    );
  };

  return (
    <GalleryItem>
      <PFCard id="utilization-card-4-card" component="div">
        <CardHeader className="monitoring-dashboards__card-header">
          <CardTitle>{definition.spec.display.name}</CardTitle>
          <CardActions className="co-overview-card__actions">
            <QueryBrowserLink panelSpec={definition.spec.plugin.spec} />
          </CardActions>
        </CardHeader>
        <CardBody>
          <ErrorBoundary
            FallbackComponent={ErrorAlert}
            resetKeys={[definition.spec.plugin.spec]}
          >
            <PanelContent
              panelPluginKind={definition.spec.plugin.kind}
              spec={definition.spec.plugin.spec}
              contentDimensions={contentDimensions}
            />
          </ErrorBoundary>
        </CardBody>
      </PFCard>
    </GalleryItem>
  );
}
