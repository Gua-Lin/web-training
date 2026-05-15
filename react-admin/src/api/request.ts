import axios from "axios";
import { message } from "antd";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

// 请求拦截器：自动添加 Authorization 头
// 响应拦截器：统一处理 401/403/404/500
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const { response } = error;
    const isLoginApi = error.config?.url === '/login';

    // 网络超时/无响应
    if (!response) {
      message.error('网络异常或服务器超时，请稍后重试');
      return Promise.reject(error);
    }

    // 状态码 switch 统一处理
    switch (response.status) {
      case 401:
        // 登录接口401不跳转
        if (!isLoginApi) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          message.error('登录状态已过期，请重新登录');
        }
        break;
      case 403:
        message.error('暂无权限访问');
        break;
      case 404:
        message.error('请求接口不存在');
        break;
      case 500:
        message.error('服务器内部错误');
        break;
      default:
        message.error('请求失败，请稍后重试');
    }

    return Promise.reject(error);
  }
);

// 使用更精确的类型定义,不这么写会导致调用时无法正确推断类型
export const get = <T = any>(url: string, params?: any): Promise<T> => {
    return request.get<any, T>(url, { params });
};

export const post = <T = any>(url: string, data?: any): Promise<T> => {
    return request.post<any, T>(url, data);
};

export const put = <T = any>(url: string, data?: any): Promise<T> => {
    return request.put<any, T>(url, data);
};

export const del = <T = any>(url: string, params?: any): Promise<T> => {
    return request.delete<any, T>(url, { params });
};

export default request;

