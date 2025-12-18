import React, { useState } from 'react'
import Slider from '../common/Slider/Slider'
import Image from 'next/image'
import { RxGithubLogo } from 'react-icons/rx';

const ProjectPopup = ({ closePopup, popUpRef, project }) => {
    const [autoPlay, setAutoPlay] = useState(true);

    return (
        <div className="fixed inset-0 bg-black/20 text-white flex items-center justify-center z-100">
            <div
                ref={popUpRef}
                className={`bg-[#05051fb1]/20 backdrop-blur-md rounded-lg p-10 md:p-5 w-full max-w-[90%] md:max-w-[1000px] md:max-h-[800px] overflow-scroll transition-all duration-200 ease-in-out `}
            >
                <div className="flex justify-between items-center mb-2 md:mb-5">
                    <h3 className="text-[18px] font-semibold">Project Details</h3>
                    <button
                        onClick={closePopup}
                        className="text-gray-200 hover:text-gray-500 text-20 md:text-16"
                    >
                        ✕
                    </button>
                </div>

                <div className='py-2'>
                    <label className="flex items-end justify-end cursor-pointer mb-5 z-90">
                        <input
                            type="checkbox"
                            checked={autoPlay}
                            onChange={() => setAutoPlay(!autoPlay)}
                            className="sr-only peer"
                        />
                        <div className="relative w-9 h-5 bg-neutral-quaternary outline-2 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                        <span className="select-none ms-3 text-sm font-medium text-heading">
                            Autoplay
                        </span>
                    </label>
                    <Slider autoPlay={autoPlay}>
                        {project?.imageSrc.map((src, index) => (
                            <Image key={index} src={src} alt={`${project?.title} - ${index + 1}`} width={920} height={450} className="rounded-lg max-h-[430px] border border-[#2A0E61]" />
                        ))}
                    </Slider>
                </div>
                <div>
                    <div className='flex flex-row justify-between items-center mt-6'>
                        <h1 className="text-2xl font-bold">{project?.title}</h1>
                        <a href={project?.link} target="_blank" rel="noopener noreferrer">
                            <div className='flex flex-row items-center gap-2'>
                                <p className="text-blue-400 hover:text-blue-600">View in GitHub</p>
                                <RxGithubLogo />
                            </div>
                        </a>
                    </div>
                    <p className="mt-4 text-gray-300">{project?.description}</p>
                </div>
            </div>
        </div>

    )
}

export default ProjectPopup