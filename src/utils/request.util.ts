import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message as $message } from 'ant-design-vue';
import { uniqueSlash } from '@/utils/url.util';
import { EStatusCode } from '@/enums/request.enum';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import { useVisibilityStore } from '@/stores/visibility.store';
import { useUserStore } from '@/stores/user.store';
import { UNHANDLED_SERVER_ERROR } from '@/constants/common.constant';

const AUTH_PATH_PREFIX = import.meta.env.VITE_API_AUTH_PREFIX;
const SIGNATURE_PATH_PREFIX = import.meta.env.VITE_API_SIGNATURE_PREFIX;

const service = axios.create({
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = BrowserStorage.get(EStorage.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
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
      BrowserStorage.clear();
      window.location.reload();
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
  config: RequestConfig,
  options: RequestOptions = {},
): Promise<T | null> => {
  const { setLoadingId, removeLoadingId } = useVisibilityStore();
  const userStore = useUserStore();
  // convert request params with 'include' queries
  if (config?.params?.includes && config.params.includes.length > 0) {
    config.params.includes = config.params.includes.toString(); // convert [a,b] to "a,b"
  }

  const axiosConfig: AxiosRequestConfig = { ...config, data: config.body }; // re-assign config 'body' to axios 'data'

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
  if (permitRoles && !permitRoles.includes(userStore.getUserRole!)) {
    return $message.error('Bạn không có quyền truy cập tính năng này!');
  }

  // show loading
  isShowLoading && $message.loading({ content: loadingMessage, key: id });

  // set application loading
  id && setLoadingId(id);

  // sent request
  try {
    const targetURL = isAuth ? AUTH_PATH_PREFIX : SIGNATURE_PATH_PREFIX;
    axiosConfig.url = uniqueSlash(`${targetURL + config.url}`);
    const response = await service.request(axiosConfig);

    // show success message
    if (successMsg && isShowLoading) {
      $message.success({ content: successMsg, key: id });
    }

    // get axiosReponse.data directly or use raw axios response
    return getDataDirectly ? response.data : response;
  }
  catch (error: any) {
    // show injected error message in config
    if (errorMsg) {
      $message.error({ content: errorMsg, key: id });
    }

    // show server error message
    const serverErrorMsg: string = error?.response?.data?.message?.toString() ?? UNHANDLED_SERVER_ERROR;
    $message.error({ content: serverErrorMsg, key: id });

    return null as T;
  }
  finally {
    // if (!successMsg && !errorMsg) {
    //   $message.destroy(id);
    // }
    removeLoadingId(id);
  }
};
