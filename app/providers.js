"use client";
import { ThemeProvider } from "styled-components";
import { ThorinGlobalStyles, lightTheme } from "@ensdomains/thorin";

export function Providers({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      {children}{" "}
    </ThemeProvider>
  );
}
