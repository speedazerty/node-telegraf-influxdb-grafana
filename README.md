# node-telegraf-influxdb-grafana
 
# kubernetes

    env:
    - name: POD_NAME
      valueFrom:
        fieldRef:
          fieldPath: metadata.name
    - name: POD_NAMESPACE
      valueFrom:
        fieldRef:
          fieldPath: metadata.namespace
    - name: POD_IP
      valueFrom:
        fieldRef:
          fieldPath: status.podIP

    lifecycle:
    - postStart:
        exec:
            command:
                0: node
                1: build/index.js
    - preStop:
        httpGet:
            path: /healthCheck

# Grafana

{
  "id": 1,
  "title": "New dashboard",
  "tags": [],
  "style": "dark",
  "timezone": "browser",
  "editable": true,
  "hideControls": false,
  "sharedCrosshair": true,
  "rows": [
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "influxdb",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)",
            "thresholdLine": true
          },
          "id": 1,
          "isNew": true,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": true,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "groupBy": [
                {
                  "params": [
                    "$interval"
                  ],
                  "type": "time"
                },
                {
                  "type": "fill",
                  "params": [
                    "none"
                  ]
                }
              ],
              "measurement": "request",
              "policy": "autogen",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "type": "field",
                    "params": [
                      "value"
                    ]
                  },
                  {
                    "type": "sum",
                    "params": []
                  }
                ]
              ],
              "tags": [
                {
                  "key": "podIp",
                  "operator": "=~",
                  "value": "/^$podIp$/"
                }
              ]
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Requests",
          "tooltip": {
            "msResolution": true,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "xaxis": {
            "show": true
          },
          "yaxes": [
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ],
          "links": [],
          "transparent": false
        }
      ],
      "title": "Row"
    },
    {
      "collapse": false,
      "editable": true,
      "height": "250px",
      "panels": [
        {
          "aliasColors": {},
          "bars": false,
          "datasource": "influxdb",
          "editable": true,
          "error": false,
          "fill": 1,
          "grid": {
            "threshold1": null,
            "threshold1Color": "rgba(216, 200, 27, 0.27)",
            "threshold2": null,
            "threshold2Color": "rgba(234, 112, 112, 0.22)"
          },
          "id": 2,
          "isNew": true,
          "legend": {
            "avg": false,
            "current": false,
            "max": false,
            "min": false,
            "show": true,
            "total": false,
            "values": false
          },
          "lines": true,
          "linewidth": 2,
          "links": [],
          "nullPointMode": "connected",
          "percentage": false,
          "pointradius": 5,
          "points": false,
          "renderer": "flot",
          "seriesOverrides": [],
          "span": 12,
          "stack": true,
          "steppedLine": false,
          "targets": [
            {
              "dsType": "influxdb",
              "groupBy": [
                {
                  "params": [
                    "$interval"
                  ],
                  "type": "time"
                },
                {
                  "params": [
                    "null"
                  ],
                  "type": "fill"
                }
              ],
              "measurement": "latency",
              "policy": "autogen",
              "refId": "A",
              "resultFormat": "time_series",
              "select": [
                [
                  {
                    "params": [
                      "mean"
                    ],
                    "type": "field"
                  },
                  {
                    "params": [],
                    "type": "median"
                  }
                ]
              ],
              "tags": [
                {
                  "key": "metric_type",
                  "operator": "=",
                  "value": "timing"
                }
              ]
            }
          ],
          "timeFrom": null,
          "timeShift": null,
          "title": "Latency",
          "tooltip": {
            "msResolution": true,
            "shared": true,
            "sort": 0,
            "value_type": "cumulative"
          },
          "type": "graph",
          "xaxis": {
            "show": true
          },
          "yaxes": [
            {
              "format": "ms",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": 0,
              "show": true
            },
            {
              "format": "short",
              "label": null,
              "logBase": 1,
              "max": null,
              "min": null,
              "show": true
            }
          ]
        }
      ],
      "title": "New row"
    }
  ],
  "time": {
    "from": "now-15m",
    "to": "now"
  },
  "timepicker": {
    "refresh_intervals": [
      "1s",
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ]
  },
  "templating": {
    "list": [
      {
        "type": "query",
        "datasource": "influxdb",
        "refresh": 0,
        "name": "podIp",
        "hide": 0,
        "options": [
          {
            "text": "All",
            "value": "$__all",
            "selected": true
          },
          {
            "text": "172.17.0.4",
            "value": "172.17.0.4",
            "selected": false
          },
          {
            "text": "172.17.0.8",
            "value": "172.17.0.8",
            "selected": false
          },
          {
            "text": "172.17.0.9",
            "value": "172.17.0.9",
            "selected": false
          }
        ],
        "includeAll": true,
        "multi": true,
        "query": "SHOW TAG VALUES FROM \"request\" WITH KEY = \"podIp\"",
        "current": {
          "text": "All",
          "value": [
            "$__all"
          ],
          "tags": []
        },
        "label": "Pod IP"
      },
      {
        "type": "query",
        "datasource": "influxdb",
        "refresh": 0,
        "name": "podName",
        "hide": 0,
        "options": [
          {
            "text": "All",
            "value": "$__all",
            "selected": true
          },
          {
            "text": "node-test-bh0yj",
            "value": "node-test-bh0yj",
            "selected": false
          },
          {
            "text": "node-test-e1je1",
            "value": "node-test-e1je1",
            "selected": false
          },
          {
            "text": "undefined",
            "value": "undefined",
            "selected": false
          }
        ],
        "includeAll": true,
        "multi": true,
        "label": "Pod Name",
        "query": "SHOW TAG VALUES FROM \"request\" WITH KEY = \"podName\"",
        "current": {
          "text": "All",
          "value": [
            "$__all"
          ],
          "tags": []
        }
      }
    ]
  },
  "annotations": {
    "list": [
      {
        "name": "New container",
        "datasource": "influxdb",
        "iconColor": "rgba(255, 96, 96, 1)",
        "enable": true,
        "query": "select * from up where $timeFilter",
        "titleColumn": "host",
        "textColumn": "host"
      }
    ]
  },
  "refresh": "1s",
  "schemaVersion": 12,
  "version": 10,
  "links": [],
  "gnetId": null
}