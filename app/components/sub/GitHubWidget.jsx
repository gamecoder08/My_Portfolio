import { useTestStorageEngine } from '@nanostores/persistent';
import { githubProfileStore } from '../../store/github/profile';
import React, { useEffect, useState } from 'react';

const GitHubWidget = () => {
    const [profileData, setProfileData] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const profiledata = useTestStorageEngine(githubProfileStore);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await fetch("/api/github/profile");
                const data = await res.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching GitHub profile:", error);
            }
        };

        getProfile();
    }, []);

    useEffect(() => {
        const getRepoData = async () => {
            try {
                const res = await fetch("/api/github/repos");
                const data = await res.json();
                setRepoData(data);
            } catch (error) {
                console.error("Error fetching GitHub repos:", error);
            }
        };

        getRepoData();
    }, []);

    // console.log(profileData);
    console.log("repoData:", repoData);

    return (
        <div className='w-full h-full flex flex-col gap-3'>
            <div>
                <label className="font-semibold text-white text-[18px]">GitHub Profile Stats</label>
                <div className='flex flex-row gap-5 mt-2 items-center justify-between'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p>{profileData?.public_repos ?? "Loading..."}</p>
                        <p>Total Repositories</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>{profileData?.followers ?? "Loading..."}</p>
                        <p>Total Followers</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-row gap-5 mt-2 items-center justify-between'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p>{profileData?.public_repos ?? "Loading..."}</p>
                        <p>Total Repositories</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>{profileData?.followers ?? "Loading..."}</p>
                        <p>Total Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHubWidget;
