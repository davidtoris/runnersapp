import { API_BASE_URL } from '@/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const instancePublicAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-type': 'application/json' },
});

export const instanceAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-type': 'application/json' }
  
});

export const instanceAPIData = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
});

