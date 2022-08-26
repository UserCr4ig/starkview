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
  const { data, error } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/txns?ps=10&p=1`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  return <>{data.lastPage}</>;
}

function getCountContracts(testnet = true) {
  const { data, error } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/contracts?ps=10&p=1`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  return <>{data.lastPage}</>;
}

function getBridgeDeposits() {
  const fetcher = (query) => request("https://api.thegraph.com/subgraphs/name/in19farkt/starknet-bridge-staging", query);

  const { data, error } = useSWR(
    `{
      depositEvents(where: {status: FINISHED, amount_gt: 0}) {
        id
        bridgeAddressL1
        bridgeAddressL2
        l2Recipient
        amount
        finishedAtDate
      }
    }`,
    fetcher
  );

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  console.log(data);

  return <>data</>;
}

export const MetricsApi = {
  getGithubRepo,
  getCountTransactions,
  getCountContracts,
  getBridgeDeposits,
};
