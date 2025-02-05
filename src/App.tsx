import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./Components/NavBar/NavBar.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { bgBG } from "@mui/x-date-pickers/locales";
import { bg } from "date-fns/locale";
import { muiTheme } from "./styles/muiTheme";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          localeText={
            bgBG.components.MuiLocalizationProvider.defaultProps.localeText
          }
          adapterLocale={bg}
        >
          <QueryClientProvider client={queryClient}>
            <NavBar />
            <main className={styles.homeContainer}>
              <Outlet />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
