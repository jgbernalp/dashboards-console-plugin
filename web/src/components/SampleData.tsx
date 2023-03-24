import { DashboardResource } from '@perses-dev/core';

export const dashboardSample: DashboardResource = {
  kind: 'Dashboard',
  metadata: {
    name: 'Dashboards',
    created_at: '',
    updated_at: '',
    project: '',
    version: 0,
  },
  spec: {
    datasources: {},
    duration: '30m',
    // variables: [],
    variables: [
      // { kind: 'TextVariable', spec: { name: 'dashboard', value: 'etcd' } },
      {
        kind: 'ListVariable',
        spec: {
          name: 'dashboard',
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: ["etcd"]
            }
          }
        }
      },
      {
        kind: 'ListVariable',
        spec: {
          name: 'cluster',
          plugin: {
            kind: 'StaticListVariable',
            spec: {
              values: ['etcd']
            }
          }
        }
      },
      {
        kind: 'ListVariable',
        spec: {
          name: 'interval',
          allow_all_value: false,
          allow_multiple: false,
          plugin: {
            kind: 'StaticListVariable',
            spec: { values: ['5m', '10m'] },
          },
        },
      }
    ],
    panels: {
      Panel1: {
        kind: 'Panel',
        spec: {
          display: { name: 'Up' },
          plugin: {
            kind: 'StatChart', 
            spec: {
              query: {
                kind: 'TimeSeriesQuery',
                spec: {
                  plugin: {
                    kind: 'PrometheusTimeSeriesQuery',
                    spec: {
                      query: 'sum(etcd_server_has_leader{job="etcd"})',
                      series_name_format: '{{job}} {{env}} {{instance}}',
                    },
                  },
                },
              },
              calculation: 'LastNumber',
              unit: { 
                kind: 'Decimal',  
                decimal_places: 0
              },
            },
          },
        },
      },
      Panel2: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'RPC rate',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(grpc_server_started_total{job="$cluster",grpc_type="unary"}[$interval]))',
                        series_name_format: 'RPC rate',
                      },
                    },
                  },
                },
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(grpc_server_handled_total{job="etcd",grpc_type="unary",grpc_code=~"Unknown|FailedPrecondition|ResourceExhausted|Internal|Unavailable|DataLoss|DeadlineExceeded"}[5m]))',
                        series_name_format: 'RPC failed rate',
                      },
                    },
                  },
                },
              ],
              thresholds: {
                steps: [
                  { name: 'Alert: Critical condition example', value: 0.5, color: 'yellow' },
                ],
              },
              y_axis: {
                label: 'Y Axis Label',
                unit: { kind: 'Decimal', decimal_places: 1 },
              },
            },
          },
        },
      },
      Panel3: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Active Streams',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(grpc_server_started_total{job=\"etcd\",grpc_service=\"etcdserverpb.Watch\",grpc_type=\"bidi_stream\"}) - sum(grpc_server_handled_total{job=\"etcd\",grpc_service=\"etcdserverpb.Watch\",grpc_type=\"bidi_stream\"})',
                        series_name_format: 'Watch Streams',
                      },
                    },
                  },
                },
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(grpc_server_started_total{job=\"etcd\",grpc_service=\"etcdserverpb.Lease\",grpc_type=\"bidi_stream\"}) - sum(grpc_server_handled_total{job=\"etcd\",grpc_service=\"etcdserverpb.Lease\",grpc_type=\"bidi_stream\"})',
                        series_name_format: 'Lease Streams',
                      },
                    },
                  },
                },
              ],
              visual: {
                area_opacity: 0.5,
                point_radius: 6,
                line_width: 3,
                connect_nulls: false
              },
              y_axis: {
                label: 'Y Axis Label',
                unit: { kind: 'Decimal', decimal_places: 1 },
              },
            },
          },
        },
      },
      Panel4: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'DB Size',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'etcd_mvcc_db_total_size_in_bytes{job=\"etcd\"}',
                        series_name_format: '{{instance}} DB Size',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1, 
                  abbreviate: true 
                },
              },
            },
          },
        },
      },
      Panel5: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Disk Sync Duration',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'histogram_quantile(0.99, sum(rate(etcd_disk_wal_fsync_duration_seconds_bucket{job="etcd"}[5m])) by (instance, le))',
                        series_name_format: '{{instance}} WAL fsync',
                      },
                    },
                  },
                },  
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'histogram_quantile(0.99, sum(rate(etcd_disk_backend_commit_duration_seconds_bucket{job="etcd"}[5m])) by (instance, le))',
                        series_name_format: '{{instance}} DB fsync',
                      },
                    },
                  },
                }, 
              ],
              y_axis: {
                label: 'Time',
                unit: { kind: 'Seconds', decimal_places: 3 },
              },
            },
          },
        },
      },
      Panel6: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Memory',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'process_resident_memory_bytes{job="etcd"}',
                        series_name_format: '{{instance}} Resident Memory',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1,
                  abbreviate: true,
                 },
              },
            },
          },
        },
      },
      Panel7: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Client Traffic In',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'rate(etcd_network_client_grpc_received_bytes_total{job="etcd"}[5m])',
                        series_name_format: '{{instance}} Client Traffic In',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1,
                  abbreviate: true,
                },
              },
              visual: {
                area_opacity: 0.5,
                point_radius: 6,
                line_width: 3,
                connect_nulls: false
              },
            },
          },
        },
      },
      Panel8: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Client Traffic Out',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'rate(etcd_network_client_grpc_sent_bytes_total{job="etcd"}[5m])',
                        series_name_format: '{{instance}} Client Traffic Out',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1,
                  abbreviate: true,
                 },
              },
              visual: {
                area_opacity: 0.5,
                point_radius: 6,
                line_width: 3,
                connect_nulls: false
              },
            },
          },
        },
      },
      Panel9: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Peer Traffic In',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(etcd_network_peer_received_bytes_total{job="etcd"}[5m])) by (instance)',
                        series_name_format: '{{instance}} Peer Traffic In',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1,
                  abbreviate: true,
                 },
              },
            },
          },
        },
      },
      Panel10: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Peer Traffic Out',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(etcd_network_peer_sent_bytes_total{job="etcd"}[5m])) by (instance)',
                        series_name_format: '{{instance}} Peer Traffic Out',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Bytes', 
                  decimal_places: 1,
                  abbreviate: true,
                 },
              },
            },
          },
        },
      },
      Panel11: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Raft Proposals',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(etcd_server_proposals_failed_total{job="etcd"}[5m]))',
                        series_name_format: 'Proposal Failure Rate',
                      },
                    },
                  },
                },
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(etcd_server_proposals_pending{job="etcd"})',
                        series_name_format: 'Proposal Pending Totalg',
                      },
                    },
                  },
                }, 
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(etcd_server_proposals_committed_total{job="etcd"}[5m]))',
                        series_name_format: 'Proposal Commit Rate',
                      },
                    },
                  },
                }, 
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'sum(rate(etcd_server_proposals_applied_total{job="etcd"}[5m]))',
                        series_name_format: 'Proposal Apply Rate',
                      },
                    },
                  },
                },   
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Decimal',
                  decimal_places: 0,
                 },
              },
            },
          },
        },
      },
      Panel12: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Total Leader Elections Per Day',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'changes(etcd_server_leader_changes_seen_total{job="etcd"}[1d])',
                        series_name_format: '{{instance}} Total Leader Elections Per Day',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Y Axis Label',
                unit: { 
                  kind: 'Decimal', 
                  decimal_places: 1,
                  abbreviate: true,
                 },
              },
            },
          },
        },
      },
      Panel13: {
        kind: 'Panel',
        spec: {
          display: {
            name: 'Peer round trip time',
          },
          plugin: {
            kind: 'TimeSeriesChart',
            spec: {
              legend: { position: 'bottom' },
              queries: [
                {
                  kind: 'TimeSeriesQuery',
                  spec: {
                    plugin: {
                      kind: 'PrometheusTimeSeriesQuery',
                      spec: {
                        query: 'histogram_quantile(0.99, sum by (instance, le) (rate(etcd_network_peer_round_trip_time_seconds_bucket{job="etcd"}[5m])))',
                        series_name_format: '{{instance}} Peer round trip time',
                      },
                    },
                  },
                },  
              ],
              y_axis: {
                label: 'Time',
                unit: { 
                  kind: 'Seconds', 
                  decimal_places: 3,
                 },
              },
            },
          },
        },
      }    
    },
    layouts: [
      {
        kind: 'Grid',
        spec: {
          items: [
            {
              x: 0,
              y: 0,
              width: 4,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel1',
              },
            },
            {
              x: 4,
              y: 0,
              width: 10,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel2',
              },
            },
            {
              x: 14,
              y: 0,
              width: 10,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel3',
              },
            },
            {
              x: 0,
              y: 8,
              width: 8,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel4',
              },
            },
            {
              x: 8,
              y: 8,
              width: 8,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel5',
              },
            },
            {
              x: 16,
              y: 8,
              width: 8,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel6',
              }
            },
            {
              x: 0,
              y: 16,
              width: 6,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel7',
              },
            },
            {
              x: 6,
              y: 16,
              width: 6,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel8',
              },
            },
            {
              x: 12,
              y: 16,
              width: 6,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel9',
              },
            },
            {
              x: 18,
              y: 16,
              width: 6,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel10',
              },
            },
            {
              x: 0,
              y: 24,
              width: 12,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel11',
              },
            },
            {
              x: 12,
              y: 24,
              width: 12,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel12',
              },
            },
            {
              x: 0,
              y: 32,
              width: 24,
              height: 8,
              content: {
                $ref: '#/spec/panels/Panel13',
              },
            },

    
          ],
        },
      },

    ],
  },
};
