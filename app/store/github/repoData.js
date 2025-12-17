import { persistentAtom } from "@nanostores/persistent";

const EMPTY_REPOS = {};

export const githubRepoStore = persistentAtom(
    "githubRepos",
    EMPTY_REPOS,
    {
        encode: JSON.stringify,
        decode: (value) => {
            try {
                return JSON.parse(value);
            } catch {
                return EMPTY_REPOS;
            }
        },
    }
);

const fetchGitHubRepos = async () => {
    try {
        const res = await fetch("/api/github/repos");
        if (!res.ok) throw new Error("GitHub repos fetch failed");

        const data = await res.json();
        console.log("Fetched GitHub repos:", data);

        githubRepoStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub repos:", err);
    }
};

if (typeof window !== "undefined") {
    const current = githubRepoStore.get();
    if (!Array.isArray(current) || current.length === 0) {
        fetchGitHubRepos();
    }
}
