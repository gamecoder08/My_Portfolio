import React from 'react'
import { Dev_skill, Web_skill, Softwares, Services, Skill_data } from '../constants';
import SkillDataProvider from '../sub/SkillDataProvider';
import SkillText from '../sub/SkillText';

const Skills = () => {
    return (
        <section
        id='skills'
        className='flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20'
        style={{transform: "scale(0.9)"}}
        >
            <SkillText />
            <div className='flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Web_skill.map((image, index) => (
                    <SkillDataProvider
                    key={index}
                    src={image.Image}
                    width={image.width}
                    height={image.height}
                    index={index}
                    />
                ))}
            </div>
            <div className='flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Dev_skill.map((image, index) => (
                    <SkillDataProvider
                    key={index}
                    src={image.Image}
                    width={image.width}
                    height={image.height}
                    index={index}
                    />
                ))}
            </div>
            <div className='flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Softwares.map((image, index) => (
                    <SkillDataProvider
                    key={index}
                    src={image.Image}
                    width={image.width}
                    height={image.height}
                    index={index}
                    />
                ))}
            </div>
            <div className='flex flex-row justify-around flex-wrap mt-4 gap-5 items-center'>
                {Services.map((image, index) => (
                    <SkillDataProvider
                    key={index}
                    src={image.Image}
                    width={image.width}
                    height={image.height}
                    index={index}
                    />
                ))}
            </div>
        </section>
    )
}

export default Skills;