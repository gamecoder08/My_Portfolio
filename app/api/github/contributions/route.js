export async function GET() {
  const username = "gamecoder08";

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
        repositories(first: 50, ownerAffiliations: OWNER, isFork: false) {
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 100, author: {emails: ["${username}@users.noreply.github.com", "${username}11@gmail.com", "ur5441@srmist.edu.in", "sinharajutkarsh@gmail.com"]}) {
                    edges {
                      node {
                        committedDate
                        url
                        message
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("GitHub fetch failed");

    const json = await res.json();

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    const repositories = json.data.user.repositories.nodes;

    // Flatten all commits
    const allCommits = repositories.flatMap(repo =>
      repo.defaultBranchRef?.target?.history?.edges.map(edge => ({
        date: edge.node.committedDate.split("T")[0], // YYYY-MM-DD
        url: edge.node.url,
        message: edge.node.message,
      })) || []
    );

    // Map commits to calendar days
    const weeks = calendar.weeks.map(week => ({
      contributionDays: week.contributionDays.map(day => ({
        ...day,
        commits: allCommits.filter(commit => commit.date === day.date)
      }))
    }));

    const data = {
      totalContributions: calendar.totalContributions,
      weeks
    };

    return Response.json(data);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch contributions or commits" }, { status: 500 });
  }
}
