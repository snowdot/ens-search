import { createContext } from "react";

export const DataContext = createContext();
DataContext.displayName = "DataProvider";

export default function DataProvider({
  children,
  isDarkTheme,
  setIsDarkTheme,
}) {
  return (
    <DataContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </DataContext.Provider>
  );
}
