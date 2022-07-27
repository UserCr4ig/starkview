import useSWR from "swr";

//const fetcher = (...args) => fetch(...args).then((res) => res.json());

function getGithubRepo(organization, name) {
  const { data, error } = useSWR(`https://api.github.com/repos/${organization}/${name}`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  console.log(data);

  return data;
}

function getCountTransactions(testnet = true) {
  const { data, error } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/txns?ps=10&p=1`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  console.log(data);

  return <>{data.lastPage}</>;
}

function getCountContracts(testnet = true) {
  const { data, error } = useSWR(`https://${testnet ? "goerli." : ""}voyager.online/api/contracts?ps=10&p=1`);

  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;

  console.log(data);

  return <>{data.lastPage}</>;
}

export const MetricsApi = {
  getGithubRepo,
  getCountTransactions,
  getCountContracts,
};
