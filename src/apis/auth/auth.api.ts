import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const authApis = {
  login: (bodyParams: API.LoginRequestBody) => {
    const body = { user: { ...bodyParams } };

    return request<API.LoginResponse>(
      {
        url: '/login',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.LOGIN,
        successMsg: 'Đăng nhập thành công',
        isShowLoading: true,
        isAuth: true,
        getDataDirectly: false,
      },
    );
  },
  logout: () => {
    return request(
      {
        url: '/logout',
        method: ERequestMethod.DELETE,
      },
      {
        getDataDirectly: false,
        isAuth: true,
      },
    );
  },
};
