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
          throw new Error("Please install Metamask wallet");
        }

        const { ens } = await setupENS({
          customProvider: ethereum,
        });
        setENS(ens);
      } catch (error) {
        const message = error?.message
          ?.toLowerCase()
          .includes("unsupported network")
          ? "Please switch to the Ethereum Mainnet network"
          : error?.message;
        alert(message);
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
