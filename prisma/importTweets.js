const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Twitter = require("twitter-lite");

const getTweets = async () => {
  try {
    await prisma.tweet.deleteMany();
    console.log("Deleted records in tweet table");

    //let searchTweets = await fetchSearch("starknet");
    const client = new Twitter({
      version: "2",
      extension: false,
      bearer_token: process.env.TWITTER_BEARER_TOKEN,
    });

    let searchTweetsResponse = await client.get("tweets/search/recent", { query: "starknet", expansions: "author_id", "tweet.fields": "author_id,created_at,source,text", "user.fields": "id,url,username" });
    let searchTweets = searchTweetsResponse.data;
    console.log("searchTweets", searchTweetsResponse);

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

getTweets();
