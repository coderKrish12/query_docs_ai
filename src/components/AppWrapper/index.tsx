"use client";

//react Imports
import { useMemo, useState } from "react";

// UI Imports
import { ThemeProvider, PaletteMode } from "@mui/material";

// Context Imports
import { ColorModeContext } from "@/appStateStore/context/ThemeContext";
import { useAppTheme } from "@/app/useAppTheme";

//UI Components Imports
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Third party Imports
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

// Redux Imports
import { Provider } from "react-redux";
import { persistor, store } from "@/appStateStore/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Navbar />
            <ProgressBar
              height="4px"
              color={theme.palette.primary.main}
              options={{ showSpinner: false }}
              shallowRouting
            />
            <main className="flex min-h-svh flex-col">{children}</main>
            <Footer />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;
