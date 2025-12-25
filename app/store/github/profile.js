import { persistentAtom } from "@nanostores/persistent";

const EMPTY_PROFILE = {};
const CACHE_KEY = "githubProfile";
const EXPIRATION_MS = 24 * 60 * 60 * 1000;

const wrapData = (data) => ({ timestamp: Date.now(), value: data });

const unwrapData = (stored) => {
    try {
        const parsed = JSON.parse(stored);
        if (!parsed?.timestamp || !parsed?.value) return EMPTY_PROFILE;
        if (Date.now() - parsed.timestamp > EXPIRATION_MS) return EMPTY_PROFILE;
        return parsed.value;
    } catch {
        return EMPTY_PROFILE;
    }
};

export const githubProfileStore = persistentAtom(
    CACHE_KEY,
    EMPTY_PROFILE,
    {
        encode: (value) => JSON.stringify(wrapData(value)),
        decode: unwrapData,
    }
);

const fetchGitHubProfile = async () => {
    try {
        const res = await fetch("/api/github/profile");
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data = await res.json();
        githubProfileStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub profile:", err);
    }
};

if (typeof window !== "undefined") {
    const current = githubProfileStore.get();
    if (!current?.login || !current.timestamp || Date.now() - current.timestamp > EXPIRATION_MS) {
        fetchGitHubProfile();
    }
}
