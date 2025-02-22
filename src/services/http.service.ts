import Axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authService } from './auth.service';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:80/api/';

const axios: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (originalRequest.url.includes('/auth/refresh')) {
      authService.logout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return axios(originalRequest);
      }).catch((err) => {
        return Promise.reject(err);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await authService.refresh();
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
      processQueue(null, response.accessToken);
      return axios(originalRequest);
    } catch (err) {
      processQueue(err, null);
      authService.logout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
});


export const httpService = {
  get(endpoint: string, data?: any, headers: any = {}) {
    return ajax(endpoint, 'GET', data, headers);
  },
  post(endpoint: string, data?: any, headers: any = {}) {
    return ajax(endpoint, 'POST', data, headers);
  },
  put(endpoint: string, data?: any, headers: any = {}) {
    return ajax(endpoint, 'PUT', data, headers);
  },
  delete(endpoint: string, data?: any, headers: any = {}) {
    return ajax(endpoint, 'DELETE', data, headers);
  }
};

async function ajax(endpoint: string, method: string = 'GET', data: any = null, headers: any = {}): Promise<any> {
  try {
    console.log("ajax request", endpoint, method, data);
    const res = await axios({
      url: endpoint,
      method,
      data,
      headers,
      params: (method === 'GET') ? data : null
    });
    return res.data;
  } catch (err: any) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      if (endpoint !== 'auth/logout') {
        localStorage.clear();
        window.location.assign('/login');
      }
    }
    throw err;
  }
}


