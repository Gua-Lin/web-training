import { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'

const { Header, Sider, Content, Footer } = Layout

interface MainLayoutProps {
  children: React.ReactNode
  onMenuChange: (key: string) => void
}

export default function MainLayout({ children, onMenuChange }: MainLayoutProps) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('1')

  const handleLogout = () => {
    localStorage.removeItem('token')
    message.success('退出登录成功')
    navigate('/login')
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
    onMenuChange(key)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ background: '#274c9b', paddingRight: 20, display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: '#fff', margin: 0 }}>欢迎进入后台管理系统</h3>
        <Button onClick={handleLogout} style={{ marginLeft: 'auto' }}>退出登录</Button>
      </Header>
      
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="vertical"
            onClick={handleMenuClick}
            selectedKeys={[selectedKey]}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: '首页'
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: '用户管理'
              }
            ]}
          />
        </Sider>
        
        <Content style={{ margin: '20px' }}>
          {children}
        </Content>
      </Layout>

      <Footer style={{ textAlign: 'center' }}>
        后台管理系统 ©2026
      </Footer>
    </Layout>
  )
}