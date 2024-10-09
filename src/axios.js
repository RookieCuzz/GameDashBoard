import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: '/api',  // 基础 URL，根据需要更改
    timeout: 10000,   // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器（可选）
apiClient.interceptors.request.use(
    config => {
        // 可以在这里添加认证 Token 或其他全局信息
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器（可选）
apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // 统一处理错误
        console.error('请求出错:', error);
        return Promise.reject(error);
    }
);

export default apiClient;
