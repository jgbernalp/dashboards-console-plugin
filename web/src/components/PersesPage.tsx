import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import { dashboardSample } from './SampleData';
import { useDatasourceApi } from './DataSourceAPI';
import { ViewDashboard } from '@perses-dev/dashboards';
import { PersesDashboardProviders } from './PersesDashboardProvider';
import { Box, createTheme, ThemeProvider } from '@mui/material';

const queryClient = new QueryClient({
    defaultOptions: { 
        queries: { 
            refetchOnWindowFocus: false 
        } 
    }
  });

const datasourceApi = useDatasourceApi();

// This MUI theme overrides Perses MUI styling. 
const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '10px',
            size: 'small'
          },
          outlined: {
            color: 'black', 
            borderColor: 'black',
          }
        },
      },
      MuiTypography: {
        styleOverrides: {
            h2: {
                fontSize: '24px',
                fontFamily: 'sans-serif',
                fontWeight: '400',
                justifyContent: 'space-between'
            },
        },
      }
    },
  });

export default function PersesPage(){
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <QueryParamProvider adapter={WindowHistoryAdapter}>
                    <Box>
                        <PersesDashboardProviders>
                            <ViewDashboard
                            dashboardResource={dashboardSample}
                            datasourceApi={datasourceApi}
                            initialVariableIsSticky={false}
                            isReadonly={true}
                            />
                        </PersesDashboardProviders>
                    </Box>
                </QueryParamProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}