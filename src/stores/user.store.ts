import { message } from 'ant-design-vue';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { CustomRoute } from '@/router/typing';
import { dynamicRouterGenerator } from '@/router/router-factory';
import { authApis } from '@/apis/auth/auth.api';

export const useUserStore = defineStore('user-store', () => {
  // state
  const userInfo = ref<API.UserLoginInfo | null>();
  const userMenu = ref<CustomRoute[]>([]);

  // getter
  const userToken = computed(() => BrowserStorage.getCookie(EStorage.ACCESS_TOKEN));
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
    if (!(typeof res.headers.getAuthorization === 'function')) {
      message.error('Không tìm thấy token');

      return;
    }
    const responseToken = res.headers.getAuthorization();
    if (!responseToken) {
      return;
    }
    const rawToken = responseToken.toString().replace(/Bearer\s*/g, ''); // remove "Bearer"

    BrowserStorage.setCookie(EStorage.ACCESS_TOKEN, rawToken);
    await setupUserMenu();
  };

  return {
    userToken,
    userMenu,
    getUserInfo,
    getUserRole,

    verifyUser,
    login,
    setupUserMenu,
  };
});
