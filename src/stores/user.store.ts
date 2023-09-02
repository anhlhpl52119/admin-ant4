import { defineStore } from 'pinia';
import { localStore, sessionStore } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { CustomRoute } from '@/router/typing';

// import { ERole } from '@/enums/common.enum';
import { dynamicRouterGenerator } from '@/router/router-factory';
import { authApis } from '@/apis/auth/auth.api';

export const useUserStore = defineStore('user-store', () => {
  // state
  const token = ref<string>(localStore.get(EStorage.ACCESS_TOKEN));
  const userInfo = ref<any>({ role: 'sd' });
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

  const setupUserMenu = async () => {
    if (!getUserRole.value) {
      return;
    }
    const { menus } = await dynamicRouterGenerator(getUserRole.value);
    userMenu.value = routeToMenu(menus);
  };

  const login = async (user: LoginRequestBody) => {
    const auth = await authApis.login(user);
    if (typeof auth.headers.getAuthorization === 'function') {
      const token = auth.headers.getAuthorization();
      sessionStore.setCookie(EStorage.ACCESS_TOKEN, token);
    }
    await setupUserMenu();
  };

  return {
    getToken,
    userMenu,
    getUserInfo,
    getUserRole,

    login,
    setupUserMenu,
  };
});
