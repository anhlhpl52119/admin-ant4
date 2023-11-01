import { type Router } from 'vue-router';

import { Modal } from 'ant-design-vue';
import { EStorage } from '@/enums/cache.enum';

import { useUserStore } from '@/stores/user.store';
import { BrowserStorage } from '@/utils/storage.util';
import {
  DEFAULT_ROLE_ROUTE,
} from '@/constants/common.constant';
import { ERouteName } from '@/enums/router.enum';

export const beforeEach = (router: Router) => {
  const userStore = useUserStore();

  router.beforeEach(async (to, _, next) => {
    coreModal.destroyAll();
    Modal.destroyAll();

    // TODO: refactor
    let tempRoute = '/transaction/transaction-management';
    if (userStore.getUserRole) {
      tempRoute = DEFAULT_ROLE_ROUTE[userStore.getUserRole];
    }

    const token = BrowserStorage.get(EStorage.ACCESS_TOKEN, null);
    if (token) {
      if (to.name === ERouteName.LOGIN) {
        next({ path: tempRoute, replace: true });
      }
      else {
        const hasRoute = router.hasRoute(to.name!);
        if (userStore.userMenu.length === 0) {
          // verify token
          const isAuth = await userStore.verifyUser();
          // verify failed
          if (!isAuth) {
            userStore.resetToken();

            return next({ name: ERouteName.LOGIN });
          }
          // generate user menu on success token verification
          await userStore.setupUserMenu();
          if (!hasRoute) {
            // prevent infinity loop on directly input path
            next({ ...to, replace: true });
          }
          else {
            next();
          }
        }
        else {
          next();
        }
      }
    }
    // no auth
    else {
      if (to.name === ERouteName.LOGIN) {
        next();
      }
      else {
        next({
          name: ERouteName.LOGIN,
          query: { redirect: to.fullPath },
          replace: true,
        });
      }
    }
  });
};
