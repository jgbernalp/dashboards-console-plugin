import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { PluginRegistry } from '@perses-dev/plugin-system';
import {
  ChartsThemeProvider,
  EChartsTheme,
  generateChartsTheme,
  PersesChartsTheme,
} from '@perses-dev/components';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  children: React.ReactNode;
};

const ECHARTS_THEME_OVERRIDES: EChartsTheme = {
    "version": 1,
    "themeName": "Patternfly",
    "theme": {
      "seriesCnt": "5",
      "backgroundColor": "rgba(0,0,0,0)",
      "titleColor": "#151515",
      "subtitleColor": "#aaaaaa",
      "textColorShow": false,
      "textColor": "#151515",
      "markTextColor": "#eeeeee",
      "color": [
        "#8bc1f7",
        "#519de9",
        "#0066cc",
        "#004b95",
        "#002f5d",
        "#bde2b9",
        "#7cc674",
        "#4cb140",
        "#38812f",
        "#23511e",
        "#a2d9d9",
        "#73c5c5",
        "#009596",
        "#005f60",
        "#003737",
        "#b2b0ea",
        "#8481dd",
        "#5752d1",
        "#3c3d99",
        "#2a265f",
        "#F9E0A2",
        "#F6D173",
        "#F4C145",
        "#F0AB00",
        "#C58C00",
        "#F4B678",
        "#EF9234",
        "#EC7A08",
        "#C46100",
        "#8F4700",
        "#C9190B",
        "#A30000",
        "#7D1007",
        "#470000",
        "#2C0000",
        "#F0F0F0",
        "#D2D2D2",
        "#B8BBBE",
        "#8A8D90",
        "#6A6E73"
      ],
      "borderColor": "#ccc",
      "borderWidth": 0,
      "visualMapColor": ["#5ab1ef", "#e0ffff"],
      "legendTextColor": "#151515",
      "kColor": "#d87a80",
      "kColor0": "#2ec7c9",
      "kBorderColor": "#d87a80",
      "kBorderColor0": "#2ec7c9",
      "kBorderWidth": 1,
      "lineWidth": 2,
      "symbolSize": 3,
      "symbol": "circle",
      "symbolBorderWidth": 1,
      "lineSmooth": true,
      "graphLineWidth": 1,
      "graphLineColor": "#aaaaaa",
      "mapLabelColor": "#d87a80",
      "mapLabelColorE": "rgb(100,0,0)",
      "mapBorderColor": "#eeeeee",
      "mapBorderColorE": "#444",
      "mapBorderWidth": 0.5,
      "mapBorderWidthE": 1,
      "mapAreaColor": "#dddddd",
      "mapAreaColorE": "rgba(254,153,78,1)",
      "axes": [
        {
          "type": "all",
          "name": "通用坐标轴",
          "axisLineShow": true,
          "axisLineColor": "#eeeeee",
          "axisTickShow": true,
          "axisTickColor": "#eeeeee",
          "axisLabelShow": true,
          "axisLabelColor": "#eeeeee",
          "splitLineShow": true,
          "splitLineColor": ["#aaaaaa"],
          "splitAreaShow": false,
          "splitAreaColor": ["#eeeeee"]
        },
        {
          "type": "category",
          "name": "类目坐标轴",
          "axisLineShow": false,
          "axisLineColor": "#008acd",
          "axisTickShow": true,
          "axisTickColor": "#ededed",
          "axisLabelShow": true,
          "axisLabelColor": "#151515",
          "splitLineShow": false,
          "splitLineColor": ["#eee"],
          "splitAreaShow": false,
          "splitAreaColor": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          "type": "value",
          "name": "数值坐标轴",
          "axisLineShow": true,
          "axisLineColor": "#ededed",
          "axisTickShow": true,
          "axisTickColor": "#ededed",
          "axisLabelShow": true,
          "axisLabelColor": "#151515",
          "splitLineShow": true,
          "splitLineColor": ["#ededed"],
          "splitAreaShow": false,
          "splitAreaColor": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          "type": "log",
          "name": "对数坐标轴",
          "axisLineShow": true,
          "axisLineColor": "#ededed",
          "axisTickShow": true,
          "axisTickColor": "#151515",
          "axisLabelShow": true,
          "axisLabelColor": "#151515",
          "splitLineShow": true,
          "splitLineColor": ["#ededed"],
          "splitAreaShow": true,
          "splitAreaColor": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        },
        {
          "type": "time",
          "name": "时间坐标轴",
          "axisLineShow": true,
          "axisLineColor": "#ededed",
          "axisTickShow": true,
          "axisTickColor": "#151515",
          "axisLabelShow": true,
          "axisLabelColor": "#151515",
          "splitLineShow": true,
          "splitLineColor": ["#eee"],
          "splitAreaShow": false,
          "splitAreaColor": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      ],
      "axisSeperateSetting": true,
      "toolboxColor": "#2ec7c9",
      "toolboxEmphasisColor": "#18a4a6",
      "tooltipAxisColor": "#ededed",
      "tooltipAxisWidth": "1",
      "timelineLineColor": "#008acd",
      "timelineLineWidth": 1,
      "timelineItemColor": "#008acd",
      "timelineItemColorE": "#a9334c",
      "timelineCheckColor": "#2ec7c9",
      "timelineCheckBorderColor": "#2ec7c9",
      "timelineItemBorderWidth": 1,
      "timelineControlColor": "#008acd",
      "timelineControlBorderColor": "#008acd",
      "timelineControlBorderWidth": 0.5,
      "timelineLabelColor": "#151515",
      "datazoomBackgroundColor": "rgba(47,69,84,0)",
      "datazoomDataColor": "#efefff",
      "datazoomFillColor": "rgba(182,162,222,0.2)",
      "datazoomHandleColor": "#008acd",
      "datazoomHandleWidth": "100",
      "datazoomLabelColor": "#333333"
    }
  }


export function PersesDashboardProviders({ children }: PersesDashboardProps) {
  const muiTheme = useTheme();
  // https://github.com/perses/perses/blob/main/ui/components/src/utils/theme-gen.ts
  const chartsTheme: PersesChartsTheme = useMemo(() => {
    return generateChartsTheme(muiTheme, ECHARTS_THEME_OVERRIDES);
  }, [muiTheme]);

  return (
    <ChartsThemeProvider chartsTheme={chartsTheme}>
        <PluginRegistry
          pluginLoader={bundledPluginLoader}
          defaultPluginKinds={{
            Panel: 'TimeSeriesChart',
            // Panel: 'GenerateImageCanvas',
          }}
        >
          {children}
        </PluginRegistry>
    </ChartsThemeProvider>
  );
}
