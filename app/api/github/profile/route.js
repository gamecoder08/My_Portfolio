export async function GET() {
    const username = "gamecoder08";

    const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        name
        avatarUrl
        bio
        followers { totalCount }
        following { totalCount }
        repositories {
          totalCount
        }
        url
      }
    }
  `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables: { login: username },
        }),
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        return Response.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    const json = await res.json();
    return Response.json(json.data.user);
}
