import React from 'react'
import {
    RxGithubLogo,
    RxLinkedinLogo,
} from 'react-icons/rx';

const Footer = () => {
    return (
        <div className='w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]'>
            <div className='w-full h-full flex flex-col items-center justify-center m-auto'>
                <div className='w-full h-full flex flex-row items-center justify-around flex-wrap'>

                    <div className='min-w-[200px] h-auto flex flex-col items-center justify-start z-90'>
                        <div className='font-bold text-[16px]'>Community</div>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <RxGithubLogo />
                            <a href="https://www.github.com/gamecoder08" target='noopener' className='text-[15px] ml-1.5 hover:underline'>GitHub</a>
                        </p>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <RxLinkedinLogo />
                            <a href="https://www.linkedin.com/in/utkarsh-raj-sinha/" target='noopener' className='text-[15px] ml-1.5 hover:underline'>LinkedIn</a>
                        </p>
                        {/* <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <RxDiscordLogo />
                            <span className='text-[15px] ml-1.5'>Discord</span>
                        </p> */}
                    </div>
                    <div className='min-w-[200px] h-auto flex flex-col items-center justify-start z-90'>
                        <div className='font-bold text-[16px]'>Contact Me</div>
                        <p className='flex flex-row items-center my-[15px] cursor-pointer'>
                            <span className='text-[15px] ml-1.5 hover:underline'><a href="mailto:gamecoder0811@gmail.com">gamecoder0811@gmail.com</a></span>
                        </p>
                    </div>
                </div>
                <div className='mb-5 text-[15px] text-center'>
                    Thank you for visiting my portfolio website! &nbsp;|&nbsp; Built by Me © 2025
                </div>
            </div>
        </div>
    )
}

export default Footer