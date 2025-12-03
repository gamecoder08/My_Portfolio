"use client";
import React from "react";
import { motion } from 'framer-motion';
import Image from "next/image";
import { slideInFromLeft, slideInFromRight } from "public/utils/motion";
import Slider from "../common/Slider/Slider";

const AboutMe = () => {
    return (
        <section
            id="about-me"
            className="flex flex-col items-center py-10"
        >
            <h1 className='text-[40px] font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500 pt-10 pb-5'>
                This is Me
            </h1>
            <motion.div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-50 px-6 py-10" initial="hidden" animate="visible">
                <motion.div className="flex justify-center w-full md:w-auto" variants={slideInFromLeft(0.5)}>
                    <Image
                        src="/images/me.png"
                        alt="This is Me"
                        width={500}
                        height={500}
                        className="rounded-3xl w-full max-w-[300px] md:max-w-[600px] object-cover"
                    />
                </motion.div>

                <motion.div
                    className="flex flex-col text-justify text-white gap-5 max-w-[800px]"
                    variants={slideInFromRight(0.7)}
                >
                    <Slider>
                        <div className="text-white">
                            <label className="font-semibold pl-5">Description</label>
                            <div className="p-5">
                                <p>
                                    Hi, I’m <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500 font-semibold">Utkarsh Raj Sinha</span>, a passionate and adaptive <span className="text-cyan-400">Software Engineer</span> with a strong foundation in computer science and hands-on experience across AI, full-stack development, and modern cloud technologies.
                                </p>

                                <p>
                                    I specialize in building intelligent and visually engaging software — blending my expertise in <span className="text-purple-400">AI/ML</span> models like LSTM (RNN) and ResNet (CNN) with dynamic frontend frameworks such as <span className="text-cyan-400">React</span> and <span className="text-cyan-400">Next.js</span>. My work often bridges data-driven systems with user-centric design to create impactful and scalable solutions.
                                </p>

                                <p>
                                    With a solid grasp of <span className="text-purple-400">Data Structures and Algorithms</span>, I take pride in writing clean, efficient, and maintainable code. I’m an analytical thinker who enjoys solving complex problems and continuously improving through new technologies and challenges.
                                </p>

                                <p>
                                    I’m deeply interested in <span className="text-purple-400">AR/VR</span>, <span className="text-cyan-400">Artificial Intelligence</span>, and <span className="text-purple-400">Game Development</span> — areas where creativity meets logic. I actively work with Unity and other tools to explore how immersive experiences can redefine how users interact with software and technology.
                                </p>

                                <p>
                                    This portfolio itself is a reflection of that curiosity — built using <span className="text-purple-400">Next.js</span> and <span className="text-cyan-400">Three.js</span> to bring 3D interactivity to the web. My goal is to keep pushing boundaries, crafting applications that are not only functional but also intuitive and visually inspiring.
                                </p>
                            </div>
                        </div>

                        <div className="text-white">
                            <label className="font-semibold">Notes</label>
                            <textarea className="w-full border rounded p-2"></textarea>
                        </div>

                        <div className="text-white">
                            <label className="font-semibold">Summary</label>
                            <textarea className="w-full border rounded p-2"></textarea>
                        </div>
                    </Slider>
                </motion.div>


            </motion.div>

        </section>
    );
};

export default AboutMe;
