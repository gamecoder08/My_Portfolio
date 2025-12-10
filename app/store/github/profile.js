import { persistentAtom } from '@nanostores/persistent';

export const githubProfileStore = persistentAtom('githubProfile', null, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

const fetchGitHubProfile = async () => {
    try {
        const res = await fetch('/api/github/profile');
        const data = await res.json();
        githubProfileStore.set(data);
    } catch (err) {
        console.error('Error fetching GitHub profile:', err);
    }
};

// Always fetch if store is empty or null
if (!githubProfileStore.get()) {
    fetchGitHubProfile();
}
