import { defineStore } from 'pinia';
import { localStore } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { UserInfo } from '@/apis/user/model';
import type { CustomRoute } from '@/router/typing';

export const useUserStore = defineStore('user-store', () => {
  const token = ref<string>(localStore.get(EStorage.ACCESS_TOKEN));
  const userInfo = ref<UserInfo>();
  const userMenu = ref<CustomRoute[]>([]);

  const getToken = computed(() => token.value);
  const getUserInfo = computed(() => userInfo.value);
  const getUserRole = computed(() => userInfo.value?.role);

  return {
    getToken,
    userMenu,
    getUserInfo,
    getUserRole,
  };
});
