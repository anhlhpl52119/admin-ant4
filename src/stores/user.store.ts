import { defineStore } from 'pinia';
import { localStore } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { UserInfo } from '@/apis/user/model';
import type { CustomRoute } from '@/router/typing';
import { ERole } from '@/enums/common.enum';
import { dynamicRouterGenerator } from '@/router/router-factory';

export const useUserStore = defineStore('user-store', () => {
  // state
  const token = ref<string>(localStore.get(EStorage.ACCESS_TOKEN));
  const userInfo = ref<UserInfo>();
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
        // sd
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
    // TODO: add verify token => response user info
    if (!getUserRole.value) {
      return;
    }
    const { menus } = await dynamicRouterGenerator(getUserRole.value);
    userMenu.value = routeToMenu(menus);
  };

  const login = async () => {
    userInfo.value = {
      id: '229b42b7-2945-44d3-8141-a4641c42ee5b',
      email: null,
      username: 'TestDuy',
      last_sign_in_at: null,
      failed_attempts: 0,
      locked_at: null,
      created_at: '2022-12-12T05:32:22.783Z',
      updated_at: '2022-12-21T04:44:02.945Z',
      must_change_password: true,
      initial_password: '123123A@',
      role: ERole.ADMIN,
    };
    token.value = 'dummy token';
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
