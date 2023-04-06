// // import { Box } from '@mui/material';
// import { LineChart, StatChart } from '@perses-dev/components';
// // import { BytesUnitOptions } from '@perses-dev/components/dist/model/units/bytes';
// // import { StatChartData } from '@perses-dev/components';
// // import { Panel as PersesPanel } from '@perses-dev/dashboards';
// // import { PanelDefinition } from '@perses-dev/core';
// import { usePlugin, PanelProps as PersesPanelProps} from '@perses-dev/plugin-system';
// import { UnknownSpec } from '@perses-dev/core';
// import { Grid, GridItem } from '@patternfly/react-core';
// import { Card, CardTitle, CardBody } from '@patternfly/react-core';
// // import { TimeSeriesChart } from '@perses-dev/panels-plugin';
// // import { Panel as PersesPanel } from '@perses-dev/dashboards'
// import { ViewDashboard } from 'src/persesComponents/ViewDashboard';
// import { dashboardSample } from './SampleData';
// import { useDatasourceApi } from './DataSourceAPI'
// import { usePanelGroupIds } from '@perses-dev/dashboards';


// export function formatMetrics(queryResult) {
//   const graphData = { timeSeries: [], xAxis: [] };
//   const xValues = new Set();
//   for (const result of queryResult) {
//     const yValues = [];
//     if ('values' in result) {
//       for (const [x, y] of result.values) {
//         xValues.add(Number(x) * 1000);
//         yValues.push(Number(y));
//       }
//       const name = getUniqueKeyForPrometheusResult(result.metric, true);
//       const lineSeries = getLineSeries(name, yValues);
//       graphData.timeSeries.push(lineSeries);
//     }
//   }
//   graphData.xAxis = Array.from(xValues).sort();
//   return graphData;
// }

// // https://echarts.apache.org/en/option.html#series-line.type
// export function getLineSeries(name, data) {
//   return {
//     type: 'line',
//     name: name,
//     data: data,
//     color: getRandomColor(name),
//     showSymbol: false,
//     symbol: 'circle',
//     sampling: 'lttb',
//     lineStyle: {
//       width: 1,
//     },
//     emphasis: {
//       lineStyle: {
//         width: 1.5,
//       },
//     },
//     markLine: {},
//   };
// }

// export function stringifyPrometheusMetricLabels(labels, removeExprWrap) {
//   const labelStrings = [];
//   Object.keys(labels)
//     .sort()
//     .forEach((labelName) => {
//       const labelValue = labels[labelName];
//       if (typeof labelValue === 'string') {
//         if (removeExprWrap) {
//           labelStrings.push(`"${labelName}":"${labelValue}"`);
//         } else {
//           labelStrings.push(`${labelName}="${labelValue}"`);
//         }
//       }
//     });
//   return `{${labelStrings.join(',')}}`;
// }

// export function getUniqueKeyForPrometheusResult(metricLabels, removeExprWrap) {
//   const metricNameKey = '__name__';
//   if (!!metricLabels) {
//     if (metricLabels.hasOwnProperty(metricNameKey)) {
//       const stringifiedLabels = stringifyPrometheusMetricLabels(
//         {
//           ...metricLabels,
//           [metricNameKey]: undefined,
//         },
//         removeExprWrap
//       );
//       if (removeExprWrap) {
//         return `${stringifiedLabels}`;
//       } else {
//         return `${metricLabels[metricNameKey]}${stringifiedLabels}`;
//       }
//     }
//     return stringifyPrometheusMetricLabels(metricLabels, removeExprWrap);
//   }
//   return '';
// }

// export function getRandomColor(identifier) {
//   let hash = 0;
//   for (let index = 0; index < identifier.length; index++) {
//     hash = identifier.charCodeAt(index) + ((hash << 5) - hash);
//   }
//   // Use HSLA to only get random "bright" colors from this
//   const color = `hsla(${~~(180 * hash)},50%,50%,0.8)`;
//   return color;
// }


// /**
//  * Panel Embed Example
//  * https://github.com/perses/perses/blob/main/ui/components/README.md
//  */

// interface PanelProps {
//   width?: number;
//   height?: number;
// }

// const mockData = [
//   {
//     metric: {
//       node: '1234567',
//       environment: 'dev',
//       type: 'example',
//     },
//     __name__: 'usage_count',
//     values: [
//       [1652788230, '1200700'],
//       [1652788245, '2033700'],
//       [1652788260, '1100344'],
//       [1652788290, '1823555'],
//       [1652788305, '2011000'],
//       [1652788410, '990988'],
//     ],
//   },
//   {
//     metric: {
//       node: 'abcdefg',
//       environment: 'staging',
//       type: 'test',
//     },
//     __name__: 'test_series',
//     values: [
//       [1652788230, '600900'],
//       [1652788245, '1011100'],
//       [1652788260, '900444'],
//       [1652788290, '823111'],
//       [1652788305, '700001'],
//       [1652788410, '622221'],
//     ],
//   },
// ];

// declare const bytesUnitKinds: readonly ["Bytes"];
// declare type BytesUnitKind = (typeof bytesUnitKinds)[number];


// export interface PanelContentProps extends PersesPanelProps<UnknownSpec> {
//   panelPluginKind: string;
// }



// function PanelContent(props: PanelContentProps) {
//   const { panelPluginKind, contentDimensions, ...others } = props;
//   const { data: plugin, isLoading } = usePlugin('Panel', 'TimeSeriesChart', { useErrorBoundary: true });
//   const PanelComponent = plugin?.PanelComponent;

//   console.log("JZtest PanelComponent: ", plugin)

//   if (isLoading) {
//     console.log("JZtest Panel Content Loading")
//   }

//   if (PanelComponent === undefined) {
//     throw new Error(`Missing PanelComponent from panel plugin for kind '${panelPluginKind}'`);
//   }

//   return <PanelComponent {...others} contentDimensions={contentDimensions} />;
// }

// const spec = {
//   query: {
//     kind: 'TimeSeriesQuery',
//     spec: {
//       plugin: {
//         kind: 'PrometheusTimeSeriesQuery',
//         spec: {
//           query: 'sum(etcd_server_has_leader{job="etcd"})',
//           series_name_format: '{{job}} {{env}} {{instance}}',
//         },
//       },
//     },
//   },
//   calculation: 'LastNumber',
//   unit: { 
//     kind: 'Decimal',  
//     decimal_places: 0
//   },
// }

// // const contentDimensions =  {
// //   height: 400,
// //   width: 600,
// // }


// const datasourceApi = useDatasourceApi();


// export function Panel({ width = 600, height = 400 }: PanelProps) {
//   const formattedData = formatMetrics(mockData);
//   const gridOverrides = {
//     top: 30,
//     bottom: 40,
//   };
//   const legendOverrides = {
//     type: 'scroll',
//     bottom: 0,
//   };
//   // const unit:BytesUnitOptions = {
//   //   kind: 'Bytes', 
//   // }
//   // const data:StatChartData = {
//   //   calculatedValue: 1
//   // }


//   const panelGroupIds = usePanelGroupIds();
//   console.log("JZtest panelGroupIds: " + panelGroupIds)



//   return (
//     <Grid hasGutter>
//       <GridItem>
//         <Card> 
//           <CardTitle> TEST HEADER 1 </CardTitle>
//           <CardBody> 
//             <LineChart data={formattedData} height={height} grid={gridOverrides} legend={legendOverrides} />
//           </CardBody>
//         </Card>
//       </GridItem>
//       <GridItem>
//         <Card>
//           <CardTitle> cheese HEADER 2 </CardTitle>
//           <CardBody> 
//             {/* <StatChart width={width} height={height} unit={unit} data={data}/>       */}
//             {/* <PanelContent 
//               panelPluginKind='TimeSeriesChart'
//               spec={spec} 
//             /> */}
//             {/* <ViewDashboard
//               dashboardResource={dashboardSample}
//               datasourceApi={datasourceApi}

//               initialVariableIsSticky={false}
//               isReadonly={true}
//             /> */}


//           </CardBody>
//         </Card>
//       </GridItem>
//     </Grid> 
//   );
// }
