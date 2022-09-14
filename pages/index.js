import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/starknet_logo.png";
import CardMetric from "../components/cardMetric";
import CardGithub from "../components/cardGithub";
import { MetricsApi } from "../services/metricsApi";
import moment from "moment";
import Twitter from "./twitter";
import prisma from "../lib/prisma";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

import { Bar, Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export async function getServerSideProps() {
  let tweets = await prisma.tweet.findMany();
  let repos = await prisma.repo.findMany();
  let tweetCountStarknet = await prisma.tweetCountStarknet.findMany();
  let tweetCountStarkware = await prisma.tweetCountStarkware.findMany();
  let following = await prisma.following.findMany();
  following = JSON.parse(JSON.stringify(following));

  let follower = await prisma.follower.findMany();
  follower = JSON.parse(JSON.stringify(follower));

  return {
    props: { tweets, repos, tweetCountStarknet, tweetCountStarkware, following, follower },
  };
}

export default function Home(props) {
  const [etherBalance, setEtherBalance] = useState(null);
  const [etherTestnetBalance, setTestnetEtherBalance] = useState(null);
  const deposits = MetricsApi.getBridgeDeposits();
  const withdraws = MetricsApi.getBridgeWithdraws();
  const downloads = MetricsApi.getDownloadsNpm();

  getEthBalanceMainet().then((result) => {
    setEtherBalance(result);
  });

  getEthBalanceTestnet().then((result) => {
    setTestnetEtherBalance(result);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const optionsDownloads = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const optionsTweetsCountStarknet = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const optionsTweetsCountStarkware = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const optionsFollower = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  const optionsFollowing = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
      yAxis: {
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
  };

  let depositAmounts = deposits.map((deposit, key) => {
    deposit.x = moment.unix(deposit.finishedAtDate).format("MM/DD/YYYY");
    deposit.amount = deposit.amount / 8;
    deposit.y = deposit.amount;
    return deposit;
  });

  depositAmounts.reverse();

  let withdrawAmounts = withdraws.map((withdraw, key) => {
    withdraw.x = moment.unix(withdraw.finishedAtDate).format("MM/DD/YYYY");
    withdraw.amount = withdraw.amount / 8;
    withdraw.y = -withdraw.amount;
    return withdraw;
  });

  withdrawAmounts.reverse();

  const downloadsCount = downloads.map((download, key) => {
    download.x = download.day;
    download.y = download.downloads;
    return download;
  });

  const tweetsPerDayStarknet = props.tweetCountStarknet.map((tweetCount, key) => {
    tweetCount.x = moment(tweetCount.end).format("MM/DD/YYYY");
    tweetCount.y = tweetCount.tweet_count;
    return tweetCount;
  });

  const tweetsPerDayStarkware = props.tweetCountStarkware.map((tweetCount, key) => {
    tweetCount.x = moment(tweetCount.end).format("MM/DD/YYYY");
    tweetCount.y = tweetCount.tweet_count;
    return tweetCount;
  });

  const followers = props.follower.map((follower, key) => {
    follower.x = moment(follower.createdAt).format("MM/DD/YYYY");
    follower.y = follower.count;
    return follower;
  });

  const followings = props.following.map((following, key) => {
    following.x = moment(following.createdAt).format("MM/DD/YYYY");
    following.y = following.count;
    return following;
  });

  const data = {
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

  const dataDownloads = {
    datasets: [
      {
        label: "Downloads last 30 days",
        data: downloadsCount,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
      },
    ],
  };

  const dataTweetCountStarknet = {
    datasets: [
      {
        label: "Tweets per day keyword 'Starknet'",
        data: tweetsPerDayStarknet,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
      },
    ],
  };

  const dataTweetCountStarkware = {
    datasets: [
      {
        label: "Tweets per day keyword 'Starkware'",
        data: tweetsPerDayStarkware,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
      },
    ],
  };

  const dataFollowers = {
    datasets: [
      {
        label: "Followers per day",
        data: followers,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
      },
    ],
  };

  const dataFollowings = {
    datasets: [
      {
        label: "Following per day",
        data: followings,
        borderColor: "rgb(53, 125, 167)",
        backgroundColor: "rgba(53, 125, 167, 0.8)",
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
          <Image src={logo} width="70" height="70" alt="StarkView" />
          <div className="pl-3">
            <h1 className="text-5xl font-bold">StarkView</h1>
            <p>Ultimate StarkNet Dashboard</p>
          </div>
        </div>

        <div className="py-4">
          <div className="bg-gray-800 p-3 rounded-lg p-5 mb-4">
            <h2 className="text-2xl font-bold mb-3">Bridge withdraws and deposits (goerli)</h2>
            <Bar options={options} data={data} />
          </div>
          <div className="bg-gray-800 p-3 rounded-lg p-5 mb-4">
            <h2 className="text-2xl font-bold mb-3">StarkNet Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CardMetric value={etherBalance} label="ETH IN BRIDGE" />
              <CardMetric value={etherTestnetBalance} label="ETH IN BRIDGE (Goerli)" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
              <CardMetric value={MetricsApi.getCountTransactions(false)} label="Transactions (Mainet)" />
              <CardMetric value={MetricsApi.getCountContracts(false)} label="Contracts (Mainet)" />
              <CardMetric value={MetricsApi.getCountBlocks(false)} label="Blocks (Mainet)" />
              <CardMetric value={MetricsApi.getCountTransactions()} label="Transactions (Goerli)" />
              <CardMetric value={MetricsApi.getCountContracts()} label="Contracts (Goerli)" />
              <CardMetric value={MetricsApi.getCountBlocks()} label="Blocks (Goerli)" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="bg-gray-800 p-3 rounded-lg p-5">
                <h2 className="flex">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" className="svg-inline--fa fa-github w-8 h-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  <p className="text-xl font-bold ml-3 mb-4">Github</p>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {props.repos &&
                    props.repos.map((repo, key) => {
                      return <CardGithub key={key} forks={repo.forks} name={repo.name} watchers={repo.watchers} open_issues={repo.open_issues} stars={repo.stars} url={repo.url} />;
                    })}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-800 p-3 rounded-lg p-5">
                <h2 className="flex items-start">
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="npm" className="svg-inline--fa fa-npm w-8 h-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="currentColor" d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"></path>
                  </svg>{" "}
                  <p className="text-xl font-bold ml-3">starknet.js</p>
                </h2>
                <Line options={optionsDownloads} data={dataDownloads} />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg p-5">
            <h2 className="text-xl font-bold mb-3">Twitter Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Line options={optionsTweetsCountStarknet} data={dataTweetCountStarknet} />
              </div>
              <div>
                <Line options={optionsTweetsCountStarkware} data={dataTweetCountStarkware} />
              </div>
              <div>
                <Line options={optionsFollower} data={dataFollowers} />
              </div>
              <div>
                <Line options={optionsFollowing} data={dataFollowings} />
              </div>
            </div>
            {/* <a className="twitter-timeline" data-tweet-limit="1" data-chrome="nofooter noborders" data-theme="dark" href="https://twitter.com/StarkWareLtd?ref_src=twsrc%5Etfw"></a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}
            {/* <h2 className="text-xl font-bold mb-3">Last Tweets</h2> */}
            {/* <Twitter tweets={props.tweets} /> */}
          </div>
        </div>

        <div className=""></div>
      </main>

      <footer className="text-sm">
        Copyright StarkView - made with 🚀 by{" "}
        <a href="https://twitter.com/khelil" target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-600">
          @khelil
        </a>{" "}
        for{" "}
        <a href="https://twitter.com/Starkview_" target="_blank" rel="noreferrer" className="text-sky-400 hover:text-sky-600">
          @Starkview_
        </a>
      </footer>
    </div>
  );
}
