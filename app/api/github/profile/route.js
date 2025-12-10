export async function GET() {
    const username = "gamecoder08";

    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            "Accept": "application/vnd.github+json",
            "User-Agent": "Next.js app",
        },
        next: { revalidate: 60 }, // caching (optional)
    });

    if (!res.ok) {
        return Response.json(
            { error: "Failed to fetch GitHub profile" },
            { status: res.status }
        );
    }

    const data = await res.json();
    return Response.json(data);
}
