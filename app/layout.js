import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "ENS Identity Search",
  description: "Search for Web3 Identities by ENS name or Ethereum address",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
