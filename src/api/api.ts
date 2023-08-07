import { BASE_URL, REQUEST_TIMEOUT} from '../const';
import axios, {AxiosRequestConfig} from 'axios';
import { getToken } from '../helpers/token';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);
