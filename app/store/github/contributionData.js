import { persistentAtom } from "@nanostores/persistent";

const EXPIRATION_MS = 24 * 60 * 60 * 1000;

const EMPTY_CONTRIBUTIONS = [];

const wrapData = (data) => ({
    timestamp: Date.now(),
    value: data,
});

const unwrapContributions = (stored) => {
    try {
        const parsed = JSON.parse(stored);
        if (!parsed || !parsed.timestamp || !parsed.value) return EMPTY_CONTRIBUTIONS;
        if (Date.now() - parsed.timestamp > EXPIRATION_MS) return EMPTY_CONTRIBUTIONS;
        return parsed.value;
    } catch {
        return EMPTY_CONTRIBUTIONS;
    }
};

export const githubContributionsStore = persistentAtom(
    "githubContributions",
    EMPTY_CONTRIBUTIONS,
    {
        encode: (value) => JSON.stringify(wrapData(value)),
        decode: unwrapContributions,
    }
);

const fetchGitHubContributions = async () => {
    try {
        const res = await fetch("/api/github/contributions");
        if (!res.ok) throw new Error("GitHub contributions fetch failed");

        const data = await res.json();
        console.log("Fetched GitHub contributions:", data);

        githubContributionsStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
    }
};

if (typeof window !== "undefined") {
    const current = githubContributionsStore.get();
    if (
        !current ||
        typeof current.totalContributions !== "number" ||
        !Array.isArray(current.weeks)
    ) {
        fetchGitHubContributions();
    }
}

const EMPTY_REPOS = [];

const unwrapRepos = (stored) => {
    try {
        const parsed = JSON.parse(stored);
        if (!parsed || !parsed.timestamp || !parsed.value) return EMPTY_REPOS;
        if (Date.now() - parsed.timestamp > EXPIRATION_MS) return EMPTY_REPOS;
        return parsed.value;
    } catch {
        return EMPTY_REPOS;
    }
};

export const githubRepoStore = persistentAtom(
    "githubRepos",
    EMPTY_REPOS,
    {
        encode: (value) => JSON.stringify(wrapData(value)),
        decode: unwrapRepos,
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
    if (!current || !Array.isArray(current)) {
        fetchGitHubRepos();
    }
}
