import "./globals.css";
import { UserProvider } from "@/src/contexts/UserContext";
import { Inter } from "next/font/google";
import Header from "./ui/header";
import Footer from "./ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notícias Oficina VW",
  description: "Criado pela Oficina Brasil",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="pt" className="scroll-smooth">
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </UserProvider>
  );
}