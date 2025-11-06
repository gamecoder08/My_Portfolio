import React from 'react'
import { FaYoutube } from 'react-icons/fa';
import {
    RxDiscordLogo,
    RxGithubLogo,
    RxLinkedinLogo,
} from 'react-icons/rx';

const Footer = () => {
    return (
        <div className='w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]'>
            <div className='w-full h-full flex flex-col items-center justify-center m-auto'>
                <div className='w-full h-full flex flex-row items-center justify-around flex-wrap'>

                    <div className='min-w-[200px] h-auto flex flex-col items-center justify-start'>
                        <div className='font-bold text-[16px]'>Community</div>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <FaYoutube />
                            <span className='text-[15px] ml-1.5'>YouTube</span>
                        </p>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <RxGithubLogo />
                            <span className='text-[15px] ml-1.5'>GitHub</span>
                        </p>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <RxDiscordLogo />
                            <span className='text-[15px] ml-1.5'>Discord</span>
                        </p>
                    </div>
                    <div className='min-w-[200px] h-auto flex flex-col items-center justify-start'>
                        <div className='font-bold text-[16px]'>About</div>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <span className='text-[15px] ml-1.5'>Become Sponsor</span>
                        </p>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <span className='text-[15px] ml-1.5'>Learning About Me</span>
                        </p>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <span className='text-[15px] ml-1.5'>gamecoder0811@gmail.com</span>
                        </p>
                    </div>
                </div>
                <div className='mb-5 text-[15px] text-center'>
                    &copy; 2025 GameCoder. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer