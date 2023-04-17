import {
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardTitle,
} from '@patternfly/react-core';
import { ErrorBoundary } from '@perses-dev/components';
import { PanelDefinition } from '@perses-dev/core';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { PanelContent } from './PanelContent';

export interface PanelProps {
  definition: PanelDefinition;
}

// TODO: handle dashboard defintion variables (i.e. $cluster, $interval)
const QueryBrowserLink = ({ panelSpec }: { panelSpec: any }) => {
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

/**
 * Renders a PanelDefinition's content inside of a Card.
 */
export function Panel(props: PanelProps) {
  const { definition } = props;
  const { ref, inView } = useInView({
    threshold: 0.5,
    initialInView: false,
    triggerOnce: true,
  });

  const contentDimensions = { width: 300, height: 267 };

  return (
    <div ref={ref} style={{ height: '100%' }}>
      <Card isFullHeight>
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
            {inView && (
              <PanelContent
                panelPluginKind={definition.spec.plugin.kind}
                spec={definition.spec.plugin.spec}
                contentDimensions={contentDimensions}
              />
            )}
          </ErrorBoundary>
        </CardBody>
      </Card>
    </div>
  );
}
