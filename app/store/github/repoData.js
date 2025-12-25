import { persistentAtom } from "@nanostores/persistent";

const EMPTY_REPOS = {};
const CACHE_KEY = "githubRepos";
const EXPIRATION_MS = 24 * 60 * 60 * 1000;

const wrapData = (data) => ({ timestamp: Date.now(), value: data });

const unwrapRepos = (stored) => {
    try {
        const parsed = JSON.parse(stored);
        if (!parsed?.timestamp || !parsed?.value) return EMPTY_REPOS;
        if (Date.now() - parsed.timestamp > EXPIRATION_MS) return EMPTY_REPOS;
        return parsed.value;
    } catch {
        return EMPTY_REPOS;
    }
};

export const githubRepoStore = persistentAtom(
    CACHE_KEY,
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
        githubRepoStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub repos:", err);
    }
};

if (typeof window !== "undefined") {
    const current = githubRepoStore.get();
    if (!current || Object.keys(current).length === 0 || !current.timestamp || Date.now() - current.timestamp > EXPIRATION_MS) {
        fetchGitHubRepos();
    }
}
