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
      try {
        if (!ethereum) {
          throw new Error("No ethereum provider");
        }

        const { ens } = await setupENS({
          customProvider: ethereum,
        });
        setENS(ens);
      } catch (error) {
        alert(error.message);
      }
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
