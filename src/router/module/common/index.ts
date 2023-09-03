import dashboard from './dashboard';
import user from './user';
import management from './management';
import error from './error';
import demo from './demoError';
import driver from './driver';
import branch from './branch';
import { ERouteName } from '@/enums/router.enum';
import MainLayout from '@/layout/index.vue';
import { DEFAULT_ROUTE_PATH } from '@/constants/common.constant';
import type { CustomRoute } from '@/router/typing';

export const commonRoutes: CustomRoute[] = [
  {
    path: '/',
    name: ERouteName.MAIN_LAYOUT,
    component: MainLayout,
    redirect: DEFAULT_ROUTE_PATH,
    meta: {
      hiddenInMenu: false,
      title: 'Home',
      permit: [],
    },
    children: [
      ...driver,
      ...branch,
      ...dashboard,
      ...user,
      ...management,
      ...error,
      ...demo],
  },
];
