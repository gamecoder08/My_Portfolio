import { persistentAtom } from "@nanostores/persistent";

const EMPTY_PROFILE = {};

export const githubProfileStore = persistentAtom(
    "githubProfile",
    EMPTY_PROFILE,
    {
        encode: JSON.stringify,
        decode: (value) => {
            try {
                return JSON.parse(value);
            } catch {
                return EMPTY_PROFILE;
            }
        },
    }
);

const fetchGitHubProfile = async () => {
    try {
        const res = await fetch("/api/github/profile");
        if (!res.ok) throw new Error("GitHub fetch failed");
        const data = await res.json();
        console.log("Fetched GitHub profile:", data);

        githubProfileStore.set(data);
    } catch (err) {
        console.error("Error fetching GitHub profile:", err);
    }
};

// Fetch only once (if empty)
if (typeof window !== "undefined") {
    const current = githubProfileStore.get();
    if (!current || !current.login) {
        fetchGitHubProfile();
    }
}