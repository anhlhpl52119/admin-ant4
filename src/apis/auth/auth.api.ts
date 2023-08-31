import { RequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const authApis = {
  login: (bodyParams: LoginRequestBody) => {
    const body = { user: { ...bodyParams } };
    return request<LoginResponse>({
      url: '/login',
      method: RequestMethod.POST,
      body,
    },
    {
      successMsg: 'Đăng nhập thành công',
      isShowLoading: true,
    });
  },
};
