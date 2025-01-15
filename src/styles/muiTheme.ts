import { createTheme } from "@mui/material"
import { getCssVariable } from "../system/utils";

export const muiTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#1f5464",
      },
      secondary: {
        main: "#ffb300",
      },
      background: {
        default: "#e1e2e1",
        paper: "#f5f5f6",
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