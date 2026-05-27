"use client";
import { TweetData } from '../_interfaces/TweetData';
import Tweet  from '../_components/Tweet';


interface TweetListProps {
  tweets: TweetData[];
}

const TweetList = ({ tweets }: TweetListProps) => {
  return (
    <div className="contents row">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList