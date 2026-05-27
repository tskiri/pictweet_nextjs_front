import './styles/style.css'
import { AuthProvider } from '@/app/context/AuthContext';

export const metadata = {
  title: 'PicTweet',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* コンテキストプロバイダーのコンポーネントをすべてのコンポーネントの親要素として定義 */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 
 
 
 