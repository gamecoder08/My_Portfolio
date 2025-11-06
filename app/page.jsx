import Image from "next/image";
import Hero from "./components/landing/Hero";
import Skills from "./components/landing/Skills";
import Projects from "./components/landing/Projects";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Projects />
      </div>
    </main>
  );
}
