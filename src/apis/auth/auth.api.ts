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
        getDataDirectly: false, // response raw axios with header Authorization
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
        isAuth: true,
      },
    );
  },
  currentUser: () => {
    return request<API.UserAuthCheckResponse>(
      {
        url: '/common/user/current',
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.CURRENT_USER,
      },
    );
  },
  changePassword: (rqBody: API.ChangePasswordRequestBody) => {
    const body = { user: rqBody };
    return request<ApiRawResponse<ApiSuccessResponse>>(
      {
        url: '/common/user/change_password',
        body,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.LOGIN,
        isShowLoading: true,
        successMsg: 'Thành công!',
        getDataDirectly: false, // response raw axios with header Authorization
      },
    );
  },
};
