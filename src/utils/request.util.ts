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
import { type ERequestMethod, EStatusCode } from '@/enums/request.enum';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';

interface Config {
  url: string
  method: ERequestMethod
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
  getDataDirectly?: boolean
}

const UNKNOWN_ERROR = 'Lỗi không xác định';

const service = axios.create({
  timeout: 6000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = BrowserStorage.getCookie(EStorage.ACCESS_TOKEN);
    if (token !== '' && config.headers) {
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
    return response;
  },
  (error: AxiosError<{ message: string[] }>) => {
    const status = error?.response?.status ?? EStatusCode.UNKNOWN;
    if (status === EStatusCode.UNAUTHORIZED) {
      BrowserStorage.removeCookie(EStorage.ACCESS_TOKEN);
      location.reload(); // TODO: add user confirm after reload
    }

    return Promise.reject(error);
  },
);

/**
 * @param config axios config
 * @param options axios option
 * @returns {string} return url + object params in string
 */
export const request = async <T>(config: Config, options: RequestOptions = {}): Promise<T> => {
  const MSG_KEY = 1; // message key
  const axiosConfig: AxiosRequestConfig = { ...config, data: config.body }; // re-assign config 'body' to axios 'data'

  //
  const {
    errorMsg, permitRoles: permitRole, successMsg, isShowLoading,
    loadingMessage = 'Đang thực hiện...',
    getDataDirectly = true,
    isAuth = false,
  } = options;

  // current role has no accessible to execute api request
  if (permitRole && permitRole.includes(ERole.GUEST)) {
    return $message.error('Bạn không có quyền truy cập tính năng này!');
  }

  // show loading
  if (isShowLoading) {
    $message.loading({ content: () => loadingMessage, key: MSG_KEY });
  }

  // sent request
  try {
    const targetURL = isAuth ? '/' : '/api/v1';
    axiosConfig.url = uniqueSlash(`${targetURL + config.url}`);
    const response = await service.request(axiosConfig);
    successMsg && $message.success({ content: successMsg, key: MSG_KEY });

    return getDataDirectly ? response.data : response;
  }
  catch (error: any) {
    // show Custom error message
    if (errorMsg) {
      return $message.error({ content: errorMsg, key: MSG_KEY });
    }
    // show server response message
    if (error.response.data) {
      return $message.error({ content: error.response.data, key: MSG_KEY });
    }

    // show common message
    return $message.error({ content: UNKNOWN_ERROR, key: MSG_KEY });
  }
  finally {
    if (!successMsg && !errorMsg) {
      $message.destroy(MSG_KEY);
    }
  }
};
