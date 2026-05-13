import { useState } from 'react'
// 引入布局外壳、两个子页面
import MainLayout from './layouts/MainLayout'
import Welcome from './pages/home/welcome'
import UserList from './pages/user/UserList'

export default function Home() {
  // 控制中间切换哪个页面
  const [pageKey, setPageKey] = useState('home')

  // 接收子布局传过来的菜单点击
  const handleMenuChange = (key: string) => {
    if (key === '1') {
      setPageKey('home')
    }
    if (key === '2') {
      setPageKey('user')
    }
  }

  return (
    <MainLayout onMenuChange={handleMenuChange}>
      {/* 根据key显示不同页面 */}
      {pageKey === 'home' && <Welcome />}
      {pageKey === 'user' && <UserList />}
    </MainLayout>
  )
}