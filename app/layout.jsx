import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import StarCanvas from "./components/landing/StarBackground";
import NavBar from "./components/landing/NavBar";
import Footer from "./components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Utkarsh Raj Sinha Portfolio",
  description: "This is Utkarsh Raj Sinha's portfolio website to showcase his skills and projects.",
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarCanvas isMobile={isMobile} />
        <NavBar isMobile={isMobile} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
