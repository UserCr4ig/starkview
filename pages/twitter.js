import Link from "next/link";
import prisma from "../lib/prisma";

function TweetCard(props) {
  return (
    <Link href={`https://twitter.com/i/web/status/${props.tweetId}`}>
      <a>
        <p className="">{props.tweetId}</p>
        <p className="">{props.text}</p>
      </a>
    </Link>
  );
}

export default function Twitter(props) {
  return <div>{!props.tweets ? <p>Couldn't fetch information from Twitter</p> : props.tweets.map((tweet, key) => <TweetCard key={key} text={tweet.text} tweetId={tweet.tweetId} />)}</div>;
}

export async function getServerSideProps() {
  const tweets = await prisma.tweet.findMany();
  return {
    props: { tweets },
  };
}
