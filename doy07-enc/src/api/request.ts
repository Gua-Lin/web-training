import axios from "axios";
import { message } from "antd";

// ✅ 定义后端统一响应格式
interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
}

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
        if (response.data && response.data.code !== 0) {
            const msg = response.data.message || '请求失败，请稍后再试';
            message.error(msg);
            return Promise.reject(response.data);  // 抛出错误以便在调用处捕获
        }
        return response.data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    message.error('登录状态已过期，请重新登录');
                    break;
                default:
                    message.error('请求失败，请稍后再试');
                    break;
            }
        }
        return Promise.reject(error);
    }
);


// ✅ 使用更精确的类型定义
export const get = <T = any>(url: string, params?: any): Promise<T> => {
    return request.get<any, T>(url, { params });
    //              ↑ 第一个any是响应类型，第二个T是返回的数据类型
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

