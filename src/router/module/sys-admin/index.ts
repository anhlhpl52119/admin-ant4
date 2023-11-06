import retailer from './retailer';
import errorPage from './error';
import development from './demo/development';
import { ERouteName } from '@/enums/router.enum';
import sysAdminLayout from '@/layout/sys-layout/sys-admin-app-layout.vue';
import type { CustomRoute } from '@/router/typing';

export const sysRoutes: CustomRoute = {
  path: '/',
  name: ERouteName.MAIN_LAYOUT,
  component: sysAdminLayout,
  redirect: '/retailer',
  meta: {
    hiddenInMenu: false,
    title: 'Home',
    permit: [],
  },
  children: [
    ...retailer,
    ...errorPage,
    ...development,
    {
      path: '/:pathMatch(.*)*',
      name: ERouteName.NOT_FOUND,
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
