import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 代理配置，解决 CORS 跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端地址
        changeOrigin: true, // 开启跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 把 /api 去掉
      }
    }
  }
})
