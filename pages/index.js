import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/StarkNet_logo.png";
import CardMetric from "../components/cardMetric";
import CardGithub from "../components/cardGithub";
import { MetricsApi } from "../services/metricsApi";
import moment from "moment";
import Twitter from "./twitter";
import prisma from "../lib/prisma";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Web3 from "web3";

async function getEthBalanceMainet() {
  const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/42a558e0d5fb40c0b7fd0cd64b542b6f"));
  const tokenHolder = "0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419";
  const balance = await web3.eth.getBalance(tokenHolder);
  const etherBalance = web3.utils.fromWei(balance, "ether");
  return etherBalance;
}

async function getEthBalanceTestnet() {
  const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/42a558e0d5fb40c0b7fd0cd64b542b6f"));
  const tokenHolder = "0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419";
  const balance = await web3.eth.getBalance(tokenHolder);
  const etherBalance = web3.utils.fromWei(balance, "ether");
  return etherBalance;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export async function getServerSideProps() {
  const tweets = await prisma.tweet.findMany();
  const repos = await prisma.repo.findMany();
  return {
    props: { tweets, repos },
  };
}

export default function Home(props) {
  const [etherBalance, setEtherBalance] = useState(null);
  const [etherTestnetBalance, setTestnetEtherBalance] = useState(null);
  const deposits = MetricsApi.getBridgeDeposits();
  const withdraws = MetricsApi.getBridgeWithdraws();

  getEthBalanceMainet().then((result) => {
    setEtherBalance(result);
  });

  getEthBalanceTestnet().then((result) => {
    setTestnetEtherBalance(result);
  });

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
    const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/42a558e0d5fb40c0b7fd0cd64b542b6f"));
    deposit.x = moment.unix(deposit.finishedAtDate).format("MM/DD/YYYY");
    deposit.y = web3.utils.fromWei(deposit.amount, "ether");
    return deposit;
  });

  const withdrawAmounts = withdraws.map((withdraw, key) => {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/42a558e0d5fb40c0b7fd0cd64b542b6f"));
    withdraw.x = moment.unix(withdraw.finishedAtDate).format("MM/DD/YYYY");
    withdraw.y = web3.utils.fromWei(withdraw.amount, "ether");
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
            <h2 className="text-2xl font-bold mb-3">StarkNet Metrics</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <CardMetric value={etherBalance} label="ETH IN BRIDGE" />
              <CardMetric value={etherTestnetBalance} label="ETH IN BRIDGE (Goerli)" />
            </div>
            <div className="grid grid-cols-6 gap-4 mb-4">
              <CardMetric value={MetricsApi.getCountTransactions(false)} label="Transactions (Mainet)" />
              <CardMetric value={MetricsApi.getCountContracts(false)} label="Contracts (Mainet)" />
              <CardMetric value={MetricsApi.getCountBlocks(false)} label="Blocks (Mainet)" />
              <CardMetric value={MetricsApi.getCountTransactions()} label="Transactions (Goerli)" />
              <CardMetric value={MetricsApi.getCountContracts()} label="Contracts (Goerli)" />
              <CardMetric value={MetricsApi.getCountBlocks()} label="Blocks (Goerli)" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="bg-gray-800 p-3 rounded-lg p-5">
                <h2 className="text-xl font-bold mb-3">Github Activity</h2>
                <div className="grid grid-cols-2 gap-4">
                  {props.repos &&
                    props.repos.map((repo, key) => {
                      return <CardGithub key={key} forks={repo.forks} name={repo.name} watchers={repo.watchers} open_issues={repo.open_issues} />;
                    })}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-800 p-3 rounded-lg p-5">
                <h2 className="text-xl font-bold mb-3">Twitter Activity</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Twitter tweets={props.tweets} />
                  </div>
                  <a className="twitter-timeline" data-tweet-limit="1" data-chrome="nofooter noborders" data-theme="dark" href="https://twitter.com/StarkWareLtd?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </main>

      <footer className="text-sm">
        Copyright StarkView - made with 🚀 by{" "}
        <a href="https://twitter.com/khelil" target="_blank" rel="noreferrer">
          @khelil
        </a>
      </footer>
    </div>
  );
}
