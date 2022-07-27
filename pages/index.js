import Head from "next/head";
import Image from "next/image";
import CardMetric from "../components/cardMetric";
import CardGithub from "../components/cardGithub";
import { MetricsApi } from "../services/metricsApi";

const githubReposToFollow = [
  { organization: "starkware-libs", name: "cairo-lang" },
  { organization: "starknet-community-libs", name: "get-starknet" },
  { organization: "0xs34n", name: "starknet.js" },
  { organization: "software-mansion", name: "starknet.py" },
  { organization: "OpenZeppelin", name: "nile" },
  { organization: "Shard-Labs", name: "starknet-devnet" },
];

export default function Home() {
  const reposDatas = githubReposToFollow.map((repo) => MetricsApi.getGithubRepo(repo.organization, repo.name));

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>StarkView</title>
        <meta name="description" content="StarkNet Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="py-4">
          <h1 className="text-5xl font-bold">StarkView</h1>
          <p>Ultimate StarkNet Dashboard</p>
        </div>

        <div className="py-4">
          <div className="bg-gray-800 p-3 rounded-lg p-5 mb-4">
            <h2 className="text-2xl font-bold mb-3">Metrics</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CardMetric value="750" label="TVL" />
              <CardMetric value={MetricsApi.getCountContracts(false)} label="Contracts (Mainet)" />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <CardMetric value={MetricsApi.getCountTransactions(false)} label="Transactions (Mainet)" />
              <CardMetric value={MetricsApi.getCountContracts(false)} label="Contracts (Mainet)" />
              <CardMetric value={MetricsApi.getCountTransactions()} label="Transactions (Goerli Testnet)" />
              <CardMetric value={MetricsApi.getCountContracts()} label="Contracts (Goerli Testnet)" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg p-5">
              <h2 className="text-xl font-bold mb-3">Github Activity</h2>
              <div className="grid grid-cols-2 gap-4">
                {reposDatas.map((repo, key) => {
                  return <CardGithub key={key} forks={repo.forks} name={repo.name} watchers={repo.watchers} open_issues={repo.open_issues} />;
                })}
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg p-5">
              <h2 className="text-xl font-bold mb-3">Twitter Activity</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>SEARCH TWITTER</div>
                <a class="twitter-timeline" data-tweet-limit="1" data-chrome="nofooter noborders" data-theme="dark" href="https://twitter.com/StarkWareLtd?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </main>

      <footer className="text-sm">Copyright StarkView - by @khelil</footer>
    </div>
  );
}
