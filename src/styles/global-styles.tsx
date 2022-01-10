import { GlobalStyles, useTheme } from "@mui/material";

export const GlobalStylesComponent = () => {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",

          height: "100%",
          width: "100%",
        },
        body: {
          backgroundColor: theme.palette.background.paper,
          height: "100%",
          width: "100%",
        },
        a: {
          textDecoration: "none",
        },
        "#root": {
          height: "100%",
          width: "100%",
        },
        code: {
          fontFamily: [
            "source-code-pro",
            "Menlo",
            "Monaco",
            "Consolas",
            "'Courier New'",
            "monospace",
          ].join(","),
        },
      }}
    />
  );
};
