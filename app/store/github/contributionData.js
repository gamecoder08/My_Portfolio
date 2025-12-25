import { persistentAtom } from "@nanostores/persistent";

const EMPTY_CONTRIBUTIONS = [];
const CACHE_KEY = "githubContributions";
const EXPIRATION_MS = 24 * 60 * 60 * 1000;

const wrapData = (data) => ({ timestamp: Date.now(), value: data });

const unwrapContributions = (stored) => {
    try {
        const parsed = JSON.parse(stored);
        if (!parsed?.timestamp || !parsed?.value) return EMPTY_CONTRIBUTIONS;
        if (Date.now() - parsed.timestamp > EXPIRATION_MS) return EMPTY_CONTRIBUTIONS;
        return parsed.value;
    } catch {
        return EMPTY_CONTRIBUTIONS;
    }
};

export const githubContributionsStore = persistentAtom(
    CACHE_KEY,
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
        githubContributionsStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
    }
};

if (typeof window !== "undefined") {
    const current = githubContributionsStore.get();
    if (!current || !Array.isArray(current) || !current.timestamp || Date.now() - current.timestamp > EXPIRATION_MS) {
        fetchGitHubContributions();
    }
}
