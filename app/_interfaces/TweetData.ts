import { UserData } from './UserData';

export interface TweetData {
  id: number;
  text: string;
  image: string | null; // imageは空であるものもあるため
  user: UserData;
}