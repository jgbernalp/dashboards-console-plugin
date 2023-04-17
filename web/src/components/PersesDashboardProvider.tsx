import {
  ChartsThemeProvider,
  EChartsTheme,
  PersesChartsTheme,
} from '@perses-dev/components';
import { PluginRegistry } from '@perses-dev/plugin-system';
import React from 'react';
import { bundledPluginLoader } from './PersesPluginRegistry';

type PersesDashboardProps = {
  children: React.ReactNode;
};

const echartsTheme: EChartsTheme = {
  version: 1,
  themeName: 'Patternfly',
  color: [
    '#8bc1f7',
    '#519de9',
    '#0066cc',
    '#004b95',
    '#002f5d',
    '#bde2b9',
    '#7cc674',
    '#4cb140',
    '#38812f',
    '#23511e',
    '#a2d9d9',
    '#73c5c5',
    '#009596',
    '#005f60',
    '#003737',
    '#b2b0ea',
    '#8481dd',
    '#5752d1',
    '#3c3d99',
    '#2a265f',
    '#F9E0A2',
    '#F6D173',
    '#F4C145',
    '#F0AB00',
    '#C58C00',
    '#F4B678',
    '#EF9234',
    '#EC7A08',
    '#C46100',
    '#8F4700',
    '#C9190B',
    '#A30000',
    '#7D1007',
    '#470000',
    '#2C0000',
    '#F0F0F0',
    '#D2D2D2',
    '#B8BBBE',
    '#8A8D90',
    '#6A6E73',
  ],
};

export function PersesDashboardProviders({ children }: PersesDashboardProps) {
  const chartsTheme: PersesChartsTheme = {
    container: {
      padding: {
        default: 0,
      },
    },
    echartsTheme: echartsTheme,
    noDataOption: {},
    sparkline: {
      width: 1,
      color: '#000000',
    },
    thresholds: {
      defaultColor: '#000000',
      palette: [],
    },
  };

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
