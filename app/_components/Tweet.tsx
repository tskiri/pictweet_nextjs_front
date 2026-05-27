'use client';
import Link from 'next/link'
import { TweetData } from '../_interfaces/TweetData';
import { useAuthContext } from '@/app/context/AuthContext';


interface TweetProps {
    tweet: TweetData;
}

const Tweet = ({ tweet }: TweetProps) => {
  const { user } = useAuthContext()

  return (
    <div className="content_post" style={{ backgroundImage: `url(${tweet.image})` }}>
      <div className="more">
        <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
        <ul className="more_list">
          <li>
            <Link href={`/`}>詳細</Link>
          </li>
          {/* ログイン中かつ投稿者なら<>から</>までを表示 */}
          { user?.isAuthenticated && user.id == tweet.user.id ? (
            <>
              <li>
                <Link href={`/`} className="update-btn">編集</Link>
              </li>
              <li>
                <form action={`/`} method="post">
                  <input type="submit" className="delete-btn" value="削除" />
                </form>
              </li>
            </>
          ): null }
        </ul>
      </div>
      <p>{tweet.text}</p>
      <span className="name">
        <Link href={`/`}>
          <span>投稿者</span><span>{tweet.user.nickname}</span>
        </Link>
      </span>
    </div>
  );
};

export default Tweet