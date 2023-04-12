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

import { ErrorBoundary, ErrorAlert } from '@perses-dev/components';
import { PanelDefinition } from '@perses-dev/core';
import { CardProps } from '@mui/material';
import { PanelContent } from './PanelContent';
import { Card as PFCard , CardTitle, CardBody, GalleryItem, CardHeader, CardActions } from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface PanelProps extends CardProps<'section'> {
  definition: PanelDefinition;
}

/**
 * Renders a PanelDefinition's content inside of a Card.
 */
export function Panel(props: PanelProps) {
  const { definition } = props;

  const contentDimensions = {width:458, height:267}

  // TODO: handle dashboard defintion variables (i.e. $cluster, $interval)
  const QueryBrowserLink = ({ panelSpec }) => {
    const { t } = useTranslation();
    let URLparams = "";
    const multipleQueries = panelSpec.queries
    const singleQuery = panelSpec.query

    if (multipleQueries) {
      multipleQueries.forEach((queryObj, i) => {
        let queryFormat = '&query'
        if (i === 0 ){
          queryFormat = 'query'
        }
        URLparams = URLparams + queryFormat + i + '=' + queryObj.spec.plugin.spec.query
      });
    } else if (singleQuery) {
      URLparams = URLparams + 'query0=' + singleQuery.spec.plugin.spec.query
    } else {
      return; 
    }

    return (
      <Link
        aria-label={t('public~Inspect')}
        to={
           `/monitoring/query-browser?${URLparams}`
        }
      >
        {t('public~Inspect')}
      </Link>
    );
  };

  return (
      <GalleryItem>
        <PFCard id="utilization-card-4-card" component="div">
        <CardHeader className="monitoring-dashboards__card-header">
            <CardTitle>
                {definition.spec.display.name}                
            </CardTitle>
            <CardActions className="co-overview-card__actions">
              <QueryBrowserLink panelSpec={definition.spec.plugin.spec} />
            </CardActions>
          </CardHeader>
          <CardBody>
            <ErrorBoundary FallbackComponent={ErrorAlert} resetKeys={[definition.spec.plugin.spec]}>
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
