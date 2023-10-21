import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { CustomRoute } from '@/router/typing';
import { dynamicRouterGenerator } from '@/router/router-factory';
import { authApis } from '@/apis/auth/auth.api';

export const useUserStore = defineStore('user-store', () => {
  // state
  const token = ref<string>(BrowserStorage.getCookie(EStorage.ACCESS_TOKEN));
  const userInfo = ref<API.UserLoginInfo | null>();
  const userMenu = ref<CustomRoute[]>([]);

  // getter
  const getToken = computed(() => token.value);
  const getUserInfo = computed(() => userInfo.value);
  const getUserRole = computed(() => userInfo.value?.role);

  // action
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

  const verifyUser = async () => {
    const res = await authApis.currentUser();
    if (!(res && res?.data?.user)) {
      return;
    }
    userInfo.value = res.data.user;
  };

  const setupUserMenu = async () => {
    if (!getUserRole.value) {
      await verifyUser();
      await setupUserMenu();

      return;
    }
    const { menus } = await dynamicRouterGenerator(getUserRole.value);
    userMenu.value = routeToMenu(menus);
  };

  const login = async (loginBody: API.LoginRequestBody) => {
    const res = await authApis.login(loginBody);
    if (!res) {
      return;
    }
    userInfo.value = res?.data?.status?.data?.user;
    // get token in header
    if (typeof res.headers.getAuthorization === 'function') {
      const token = res.headers.getAuthorization();
      BrowserStorage.setCookie(EStorage.ACCESS_TOKEN, token);
    }
    await setupUserMenu();
  };

  return {
    getToken,
    userMenu,
    getUserInfo,
    getUserRole,

    verifyUser,
    login,
    setupUserMenu,
  };
});
