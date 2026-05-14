import { useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { post } from '../../api/request'

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  
  const handleLogin = async (e :any ) => {
    e.preventDefault();

    
    if (!username.trim()) {
        message.error('请输入用户名');
        return;
    }
    
    if (!password.trim()) {
        message.error('请输入密码');
        return;
    }
    
    
    setLoading(true);
   

    try {
        const token = await post('/login', { username, password });
        if(token) {
            localStorage.setItem('token', token);
            message.success('登录成功');
            setUsername('');
            setPassword('');
            navigate('/home');
        }
    } catch (error: any) {
        message.error('登录失败，请稍后再试', error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="login-page">
        <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
            <h2>账号密码登录</h2>
            <label>用户名:</label>
            <input type="text" className="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading}/>
            <label>密码:</label>
            <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
            <button type="submit" className="submit" disabled={loading}>
                {loading ? '登录中...' : '登录'}
            </button>
          </form>
      </div>
    </div>
  )

}
