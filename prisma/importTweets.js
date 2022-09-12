const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Twitter = require("twitter-lite");

const getTweets = async () => {
  console.log("getTweets");
  try {
    await prisma.tweet.deleteMany();
    console.log("Deleted records in tweet table");

    const client = new Twitter({
      version: "2",
      extension: false,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });

    let searchTweetsResponse = await client.get("tweets/search/recent", { query: "starknet", expansions: "author_id", "tweet.fields": "author_id,created_at,source,text", "user.fields": "id,url,username" });
    let searchTweets = searchTweetsResponse.data;

    searchTweets.forEach((tweet) => {
      tweet["authorId"] = tweet["author_id"];
      tweet["tweetId"] = tweet["id"];
      delete tweet["author_id"];
      delete tweet["id"];
    });

    console.log("searchTweets", searchTweets);

    await prisma.tweet.createMany({
      data: searchTweets,
    });
    console.log("Added tweet data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const getCountTweets = async () => {
  console.log("getCountTweets");
  try {
    const client = new Twitter({
      version: "2",
      extension: false,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });

    let countTweetsResponse = await client.get("tweets/counts/recent", { query: "starknet", start_time: "2022-09-06T00:00:00.000Z", end_time: "2022-09-12T00:00:00.000Z", granularity: "day" });
    let countTweets = countTweetsResponse.data;

    console.log("countTweets", countTweets);

    await prisma.tweetCount.createMany({
      data: countTweets,
    });
    console.log("Added count tweets");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const getUserFollowing = async () => {
  console.log("getUserFollowing");
  try {
    const client = new Twitter({
      version: "2",
      extension: false,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });

    let followingResponse = await client.get("users/953893947822280704/following");
    let following = followingResponse.data;

    console.log("following", following);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    //await prisma.$disconnect();
  }
};

const getUserFollowers = async () => {
  console.log("getUserFollowers");
  try {
    const client = new Twitter({
      version: "2",
      extension: false,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });

    let followersResponse = await client.get("users/953893947822280704/followers");
    let followers = followersResponse.data;

    console.log("followers", followers);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    //await prisma.$disconnect();
  }
};

// getUserFollowers();
// getUserFollowing();
getCountTweets();
getTweets();
