"use client";
import { TweetData } from '../_interfaces/TweetData';
import Tweet  from '../_components/Tweet';


interface TweetListProps {
  tweets: TweetData[];
  onDeleteTweet: (tweetId: number) => Promise<void>;
}

const TweetList = ({ tweets, onDeleteTweet }: TweetListProps) => {
  return (
    <div className="contents row">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onDeleteTweet={onDeleteTweet} />
      ))}
    </div>
  );
};

export default TweetList