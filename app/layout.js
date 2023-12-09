import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://ens-identity.vercel.app/"),
  title: "ENS Identity Search",
  description: "ENS Identity Search is a festive, user-friendly tool that reveals your comprehensive Web3 identity, connecting your ENS profile with other digital identities",
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
