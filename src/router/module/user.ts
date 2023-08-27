import type { CustomRoute } from '@/router/typing';

import MainLayout from '@/layout/index.vue';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [{
  path: 'user',
  name: ERouteName.USER,
  component: MainLayout,
  redirect: '/user/page1',
  meta: {
    hiddenInMenu: false,
    permit: [],
  },
  children: [
    {
      path: 'page1',
      name: ERouteName.USER_PAGE1,
      component: () => import('@/views/home.vue'),
      meta: {
        hiddenInMenu: false,
        permit: [],
      },
    },
    {
      path: 'page2',
      name: ERouteName.USER_PAGE3,
      component: () => import('@/views/dev.vue'),
      meta: {
        hiddenInMenu: false,
        permit: [],
      },
    },
  ],
}];
// const routes: CustomRoute[] = [];

export default routes;
