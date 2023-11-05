import branch from './branch';
import driver from './driver';
import transaction from './transaction';
import retailerUser from './retailer-user';
import errorPage from './error';
import { ERouteName } from '@/enums/router.enum';
import retailerLayout from '@/layout/retailer-layout/retailer-app-layout.vue';
import type { CustomRoute } from '@/router/typing';

export const retailerRoutes: CustomRoute = {
  path: '/',
  name: ERouteName.MAIN_LAYOUT,
  component: retailerLayout,
  redirect: '/transaction',
  meta: {
    hiddenInMenu: false,
    title: 'Home',
    permit: [],
  },
  children: [
    ...transaction,
    ...branch,
    ...driver,
    ...retailerUser,
    ...errorPage,
    {
      path: '/:pathMatch(.*)*',
      name: ERouteName.ERROR_404,
      meta: {
        title: 'Not Found Page',
        hiddenInMenu: true,
      },
      redirect: '/error/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
      children: [],
    },
  ],
};
