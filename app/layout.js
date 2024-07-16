import "./globals.css";
import { UserProvider } from "@/src/contexts/UserContext";
import { GoogleTagManager } from "@next/third-parties/google";
import { Montserrat } from "next/font/google";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { LiveProvider } from "@/src/contexts/LiveContext";
import GoogleAnalytcsScripts from "./components/googleAnalyticsScript";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Notícias Oficina VW",
  description: "Criado por Oficina Brasil",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <LiveProvider>
        <html lang="pt" className="scroll-smooth">
          <head>
            <GoogleAnalytcsScripts />
          </head>
          <GoogleTagManager gtmId="GTM-KJT5L4J" />
          <body className={inter.className}>
            <Header />
              <main>{children}</main>
            <Footer />
          </body>
        </html>
      </LiveProvider>
    </UserProvider>
  );
}
