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
    role: UserRole;
  };

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
