import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('退出登录成功');
    navigate('/login');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>欢迎来到主页！</h1>
      <p>这是一个受保护的页面，只有登录后才能访问。</p>
      <button onClick={handleLogout}>退出登录</button>
    </div>
  )
}