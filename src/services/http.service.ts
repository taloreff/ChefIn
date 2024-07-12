/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:5000/api/';

const axios: AxiosInstance = Axios.create();

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
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: (method === 'GET') ? data : null
    });
    return res.data;
  } catch (err: any) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
      window.location.assign('/');
    }
    throw err;
  }
}
