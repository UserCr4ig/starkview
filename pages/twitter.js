import { Tweet } from "react-static-tweets";

function TweetCard(props) {
  return (
    <Tweet id={props.tweetId} />
    // <a href={`https://twitter.com/i/web/status/${props.tweetId}`} target="_blank" rel="noreferrer">
    //   <div>
    //     {/* <p className="">{props.tweetId}</p> */}
    //     <p className="text-sm py-2">{props.text}</p>
    //     <hr />
    //   </div>
    // </a>
  );
}

export default function Twitter(props) {
  return <div className="grid grid-cols-4 gap-4">{!props.tweets ? <p>Couldn&apos;t fetch information from Twitter</p> : props.tweets.map((tweet, key) => <TweetCard key={key} text={tweet.text} tweetId={tweet.tweetId} />)}</div>;
}
