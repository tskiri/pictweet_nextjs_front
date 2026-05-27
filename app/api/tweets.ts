import axios from 'axios';
import { TweetData } from '../_interfaces/TweetData';

// リクエストの頭にはこのbaseURLがつくようになる。
// バックエンドへのリクエストはaxiosを使用する。
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const findAllTweets = async (): Promise<TweetData[]> => {
  try {
    const response = await api.get<TweetData[]>('/tweets/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ツイートの取得に失敗しました');
    }
    throw error;
  }
};

export const createTweet = async (tweetForm: { image: string; text: string; }): Promise<TweetData> => {
  try {
    const response = await api.post('/tweets/', tweetForm);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      const messages = error.response?.data?.messages;
      throw new Error(messages ? messages.join(', ') : 'ツイートの作成に失敗しました');
    }
    throw error;
  }
};