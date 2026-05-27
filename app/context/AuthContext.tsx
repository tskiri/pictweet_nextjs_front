'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout } from '@/app/api/users';


type User = {
  id: number
  nickname: string
  isAuthenticated: boolean
} | null

// コンテキストで扱う値として、Userという型を定義
// User：ログイン中かどうかと、ログイン中のユーザーのIDとニックネームを管理
type AuthContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

// コンテキストが使用できるコンテキストプロバイダーの子コンポーネントにはAuthContextType型を適用
// 使用できないならundefined型を適用
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (typeof parsedUser === 'object' && parsedUser !== null 
            && 'id' in parsedUser && 'nickname' in parsedUser && 'isAuthenticated' in parsedUser) {
          setUser(parsedUser as User);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
    setIsLoading(false)
  }, [])

  // ログイン時にUserの値を書き換える
  const login = async (email: string, password: string) => {
    try {
      const userData = await apiLogin({ email, password });
      const user = { id: userData.id, nickname: userData.nickname, isAuthenticated: true };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // ログアウト時にUserの値を書き換える
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    // 子コンポーネントであるuser, setUser, login, logoutでAuthContextを使用できるようにしている。
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 外部から子コンポーネントを使用する関数
// user, setUser, login, logoutを渡せばAuthContextType型、これ以外ならundefined型になる。
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}