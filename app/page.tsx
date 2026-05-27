'use client'
import { useEffect, useState } from 'react';
import Header from '../app/_components/Header';
import Footer from '../app/_components/Footer';
import TweetList from '../app/_components/TweetList';
import { findAllTweets, deleteTweet } from '@/app/api/tweets';
import { TweetData } from '../app/_interfaces/TweetData';

const IndexPage = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await findAllTweets();
        setTweets(response);
      } catch (error) {
        console.error('ツイートの取得に失敗しました:', error);
      }
    };
    getTweets();
  }, []);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
    }
  };
  
  return (
    <div>
      <Header />
      <div className="contents">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet}/>
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage; 
 
 
 