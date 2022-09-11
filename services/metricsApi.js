import useSWR from "swr";
import { request } from "graphql-request";

//const fetcher = (...args) => fetch(...args).then((res) => res.json());

function getGithubRepo(organization, name) {
  const { data, error } = useSWR(`https://api.github.com/repos/${organization}/${name}`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  return data;
}

function getCountTransactions(testnet = true) {
  const { data: firstPage } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/txns?ps=10&p=1`);
  const { data: lastPage } = useSWR(() => `https://${testnet ? "goerli." : ""}voyager.online/api/txns?ps=10&p=${firstPage.lastPage}`);

  if (!lastPage) return <>loading...</>;

  const nbreTransactions = (firstPage.lastPage - 1) * 10 + lastPage.items.length;

  return nbreTransactions;
}

function getCountContracts(testnet = true) {
  const { data: firstPage } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/contracts?ps=10&p=1`);
  const { data: lastPage } = useSWR(() => `https://${testnet ? "goerli." : ""}voyager.online/api/contracts?ps=10&p=${firstPage.lastPage}`);

  if (!lastPage) return <>loading...</>;

  const nbreContracts = (firstPage.lastPage - 1) * 10 + lastPage.items.length;

  return nbreContracts;
}

function getCountBlocks(testnet = true) {
  const { data: firstPage } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/blocks?ps=10&p=1`);
  const { data: lastPage } = useSWR(() => `https://${testnet ? "goerli." : ""}voyager.online/api/blocks?ps=10&p=${firstPage.lastPage}`);

  if (!lastPage) return <>loading...</>;

  const nbreBlocks = (firstPage.lastPage - 1) * 10 + lastPage.items.length;

  return nbreBlocks;
}

function getBridgeDeposits() {
  const fetcher = (query) => request("https://api.thegraph.com/subgraphs/name/khelil/starknet-bridge-staging", query);

  const { data, error } = useSWR(
    `{
      depositEvents(where: {status: FINISHED, amount_gt: 0} orderBy: finishedAtDate) {
        finishedAtDate
        amount
      }
    }`,
    fetcher
  );

  if (error) return <>failed to load</>;
  if (!data) return [];

  return data.depositEvents;
}

function getBridgeWithdraws() {
  const fetcher = (query) => request("https://api.thegraph.com/subgraphs/name/khelil/starknet-bridge-staging", query);

  const { data, error } = useSWR(
    `{
      withdrawalEvents(where: {status: FINISHED, amount_gt: 0} orderBy: finishedAtDate) {
        finishedAtDate
        amount
      }
    }`,
    fetcher
  );

  if (error) return <>failed to load</>;
  if (!data) return [];

  return data.withdrawalEvents;
}

function getDownloadsNpm() {
  var packageName = "starknet";
  const { data, error } = useSWR(`https://api.npmjs.org/downloads/range/last-month/starknet`);

  if (error) return [];
  if (!data) return [];

  return data.downloads;
}

export const MetricsApi = {
  getGithubRepo,
  getCountTransactions,
  getCountContracts,
  getCountBlocks,
  getBridgeDeposits,
  getBridgeWithdraws,
  getDownloadsNpm,
};
