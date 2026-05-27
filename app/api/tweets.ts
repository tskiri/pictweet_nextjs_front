import axios from 'axios';
import { TweetData } from '../_interfaces/TweetData';

// リクエストの頭にはこのbaseURLがつくようになる。
// バックエンドへのリクエストはaxiosを使用する。
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
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