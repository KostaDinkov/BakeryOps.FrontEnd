import type { Preview } from "@storybook/react";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { muiTheme } from '../src/styles/muiTheme';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { bgBG } from "@mui/x-date-pickers/locales";
import { bg } from "date-fns/locale";
import { ThemeProvider } from "@mui/material";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [withThemeByClassName({
      themes: {
          // nameOfTheme: 'classNameForTheme',
          light: '',
          dark: 'dark',
      },
      defaultTheme: 'light',
  }),
  (Story) => (
    <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} localeText={bgBG.components.MuiLocalizationProvider.defaultProps.localeText} adapterLocale={bg}>
        <Story />
        </LocalizationProvider>
    </ThemeProvider>
)]
};

export default preview;
