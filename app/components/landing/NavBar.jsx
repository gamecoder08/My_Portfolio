"use client";
import Image from 'next/image';
import React from 'react';
import { Socials } from '../../config';

function RocketLogo({ size = 120 }) {
    return (
        <div className="group inline-block cursor-pointer">
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible transition-transform duration-300 group-hover:-translate-y-1"
            >
                <defs>
                    <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF9A00" />
                        <stop offset="100%" stopColor="#FF2A00" />
                    </linearGradient>
                    <linearGradient id="flameMid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FF7A00" />
                    </linearGradient>
                    <linearGradient id="flameCore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g transform="rotate(60 100 100)">
                    <g
                        filter="url(#glow)"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <path
                            d="M100 150 C90 170, 110 170, 100 195 C130 165, 70 165, 100 150 Z"
                            fill="url(#flameOuter)"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="scale"
                                from="1 0.85"
                                to="1 1.15"
                                dur="0.25s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path
                            d="M100 150 C94 165, 106 165, 100 185 C120 160, 80 160, 100 150 Z"
                            fill="url(#flameMid)"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="scale"
                                from="1 0.8"
                                to="1 1.2"
                                dur="0.18s"
                                repeatCount="indefinite"
                            />
                        </path>
                        <path
                            d="M100 150 C97 160, 103 160, 100 175 C110 158, 90 158, 100 150 Z"
                            fill="url(#flameCore)"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="scale"
                                from="1 0.75"
                                to="1 1.25"
                                dur="0.12s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </g>
                    <g>
                        <path
                            d="M100 20 C70 60, 70 120, 100 150 C130 120, 130 60, 100 20Z"
                            fill="#E5E7EB"
                        />
                        <circle cx="100" cy="80" r="10" fill="#38BDF8" />
                        <path d="M70 120 L40 150 L75 145Z" fill="#94A3B8" />
                        <path d="M130 120 L160 150 L125 145Z" fill="#94A3B8" />
                    </g>
                </g>
            </svg>
        </div>
    );
}

const NavBar = ({ isMobile }) => {

    const navigate = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="w-full fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-90 px-4 sm:px-5 py-2">
            <div className="relative flex items-center justify-center w-full h-full">
                {!isMobile && (
                    <div className="absolute left-2 flex items-center mb-2 sm:mb-0">
                        <a href="#about-me" className="flex items-center">
                            <RocketLogo size={50} />
                            <span className="font-bold ml-2.5 hidden md:block text-gray-300 cursor-pointer hover:bg-linear-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent">
                                Portfolio
                            </span>
                        </a>
                    </div>
                )}

                <div className="flex items-center justify-center border border-[#7042f861] bg-[#0300145e] px-2 sm:px-5 py-2.5 rounded-full text-gray-200 gap-2 sm:gap-4">
                    <a href="#about-me" className="flex-1 text-center cursor-pointer hover:bg-linear-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent whitespace-nowrap">
                        About Me
                    </a>
                    <a href="#skills" className="flex-1 text-center cursor-pointer hover:bg-linear-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent whitespace-nowrap">
                        Skills
                    </a>
                    <a href="#projects" className="flex-1 text-center cursor-pointer hover:bg-linear-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent whitespace-nowrap">
                        Projects
                    </a>
                </div>

                {!isMobile && (
                    <div className="absolute right-2 flex items-center gap-3 sm:gap-5 mt-2 sm:mt-0">
                        {Socials.map((social) => (
                            <Image
                                key={social.name}
                                src={social.src}
                                alt={social.name}
                                width={24}
                                height={24}
                                onClick={() => navigate(social.link)}
                                className="cursor-pointer hover:opacity-70 text-white"
                                title={social.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
