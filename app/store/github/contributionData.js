import { persistentAtom } from "@nanostores/persistent";

const EMPTY_CONTRIBUTIONS = [];

export const githubContributionsStore = persistentAtom(
    "githubContributions",
    EMPTY_CONTRIBUTIONS,
    {
        encode: JSON.stringify,
        decode: (value) => {
            try {
                return JSON.parse(value);
            } catch {
                return EMPTY_CONTRIBUTIONS;
            }
        },
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
