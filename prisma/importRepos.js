const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fetch = require("node-fetch");

const githubReposTrack = [
  { organization: "starkware-libs", name: "cairo-lang" },
  { organization: "starknet-community-libs", name: "get-starknet" },
  { organization: "0xs34n", name: "starknet.js" },
  { organization: "software-mansion", name: "starknet.py" },
  { organization: "OpenZeppelin", name: "nile" },
  { organization: "Shard-Labs", name: "starknet-devnet" },
];

const getRepos = async () => {
  let reposTrack = githubReposTrack.map(async (repo) => {
    return fetch(`https://api.github.com/repos/${repo.organization}/${repo.name}`).then((response) => {
      return response.json();
    });
  });
  return reposTrack;
};

const importRepos = async () => {
  try {
    await prisma.repo.deleteMany();
    console.log("Deleted records in repo table");

    let repoPromises = await getRepos();
    console.log("Query Repos");
    Promise.all(repoPromises).then(async (results) => {
      const repos = results.map((result) => {
        let repo = {};
        console.log(result);
        repo["name"] = result["name"];
        repo["url"] = result["html_url"];
        repo["forks"] = result["forks"];
        repo["open_issues"] = result["open_issues"];
        repo["watchers"] = result["watchers"];
        repo["stars"] = result["stargazers_count"];
        return repo;
      });
      await prisma.repo.createMany({
        data: repos,
      });
      console.log("Added repo data");
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

importRepos();
