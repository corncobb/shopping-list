import "@fontsource/dosis";
import "@fontsource/nunito";
import { createTheme, ThemeProvider } from "@mui/material";
import React, { useReducer } from "react";
import { useRoutes } from "react-router-dom";
import { ConfirmationDialogProvider } from "src/components";
import { routes } from "./routes";
import { GlobalAppContext, initialState, reducer } from "./store";
import { GlobalStylesComponent } from "./styles";
import { Typography } from "./theme/typography";

export const App = () => {
  const routing = useRoutes(routes);
  const [state, dispatch] = useReducer(reducer, initialState);

  const theme: any = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.isDarkMode ? "dark" : "light",
          background: {
            // default: '#F4F6F8',
            // paper: state.isDarkMode ? '#212121' : '#fff'
          },
          primary: {
            // contrastText: '#ffffff',
            main: "#4D81B7",
          },
          secondary: {
            main: "#1871E8",
          },

          text: {
            // primary: '#172b4d',
            secondary: "#7D7A7A",
          },
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: state.isDarkMode ? "#212121" : "#fff",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
              text: {
                color: state.isDarkMode ? "white" : "black",
              },
            },
            defaultProps: {
              disableElevation: true,
            },
          },
          // Not sure if this is a bug but I need to put this here to enable column sizes for
          // grid items
          MuiGrid: {
            styleOverrides: {
              root: {
                maxWidth: "unset",
              },
              item: {
                maxWidth: "unset",
              },
            },
          },
        },
        typography: Typography,
      }),
    [state.isDarkMode]
  );

  return (
    <GlobalAppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <ConfirmationDialogProvider>
          <GlobalStylesComponent />
          {routing}
        </ConfirmationDialogProvider>
      </ThemeProvider>
    </GlobalAppContext.Provider>
  );
};
