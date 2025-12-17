"use client";
import Hero from "./components/landing/Hero";
import Skills from "./components/landing/Skills";
import Projects from "./components/landing/Projects";
import AboutMe from "./components/landing/AboutMe";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
      </div>
    </main>
  );
}
