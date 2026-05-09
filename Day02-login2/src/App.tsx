import { useState } from 'react'
import './App.css'

export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = (e : any) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
        alert('请输入用户名和密码');
        return;
    }
    if (username === 'admin' && password === '123456') {
            alert('成功');
        } else {
            alert('失败');
        }
  }

  return (
    <div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
            <h2>账号密码登录</h2>
            <label>用户名:</label>
            <input type="text" className="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label>密码:</label>
            <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" value="登录"/>
          </form>
      </div>
    </div>
    
  )
}
