"use client";
// UI Imports
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import Navbar from "@/components/Navbar";
import { ColorModeContext } from "@/store/context/ThemeContext";
import { useMemo, useState } from "react";
import { deepmerge } from "@mui/utils";
import { useAppTheme } from "@/app/useAppTheme";
import Footer from "../Footer";

function AppWrapper({ children }: ChildrenProps) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      mode: mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    [mode]
  );
  const { theme } = useAppTheme({ mode: mode });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <main className="flex min-h-svh flex-col">{children}</main>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AppWrapper;
