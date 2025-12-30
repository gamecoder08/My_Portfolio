import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import StarCanvas from "./components/landing/StarBackground";
import NavBar from "./components/landing/NavBar";
import Footer from "./components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://utkarsh-raj-portfolio.vercel.app"),

  title: {
    default: "Utkarsh Raj Sinha | Software Developer Engineer",
    template: "%s | Utkarsh Raj Sinha",
  },
  description:
    "Utkarsh Raj Sinha is a Software Developer Engineer specializing in React, Next.js, TypeScript, Python, and modern web technologies. Explore projects, skills, and experience.",
  keywords: [
    "Utkarsh Raj Sinha",
    "Software Developer Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Utkarsh Raj Sinha" }],
  creator: "Utkarsh Raj Sinha",

  openGraph: {
    title: "Utkarsh Raj Sinha | Software Developer Engineer",
    description:
      "Portfolio of Utkarsh Raj Sinha — Software Developer Engineer showcasing projects, skills, and experience.",
    url: "https://utkarsh-raj-portfolio.vercel.app/",
    siteName: "Utkarsh Raj Sinha Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utkarsh Raj Sinha Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Raj Sinha | Software Developer Engineer",
    description:
      "Portfolio of Utkarsh Raj Sinha showcasing projects, skills, and technical expertise.",
  },
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
