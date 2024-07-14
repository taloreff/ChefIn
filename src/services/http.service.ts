/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authService } from './auth.service';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:5000/api/';

const axios: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
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
    originalRequest._retry = true;
    try {
      const response = await authService.refresh();
      localStorage.setItem('accessToken', response.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
      return axios(originalRequest);
    } catch (err) {
      authService.logout();
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export const httpService = {
  get(endpoint: string, data?: any) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint: string, data?: any) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint: string, data?: any) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint: string, data?: any) {
    return ajax(endpoint, 'DELETE', data);
  }
};

async function ajax(endpoint: string, method: string = 'GET', data: any = null): Promise<any> {
  try {
    const res = await axios({
      url: endpoint,
      method,
      data,
      params: (method === 'GET') ? data : null
    });
    return res.data;
  } catch (err: any) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      localStorage.clear();
      window.location.assign('/');
    }
    throw err;
  }
}
