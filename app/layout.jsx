import { Inter } from "next/font/google";
import "./globals.css";
import StarCanvas from "./components/landing/StarBackground";
import NavBar from "./components/landing/NavBar";
import Footer from "./components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarCanvas />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
