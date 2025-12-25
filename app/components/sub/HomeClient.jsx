"use client";

import AboutMe from "../landing/AboutMe";
import Hero from "../landing/Hero";
import Projects from "../landing/Projects";
import Skills from "../landing/Skills";

const HomeClient = ({isMobile}) => {
    return (
        <div className="flex flex-col gap-20">
            <Hero isMobile={isMobile} />
            <AboutMe />
            <Skills />
            <Projects isMobile={isMobile} />
        </div>
    )
}

export default HomeClient;