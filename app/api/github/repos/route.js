export async function GET() {
    const username = "gamecoder08";

    const query = `
    query ($login: String!) {
      user(login: $login) {
        repositories(
          first: 20
          orderBy: { field: UPDATED_AT, direction: DESC }
          ownerAffiliations: OWNER
        ) {
          nodes {
            id
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            updatedAt
          }
        }
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
        return Response.json({ error: "Failed to fetch repos" }, { status: 500 });
    }

    const json = await res.json();
    return Response.json(json.data.user.repositories.nodes);
}
