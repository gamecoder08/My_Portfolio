import React, { useEffect, useRef, useState } from 'react'
import ProjectCard from '../sub/ProjectCard'
import { projectData } from 'public/app/config'
import ProjectPopup from '../sub/ProjectPopup';

const Projects = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const openPopup = (project) => {
        setSelectedProject(project);
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProject(null);
    };

    const popupRef = useRef(null);

    useEffect(() => {
        if (!isPopupOpen) return;

        // Disable scroll
        document.body.style.overflow = 'hidden';

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Cleanup
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupOpen]);

    return (
        <div id='projects' className='flex flex-col items-center justify-center py-20'>
            <h1 className='text-[40px] font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500 py-20'>
                My Projects
            </h1>
            <div className='h-full w-full flex flex-col md:flex-row items-center justify-center gap-10 px-10'>
                {projectData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        data={project}
                        openPop={() => openPopup(project)}
                    />
                ))}
            </div>
            {isPopupOpen && selectedProject && (
                <ProjectPopup
                    project={selectedProject}
                    closePopup={closePopup}
                    popUpRef={popupRef}
                />
            )}
        </div>
    )
}

export default Projects