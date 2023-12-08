import { useState, useEffect, createContext } from "react";
import { setupENS } from "@ensdomains/ui";

export const DataContext = createContext();
DataContext.displayName = "DataProvider";

export default function DataProvider({
  children,
  isDarkTheme,
  setIsDarkTheme,
}) {
  const [ens, setENS] = useState(undefined);

  useEffect(() => {
    const { ethereum } = window;
    (async () => {
      if (!ethereum) {
        alert("Please install MetaMask");
      }

      const { ens } = await setupENS({
        customProvider: ethereum,
      });
      setENS(ens);
    })();

    return () => {
      setENS(null);
    };
  }, []);

  return (
    <DataContext.Provider value={{ isDarkTheme, setIsDarkTheme, ens }}>
      {children}
    </DataContext.Provider>
  );
}
