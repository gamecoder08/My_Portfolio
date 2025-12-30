import Image from 'next/image'
import React from 'react'

const ProjectCard = ({ data, openPop }) => {
    return (
        <div onClick={() => openPop(data)} className='relative overflow-hidden rounded-lg z-40 shadow-lg h-[400px] max-w-[500px] border border-[#2A0E61] hover:shadow-2xl hover:shadow-[#2A0E61]/40 cursor-pointer'>
            <Image
                src={data?.imageSrc[0]}
                alt={data?.title}
                width={1000}
                height={1000}
                layout="responsive"
                className='w-full max-h-[235px] object-cover'
            />

            <div className='relative p-4'>
                <h1 className='text-xl font-semibold text-white'>{data?.title}</h1>
                <p className='mt-2 text-gray-300 line-clamp-3'>{data?.description}</p>
            </div>
        </div>
    )
}

export default ProjectCard