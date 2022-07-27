const Twitter = require("twitter-lite");

// async function fetchUser(screen_name) {
//   const client = new Twitter({
//     version: "2",
//     extension: false,
//     bearer_token: process.env.TWITTER_BEARER_TOKEN,
//   });

//   return client.get("users/show", { screen_name: screen_name });
// }

const fetchSearch = async (keyword) => {
  const client = new Twitter({
    version: "2",
    extension: false,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });

  return client.get("tweets/search/recent", { query: keyword, expansions: "author_id", "tweet.fields": "author_id,created_at,source,text", "user.fields": "id,url,username" });
};

// export const TwitterApi = {
//   fetchUser,
//   fetchSearch,
// };
