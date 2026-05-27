'use client'
import { useEffect, useState } from 'react';
import Header from '../app/_components/Header';
import Footer from '../app/_components/Footer';
import TweetList from '../app/_components/TweetList';
import { findAllTweets } from './api/tweets';
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
  
  return (
    <div>
      <Header />
      <div className="contents">
        <TweetList tweets={tweets} />
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage; 
 
 
 