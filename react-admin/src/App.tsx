import Login from './pages/login/Login'
import Home from './home'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'


const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={
        <PrivateRouter>
          <Home />
        </PrivateRouter>
      } />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )

}
