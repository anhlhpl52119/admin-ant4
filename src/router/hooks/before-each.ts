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
    coreModal.destroyAll();
    Modal.destroyAll();

    const token = BrowserStorage.get(EStorage.ACCESS_TOKEN);
    // un-auth
    if (!token) {
      if (to.name === ERouteName.LOGIN) {
        next();

        return;
      }
      next({ name: ERouteName.LOGIN, replace: true });

      return;
    }

    const hasRoute = router.hasRoute(to.name!);

    if (!hasRoute || userStore.userMenu.length === 0) {
      await userStore.setupUserMenu();
      next({ ...to, replace: true });

      return;
    }

    next();
  });
};
