import "./globals.css";
import { UserProvider } from "@/src/contexts/UserContext";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Header from "./ui/header";
import Footer from "./ui/footer";
import { LiveProvider } from "@/src/contexts/LiveContext";
import GoogleAnalytcsScripts from "./components/googleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notícias Oficina VW",
  description: "Criado pela Oficina Brasil",
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
