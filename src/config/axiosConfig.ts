import { API_BASE_URL } from '@/constants';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export const instancePublicAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-type': 'application/json' },
});

export const instanceAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instanceAPI.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  config.headers = {
    ...config.headers,
    'x-tokens': localStorage.getItem('tokenUser')
  } as AxiosRequestConfig['headers']; // Specify the type of headers explicitly
  return config;
});

export const instanceAPIData = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
});

instanceAPIData.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  config.headers = {
    ...config.headers,
    'x-tokens': localStorage.getItem('tokenUser')
  } as AxiosRequestConfig['headers']; // Specify the type of headers explicitly
  return config;
});

