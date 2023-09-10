import { type Router } from 'vue-router';

import { Modal } from 'ant-design-vue';
import { EStorage } from '@/enums/cache.enum';

import { useUserStore } from '@/stores/user.store';
import { BrowserStorage } from '@/utils/storage.util';
import { DEFAULT_ROUTE_PATH } from '@/constants/common.constant';
import { ERouteName } from '@/enums/router.enum';

export const beforeEach = (router: Router) => {
  const userStore = useUserStore();
  router.beforeEach(async (to, _, next) => {
    Modal.destroyAll();

    const token = BrowserStorage.getCookie(EStorage.ACCESS_TOKEN);
    const hasRoute = router.hasRoute(to.name!);

    // un-authen
    if (!token || token === '' || token === '0') {
      if (to.name === ERouteName.LOGIN) {
        return next();
      }

      return next({ name: ERouteName.LOGIN });
    }

    if (!hasRoute) {
      await userStore.setupUserMenu();

      return next({ ...to, replace: true });
    }

    if (userStore.userMenu.length === 0) {
      await userStore.setupUserMenu();

      return next({ path: DEFAULT_ROUTE_PATH });
    }

    next();
  });
};
