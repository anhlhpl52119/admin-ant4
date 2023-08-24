import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message as $message } from 'ant-design-vue';
import { uniqueSlash } from '@/utils/url.util';
import { ERole } from '@/enums/common.enum';
import type { EAxiosMethod } from '@/enums/common.enum';

interface Config {
  url: string
  method: EAxiosMethod
  body?: any
  params?: any
  timeout?: number
}
interface RequestOptions {
  permitRoles?: Array<keyof typeof ERole>
  isAuth?: boolean
  successMsg?: string
  errorMsg?: string
  isShowLoading?: boolean
  loadingMessage?: string
}

const UNKNOWN_ERROR = 'Unknow error';

const VITE_BASE_AUTH = import.meta.env.VITE_API_AUTH_PREFIX;
const VERSION_PREFIX = import.meta.env.VITE_API_VERSION_PREFIX;

const service = axios.create({
  timeout: 6000, // 1 mins
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStore.get(ECacheKey.ACCESS_TOKEN);
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzb25uZ3V5ZW4tYXBpIiwiZXhwIjoxNjkyNjAxOTk0LCJhdWQiOiI4NjZhYzI2ZC1mYjZhLTQ5YWYtYTgwZC1lNmZjN2U0Yzc1MDEiLCJ1c2VyIjp7ImlkIjoiMjI5YjQyYjctMjk0NS00NGQzLTgxNDEtYTQ2NDFjNDJlZTViIn19.Pz-PRSFhbO-uBSU3evwc8omQkBUxmBXaxkOSKQIyZCE';
    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    const res = response.data;
    const error = new Error(UNKNOWN_ERROR) as Error & { code: any };
    error.code = res.code;
    return Promise.reject(error);
  },
  (error: AxiosError<{ messages: string[] }>) => {
    return Promise.reject(error);
  },
);

/**
 * @param config axios config
 * @param options axios option
 * @returns {string} return url + object params in string
 */
export const request = async <T>(config: Config, options: RequestOptions = {}): Promise<T> => {
  const axiosConfig: AxiosRequestConfig = { ...config, data: config.body };
  const {
    errorMsg, permitRoles: permitRole, successMsg, isShowLoading,
    loadingMessage = 'Đang thực hiện...',
    isAuth = false,
  } = options;
  if (permitRole && permitRole.includes(ERole.GUEST)) {
    return $message.error('You are not access able');
  }
  const MSG_KEY = 1;
  if (isShowLoading) {
    $message.loading({ content: () => loadingMessage, key: MSG_KEY });
  }
  try {
    const targetURL = isAuth ? VITE_BASE_AUTH : '/api/v1';
    axiosConfig.url = uniqueSlash(`${targetURL + config.url}`);
    const response = await service.request(axiosConfig);
    successMsg && $message.success({ content: successMsg, key: MSG_KEY });
    return response.data;
  }
  catch (error: any) {
    $message.error({ content: error.code, key: MSG_KEY });
    return Promise.reject(error);
  }
  finally {
    if (!successMsg && !errorMsg) {
      $message.destroy(MSG_KEY);
    }
  }
};
