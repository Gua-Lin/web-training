import React, { useState } from 'react'
import { message } from 'antd'
import axios from 'axios'
import './App.css'

export default function App() {

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
        const response = await axios.post('/api/login', { username, password });
        if(response.data.code === 0) {
        const token = response.data.data.token;
        console.log('接口返回的 token:', token);
        localStorage.setItem('token', token);
        message.success('登录成功');
        setUsername('');
        setPassword('');
        }
    } catch (error: any) {
        console.log('错误信息:', error);
        const msg = error.response?.data?.message || '登录失败，请稍后再试';
        message.error(msg);
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
