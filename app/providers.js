"use client";
import { useState } from "react";
import { ApolloProvider } from "./lib/provider";
import DataProvider from "./context/data";
import { ThemeProvider } from "styled-components";
import { ThorinGlobalStyles, lightTheme, darkTheme } from "@ensdomains/thorin";

export function Providers({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const useTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ApolloProvider>
      <DataProvider isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}>
        <ThemeProvider theme={useTheme}>
          <ThorinGlobalStyles />
          {children}
        </ThemeProvider>
      </DataProvider>
    </ApolloProvider>
  );
}
