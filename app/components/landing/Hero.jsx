import React from 'react'
import HeroContent from '../sub/HeroContent'

const Hero = ({isMobile}) => {
    return (
        <div className='relative flex flex-col h-full w-full'>
            <HeroContent isMobile={isMobile} />
        </div>
    )
}

export default Hero