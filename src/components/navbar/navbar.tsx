import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { ActionTypes, GlobalAppContext } from "../../store";

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

export const Navbar: React.FC<IProps> = ({ children }) => {
  const theme = useTheme();
  const { state, dispatch } = useContext(GlobalAppContext);

  const handleDarkModeChange = (payload: boolean) => {
    dispatch({
      type: ActionTypes.SET_IS_DARK_MODE,
      payload,
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color={state.isDarkMode ? "transparent" : "primary"}
        elevation={0}
        sx={{
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          ...(state.isDarkMode && {
            borderBottom: `1px solid ${theme.palette.text.primary}`,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "white",
              fontWeight: "bold",
            }}
            variant="h5"
          >
            Shopping List
          </Typography>
          {/* Toggle dark mode */}
          <Typography
            color="textSecondary"
            variant="h2"
            component="p"
            sx={{ cursor: "pointer", mr: 3 }}
            onClick={() => handleDarkModeChange(!state.isDarkMode)}
          >
            {state.isDarkMode ? <>🌝</> : <>🌚</>}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};
