"use client";
import { useStore } from '@nanostores/react';
import { githubProfileStore } from '../../store/github/profile';
import { githubContributionsStore } from 'public/app/store/github/contributionData';
import { githubRepoStore } from '../../store/github/repoData';
import React, { useEffect, useState } from 'react';
import { useMounted } from 'public/app/hook/useMounted';
import { useInView } from 'react-intersection-observer';

const GitHubWidget = () => {
    const repoData = useStore(githubRepoStore);
    const profileData = useStore(githubProfileStore);
    const contributionData = useStore(githubContributionsStore);

    const mounted = useMounted();

    const [repoCount, setRepoCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.5, // trigger when 50% of component is visible
        triggerOnce: true, // run only once
    });

    useEffect(() => {
        if (!profileData || !inView || hasAnimated) return;

        setHasAnimated(true);

        const targetRepo = profileData?.repositories?.totalCount ?? 0;
        const targetFollowers = profileData?.followers?.totalCount ?? 0;

        let startTime = null;
        const duration = 1000;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setRepoCount(Math.floor(progress * targetRepo));
            setFollowersCount(Math.floor(progress * targetFollowers));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [profileData, inView, hasAnimated]);

    const getColor = (count) => {
        if (count === 0) return "#060024";
        if (count <= 2) return " #9ba8e9";
        if (count <= 5) return "#4063c4";
        return "#304ea1";
    };

    if (!mounted) return null;

    return (
        <div ref={ref} className='w-full h-full flex flex-col gap-20'>
            <div>
                <label className="font-semibold text-white text-[22px]">GitHub Profile Stats</label>
                <div className='flex flex-row gap-50 mt-4 items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-3xl text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500'>
                            {repoCount}
                        </p>
                        <p>Total Repositories</p>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-3xl text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500'>
                            {followersCount}
                        </p>
                        <p>Total Followers</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="font-semibold text-white text-[22px] mb-2">
                    Total Contributions This Year: {contributionData?.totalContributions ?? 0}
                </label>
                <div className='flex flex-row justify-center gap-1 mt-2'>
                    {contributionData?.weeks?.map((week, weekIndex) => (
                        <div key={weekIndex} className='flex flex-col gap-1'>
                            {week.contributionDays.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    title={`${day.date}: ${day.contributionCount} contributions`}
                                    className='w-2 h-2 rounded-1'
                                    style={{ backgroundColor: getColor(day.contributionCount) }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <p className='mt-2 text-center italic text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500'>{`"Good Habits take time"`}</p>
            </div>
        </div>
    );
};

export default GitHubWidget;
