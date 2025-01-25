import { createTheme } from "@mui/material"
import { getCssVariable } from "../system/utils";

export const muiTheme = createTheme({
  cssVariables:true,
    palette: {
    mode: 'light',
    primary: {
      main: '#1f5464',
    },
    secondary: {
      main: '#ffb300',
    },
    error: {
      main: '#d8361d',
    },
    warning: {
      main: '#f57c00',
    },
    background: {
      default: '#e1e2e1',
      paper: '#f5f5f6',
    },
    info: {
      main: '#538098',
    },

    },
    mixins: {
      MuiDataGrid: {
        // Pinned columns sections
        pinnedBackground: getCssVariable('--color-dataGrid-pinned'),
        // Headers, and top & bottom fixed rows
        //containerBackground: '#343434',
      },
    },
  });