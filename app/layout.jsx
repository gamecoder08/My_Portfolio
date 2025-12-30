import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import StarCanvas from "./components/landing/StarBackground";
import NavBar from "./components/landing/NavBar";
import Footer from "./components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Utkarsh Raj Sinha | Software Developer Engineer",
    template: "%s | Utkarsh Raj Sinha",
  },
  description:
    "Utkarsh Raj Sinha is a Software Developer Engineer specializing in React, Next.js, TypeScript, Python, and cloud technologies. Explore projects, skills, and experience.",
  keywords: [
    "Utkarsh Raj Sinha",
    "Software Developer Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Utkarsh Raj Sinha" }],
  creator: "Utkarsh Raj Sinha",
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
