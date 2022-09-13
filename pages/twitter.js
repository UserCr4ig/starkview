import { Tweet } from "react-static-tweets";

function TweetCard(props) {
  return <Tweet id={props.tweetId} />;
}

export default function Twitter(props) {
  return <div className="grid grid-cols-4 gap-4">{!props.tweets ? <p>Couldn&apos;t fetch information from Twitter</p> : props.tweets.map((tweet, key) => <TweetCard key={key} text={tweet.text} tweetId={tweet.tweetId} />)}</div>;
}
