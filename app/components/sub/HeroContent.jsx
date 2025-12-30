"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
} from "public/utils/motion";
import { Code2 } from "lucide-react";
import Image from "next/image";

const HeroContent = ({ isMobile }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center px-10 md:px-20 mt-40 w-full z-20"
        >
            <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
                <motion.div
                    variants={slideInFromTop}
                    className="Welcome-box gap-1 py-[15px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
                >
                    <Code2
                        size={16}
                        className="text-purple-400/90 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
                    />{" "}
                    <h1 className="Welcome-text text-[10px] md:text-[13px]">
                        Software Developer Engineer Portfolio
                    </h1>
                </motion.div>

                <motion.div
                    variants={slideInFromLeft(0.3)}
                    className="flex flex-col gap-6 mt-6 text-xl md:text-6xl font-bold text-white max-w-[800px] w-auto h-auto"
                >
                    <span>
                        Building
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500">
                            {" "}
                            impactful software{" "}
                        </span>
                        with precision and purpose.
                    </span>
                </motion.div>

                <motion.p
                    variants={slideInFromLeft(0.4)}
                    className="text-md md:text-lg text-gray-400 text-justify my-5 max-w-[600px]"
                >
                    I am a passionate software developer lost in the world of coding,
                    constantly seeking to create innovative solutions and bring ideas to
                    life through technology. Explore my portfolio to see how I
                    can bring value to your projects.
                </motion.p>
            </div>
            {!isMobile && (
                <motion.div
                    variants={slideInFromRight(0.5)}
                    className="w-full h-full flex justify-center items-center"
                >
                    <Image
                        src="/images/mainSkillIcons.svg"
                        alt="Work Icons"
                        layout="responsive"
                        height={650}
                        width={650}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default HeroContent;
