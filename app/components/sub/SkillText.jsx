"use client";
import React from 'react'
import { motion } from 'framer-motion';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from 'public/utils/motion';
import { SparklesIcon } from '@heroicons/react/24/solid';

const SkillText = () => {
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            
            <motion.div
            variants={slideInFromLeft(0.5)}
            className='text-[30px] text-white font-medium mt-2.5 mb-[15px]  text-center'
            >
                Making apps with Modern Technologies
            </motion.div>
            <motion.div
            variants={slideInFromRight(0.5)}
            className='cursive text-[20px] text-gray-200 mb-10 mt-2.5 text-center'
            >
                Each <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500 font-semibold">SKILL</span>; A step closer to achieving dreams.
            </motion.div>
        </div>
    )
}

export default SkillText