"use client";
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { Socials } from '../constants';

const NavBar = () => {
    const [rotation, setRotation] = useState(0);
    const intervalRef = useRef(null);

    const navigate = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const startRotation = () => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            setRotation(prev => prev + 2);
        }, 20);
    };

    const stopRotation = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };
    return (
        <div className='w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-5'>
            <div className='w-full h-full flex flex-row items-center justify-between m-auto px-2.5'>
                <a href='#about-me' className='h-auto w-auto flex flex-row items-center'>
                    <Image
                        src="/images/NavLogo.png"
                        alt="Logo"
                        width={70}
                        height={70}
                        onMouseEnter={startRotation}
                        onMouseLeave={stopRotation}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.05s linear',
                            cursor: 'pointer'
                        }}
                    />

                    <span className='font-bold ml-2.5 hidden md:block text-gray-300 cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'>
                        Portfolio
                    </span>
                </a>

                <div className='w-full md:w-[500px] h-full flex flex-row items-center justify-between md:mr-20'>
                    <div className='flex justify-between items-center w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-5 py-2.5 rounded-full text-gray-200'>
                        <a href='#about-me' className='cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'>
                            About Me
                        </a>
                        <a href='#skills' className='cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'>
                            Skills
                        </a>
                        <a href='#projects' className='cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'>
                            Projects
                        </a>
                        {/* <a href='#work-history' className='cursor-pointer'>
                            Work History
                        </a> */}
                    </div>
                </div>

                <div className='hidden md:flex flex-row gap-5'>
                    {
                        Socials.map((social) => (
                            <Image
                                src={social.src}
                                alt={social.name}
                                key={social.name}
                                onClick={() => navigate(social.link)}
                                width={24}
                                height={24}
                                className='cursor-pointer hover:opacity-70 text-white'
                                title={social.name}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar;