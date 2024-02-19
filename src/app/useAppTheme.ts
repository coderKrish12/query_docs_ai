// UI Imports
import { createTheme, PaletteMode } from "@mui/material";
import { useMemo } from "react";

export const COLORS = {
  PRIMARY_COLOR: "#5259F6",
  GREY_COLOR: "#D8D8D8",
  WHITE_COLOR: "#FFFFFF",
  LIGHT_GREY: "#F9FAFB",
  DEEP_GREY: "#212121",
  MEDIUM_GREY: "#323232",
};

export const useAppTheme = ({ mode }: { mode: PaletteMode }) => {
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: COLORS.PRIMARY_COLOR,
            },
            background: {
              default: COLORS.WHITE_COLOR,
              paper: COLORS.LIGHT_GREY,
            },
            text: {
              primary: "#000000",
              secondary: COLORS.GREY_COLOR,
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: COLORS.PRIMARY_COLOR,
            },
            background: {
              default: COLORS.DEEP_GREY,
              paper: COLORS.MEDIUM_GREY,
            },
            text: {
              primary: "#ffffff",
              secondary: COLORS.GREY_COLOR,
            },
          }),
    },
  });
  let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  theme = createTheme(theme, {
    typography: {
      allVariants: {
        fontFamily: "inherit",
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              backgroundColor: `${theme.palette.primary.main}!important`,
              color: "white!important",
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              backgroundColor: "white!important",
              color: `${theme.palette.primary.main}!important`,
              borderWidth: "2px",
              borderColor: `${theme.palette.primary.main}!important`,
            },
          },
        ],
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            width: "100%",
            color: "black",
            backgroundColor: COLORS.WHITE_COLOR,
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "6px",
              border: `2px solid ${theme.palette.text.secondary}`,
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid black`,
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: "#D0CACA",
            minHeight: "1.5px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "8px!important",
            },
            "& input::placeholder": {
              color: "black",
              fontSize: "0.85rem",
              fontWeight: 500,
            },
          },
        },
      },
    },
  });
  return { theme };
};
