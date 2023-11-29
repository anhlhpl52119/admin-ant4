import { message } from 'ant-design-vue';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { CustomRoute } from '@/router/typing';
import { dynamicRouterGenerator } from '@/router/hooks/router-generator';
import { authApis } from '@/apis/auth/auth.api';

export const useUserStore = defineStore('user-store', () => {
  // state
  const userInfo = ref<API.UserLoginInfo | null>();
  const userMenu = ref<CustomRoute[]>([]);

  // getter
  const userToken = computed(() => BrowserStorage.get(EStorage.ACCESS_TOKEN));
  const getUserInfo = computed(() => userInfo.value);
  const getUserRole = computed(() => userInfo.value?.role);

  const routeToMenu = (arr: CustomRoute[]) => {
    const result: CustomRoute[] = [];
    arr.forEach((i) => {
      if (i.meta.hiddenInMenu) {
        return;
      }
      if (!i.children || i.children.length === 0) {
        result.push(i);

        return;
      }
      i.children = routeToMenu(i.children);
      result.push(i);
    });

    return result;
  };

  const resetToken = () => {
    userInfo.value = null;
    userMenu.value = [];
    BrowserStorage.clear();
  };

  const verifyUser = async () => {
    const res = await authApis.currentUser();
    if (!(res && res?.data?.user)) {
      return false;
    }
    userInfo.value = res.data.user;
    // TODO: check whether current user need to change password
    // default_password_chagne_at = null => redirect change password page

    return true;
  };

  const setupUserMenu = async () => {
    if (!getUserRole.value) {
      message.error('Không thể định danh người dùng để tạo trang điều hướng');
      resetToken();

      return;
    }
    const { routes } = await dynamicRouterGenerator(getUserRole.value);
    userMenu.value = routeToMenu(routes);
  };

  const login = async (loginBody: API.LoginRequestBody) => {
    const res = await authApis.login(loginBody);
    if (!res) {
      return;
    }
    userInfo.value = res?.data?.status?.data?.user;
    // get token in header
    if (!(typeof res.headers.getAuthorization === 'function')) {
      message.error('Người dùng chưa đăng nhập');

      return;
    }
    const responseToken = res.headers.getAuthorization();
    if (!responseToken) {
      return;
    }
    const rawToken = responseToken.toString().replace(/Bearer\s*/g, ''); // remove "Bearer"

    BrowserStorage.set(EStorage.ACCESS_TOKEN, rawToken);
    await setupUserMenu();
  };

  return {
    userToken,
    userMenu,
    getUserInfo,
    getUserRole,

    verifyUser,
    login,
    resetToken,
    setupUserMenu,
  };
});
