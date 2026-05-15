import axios from "axios";
import { message } from "antd";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {        
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        // ==============================================
        // 登录接口报错 401 不跳转、不刷新！
        // ==============================================
        const isLoginApi = error.config.url === '/login';

        // 如果是登录接口报错，不跳登录！
        if (error.response?.status === 401 && !isLoginApi) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            message.error('登录状态已过期，请重新登录');
        }

        // 所有错误都抛给页面自己提示，不拦截
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

