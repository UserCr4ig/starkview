import Head from "next/head";
import Image from "next/image";
import logo from "../public/StarkNet_logo.png";
import CardMetric from "../components/cardMetric";
import CardGithub from "../components/cardGithub";
import { MetricsApi } from "../services/metricsApi";
import moment from "moment";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const githubReposToFollow = [
  { organization: "starkware-libs", name: "cairo-lang" },
  { organization: "starknet-community-libs", name: "get-starknet" },
  { organization: "0xs34n", name: "starknet.js" },
  { organization: "software-mansion", name: "starknet.py" },
  { organization: "OpenZeppelin", name: "nile" },
  { organization: "Shard-Labs", name: "starknet-devnet" },
];

export default function Home() {
  //const reposDatas = githubReposToFollow.map((repo) => MetricsApi.getGithubRepo(repo.organization, repo.name));
  const reposDatas = [];
  const deposits = MetricsApi.getBridgeDeposits();
  const withdraws = MetricsApi.getBridgeWithdraws();

  // console.log("repos");
  // console.log(reposDatas);
  // console.log("Deposits datas");
  // console.log(deposits);
  // console.log("Withdraws datas");
  // console.log(withdraws);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "StarkNet Bridge Operations",
      },
    },
  };

  const depositAmounts = deposits.map((deposit, key) => {
    deposit.x = moment.unix(deposit.finishedAtDate).format("MM/DD/YYYY");
    deposit.y = deposit.amount;
    return deposit;
  });

  const withdrawAmounts = withdraws.map((withdraw, key) => {
    withdraw.x = moment.unix(withdraw.finishedAtDate).format("MM/DD/YYYY");
    withdraw.y = withdraw.amount;
    return withdraw;
  });

  const data = {
    //labels,
    datasets: [
      {
        label: "Deposits",
        data: depositAmounts,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
      },
      {
        label: "Withdraws",
        data: withdrawAmounts,
        borderColor: "rgb(72, 169, 166)",
        backgroundColor: "rgba(72, 169, 166, 0.8)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>StarkView</title>
        <meta name="description" content="StarkNet Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="flex py-4">
          <Image src={logo} width="70" height="70" />
          <div className="pl-3">
            <h1 className="text-5xl font-bold">StarkView</h1>
            <p>Ultimate StarkNet Dashboard</p>
          </div>
        </div>

        <div className="py-4">
          <div className="bg-gray-800 p-3 rounded-lg p-5 mb-4">
            <h2 className="text-2xl font-bold mb-3">Bridge Withdraws and Deposits</h2>
            <Bar options={options} data={data} />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg p-5 mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CardMetric value="750" label="TVL" />
              <CardMetric value="" label="Contracts (Mainet)" />
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
                <a className="twitter-timeline" data-tweet-limit="1" data-chrome="nofooter noborders" data-theme="dark" href="https://twitter.com/StarkWareLtd?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </main>

      <footer className="text-sm">Copyright StarkView - made with 🚀 by @khelil</footer>
    </div>
  );
}
