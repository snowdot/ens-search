import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Web3 Identity Search",
  description: "Search for Web3 Identities",
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
