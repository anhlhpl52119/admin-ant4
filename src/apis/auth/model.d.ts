declare namespace API {

  type UserRole = 'sys' | 'manager' | 'user' |  'driver'

  type LoginRequestBody = {
    email: string;
    password: string;
    refresh: boolean;
  };

  type UserLoginInfo = {
    id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
    phone: string;
    role: UserRole;
  };

  type UserAuthCheckResponse = ApiObjectResponse<{
    user: UserLoginInfo
  }>

  type UserLogin = {
    status: {
      code: number;
      message: string;
      data: {
        user: UserLoginInfo;
      };
    };
  };

  type LoginResponse = ApiRawResponse<UserLogin>;
}