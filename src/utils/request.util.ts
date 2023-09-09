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
import { EStatusCode } from '@/enums/request.enum';
import type { EApiId, ERequestMethod } from '@/enums/request.enum';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import { useApplicationStore } from '@/stores/application.store';

interface Config {
  url: string
  method: ERequestMethod
  body?: any
  params?: any
  timeout?: number
}
interface RequestOptions {
  id?: EApiId
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
  timeout: 60000,
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
export const request = async <T>(
  config: Config,
  options: RequestOptions = {},
): Promise<T | null> => {
  const appStore = useApplicationStore();

  // convert request params with 'include' queries
  if (config?.params?.includes && config.params.includes.length > 0) {
    config.params.includes = config.params.includes.toString(); // convert [a,b] to "a,b"
  }

  const axiosConfig: AxiosRequestConfig = { ...config, data: config.body }; // re-assign config 'body' to axios 'data'

  //
  const {
    id,
    errorMsg,
    permitRoles,
    successMsg,
    isShowLoading,
    loadingMessage = 'Đang thực hiện...',
    getDataDirectly = true,
    isAuth = false,
  } = options;

  // current role has no accessible to execute api request
  if (permitRoles && permitRoles.includes(ERole.GUEST)) {
    return $message.error('Bạn không có quyền truy cập tính năng này!');
  }

  // show loading
  isShowLoading && $message.loading({ content: () => loadingMessage, key: id });

  // set application loading
  id && appStore.setLoadingId(id);

  // sent request
  try {
    const targetURL = isAuth ? '/' : '/api/v1';
    axiosConfig.url = uniqueSlash(`${targetURL + config.url}`);
    const response = await service.request(axiosConfig);

    if (successMsg && isShowLoading) {
      $message.success({ content: successMsg, key: id });
    }

    return getDataDirectly ? response.data : response;
  }
  catch (error: any) {
    // show injected error message in config
    if (errorMsg) {
      $message.error({ content: errorMsg, key: id });
    }
    // show server response message
    if (error.response.data) {
      $message.error({ content: error.response.data, key: id });
    }

    // show common message
    $message.error({ content: UNKNOWN_ERROR, key: id });

    return null as T;
  }
  finally {
    // await sleepFor(2000);
    if (!successMsg && !errorMsg) {
      $message.destroy(id);
    }
    appStore.removeLoadingId(id);
  }
};
