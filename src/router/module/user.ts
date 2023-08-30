import type { CustomRoute } from '@/router/typing';

import PageContent from '@/layout/page-content/index.vue';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [{
  path: 'user',
  name: ERouteName.USER,
  component: PageContent,
  redirect: '/user/page1',
  meta: {
    hiddenInMenu: false,
    title: 'User Info',
    permit: [],
  },
  children: [
    {
      path: 'page1',
      name: ERouteName.USER_PAGE1,
      component: () => import('@/views/home.vue'),
      meta: {
        hiddenInMenu: true,
        title: 'User Info Menu 1',
        permit: [],
      },
    },
    {
      path: 'page2',
      name: ERouteName.USER_PAGE3,
      component: () => import('@/views/dev.vue'),
      meta: {
        hiddenInMenu: false,
        title: 'User Info Menu 2',
        permit: [],
      },
      children: [
        {
          path: 'page999',
          name: ERouteName.USER_PAGE5,
          component: () => import('@/views/dev.vue'),
          meta: {
            hiddenInMenu: false,
            title: 'User Info Menu 5',
            permit: [],
          },
        }],
    },
  ],
}];

export default routes;
