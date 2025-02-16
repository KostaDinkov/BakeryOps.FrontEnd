import type { Preview } from "@storybook/react";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { muiTheme } from '../src/styles/muiTheme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { bgBG } from "@mui/x-date-pickers/locales";
import { bg } from "date-fns/locale";
import { ThemeProvider } from "@mui/material";
import {withConsole} from '@storybook/addon-console';
import {NotificationsProvider} from "@toolpad/core/useNotifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/styles/vars.css"

const queryClient = new QueryClient();
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light', // this sets the default background
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'app', value: '#e1e2e1' },
      ],
    },
  },
  decorators: [
    (Story,context)=> withConsole()(Story)(context),

  (Story) => (
    <NotificationsProvider>
            <ThemeProvider theme={muiTheme}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                localeText={
                  bgBG.components.MuiLocalizationProvider.defaultProps.localeText
                }
                adapterLocale={bg}
              >
                <QueryClientProvider client={queryClient}>
                  <Story/>
                </QueryClientProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </NotificationsProvider>
)]
};

export default preview;
