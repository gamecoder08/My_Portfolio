"use client";
import { useStore } from '@nanostores/react';
import { githubProfileStore } from '../../store/github/profile';
import { githubContributionsStore } from 'public/app/store/github/contributionData';
import { githubRepoStore } from '../../store/github/repoData';
import React, { useEffect, useState } from 'react';
import { useMounted } from 'public/app/hook/useMounted';
import { useInView } from 'react-intersection-observer';

const RepoCard = ({ repo }) => {
    const commitCount =
        repo.defaultBranchRef?.target?.history?.totalCount ?? 0;

    const languages =
        repo.languages?.edges?.map(edge => ({
            name: edge.node.name,
            color: edge.node.color,
        })) ?? [];

    return (
        <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
                w-full
                max-w-sm
                p-3 sm:p-4
                rounded-xl
                bg-[#0b0b2a]
                border border-white/10
                hover:border-cyan-400
                transition
            "
        >
            <h3 className="font-semibold text-white text-sm sm:text-lg truncate">
                {repo.name}
            </h3>

            <div className="flex flex-wrap gap-3 mt-3 text-[10px] sm:text-sm text-white/80">
                <span>⭐ {repo.stargazerCount}</span>
                <span>🍴 {repo.forkCount}</span>
                <span>🧾 {commitCount} commits</span>
            </div>

            {languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 text-[10px] sm:text-xs text-white/80">
                    {languages.map(lang => (
                        <span key={lang.name} className="flex items-center gap-1">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: lang.color }}
                            />
                            {lang.name}
                        </span>
                    ))}
                </div>
            )}
        </a>
    );
};

const GitHubWidget = () => {
    const repoData = useStore(githubRepoStore);
    const profileData = useStore(githubProfileStore);
    const contributionData = useStore(githubContributionsStore);

    const mounted = useMounted();

    const [repoCount, setRepoCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const FEATURED_REPO_IDS = [
        "R_kgDOOXUenw",
        "R_kgDOLa87qw",
    ];

    const featuredRepos = Array.isArray(repoData)
        ? repoData.filter(repo => FEATURED_REPO_IDS.includes(repo.id))
        : [];

    useEffect(() => {
        const animateCounts = async () => {
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
        };

        animateCounts();
    }, [profileData, inView, hasAnimated]);

    const getColor = (count) => {
        if (count === 0) return "#060024";
        if (count <= 2) return " #9ba8e9";
        if (count <= 5) return "#4063c4";
        return "#304ea1";
    };

    if (!mounted) return null;

    return (
        <div ref={ref} className="w-full flex flex-col gap-8 px-2 sm:px-0">
            <div>
                <h2 className="font-semibold text-white text-lg sm:text-[22px]">
                    GitHub Profile Stats
                </h2>

                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                mt-6
                items-start
            ">
                    <div className="flex flex-col items-center justify-center gap-2 h-full">
                        <p className="
                        text-4xl
                        sm:text-5xl
                        text-transparent
                        bg-clip-text
                        bg-linear-to-r
                        from-purple-500
                        to-cyan-500
                    ">
                            {repoCount}
                        </p>
                        <p className="text-sm sm:text-base text-white/80">
                            Total Repositories
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-sm sm:text-base text-white/80">
                            Top Repositories
                        </p>

                        <div className="flex flex-col gap-4">
                            {featuredRepos.map(repo => (
                                <RepoCard key={repo.id} repo={repo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-white text-lg sm:text-[22px] mb-3">
                    Total Contributions This Year:{" "}
                    {contributionData?.totalContributions ?? 0}
                </h2>

                <div className="overflow-x-auto">
                    <div className="flex gap-1 min-w-max justify-center">
                        {contributionData?.weeks?.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1">
                                {week.contributionDays.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        title={`${day.date}: ${day.contributionCount} contributions`}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm"
                                        style={{ backgroundColor: getColor(day.contributionCount) }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="
                mt-3
                text-center
                italic
                text-sm
                sm:text-base
                text-transparent
                bg-clip-text
                bg-linear-to-r
                from-purple-500
                to-cyan-500
            ">
                    {"'Good habits take time'"}
                </p>
            </div>
        </div>
    );

};

export default GitHubWidget;
