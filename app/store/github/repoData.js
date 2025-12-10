import { persistentAtom } from '@nanostores/persistent';

export const githubProfileStore = persistentAtom('githubRepo', null, {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export const fetchGitHubProfile = async () => {
    a
    try {
        const res = await fetch('/api/github/repos');
        const data = await res.json();
        githubProfileStore.set(data);
    } catch (err) {
        console.error('Error fetching GitHub repo:', err);
    }
};

if (!githubProfileStore.get()) {
    fetchGitHubProfile();
}
