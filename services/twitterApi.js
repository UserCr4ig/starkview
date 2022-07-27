import Twitter from "twitter-lite";

async function fetchUser(screen_name) {
  const client = new Twitter({
    version: "1.1",
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  return client.get("users/show", { screen_name: screen_name });
}

async function fetchSearch(keyword) {
  const client = new Twitter({
    version: "1.1",
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  return client.get("search/tweets", { q: keyword, result_type: "popular" });
}

export const TwitterApi = {
  fetchUser,
  fetchSearch,
};
