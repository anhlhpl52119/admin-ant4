import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [{
  path: 'dashboard',
  name: ERouteName.DASHBOARD,
  component: PageContent,
  redirect: '/dashboard/page1',
  meta: {
    hiddenInMenu: false,
  },
  children: [
    {
      path: 'page1',
      name: ERouteName.DASHBOARD_PAGE1,
      component: () => import('@/views/home.vue'),
      meta: {
        hiddenInMenu: false,
      },
    },
    {
      path: 'page2',
      name: ERouteName.DASHBOARD_PAGE2,
      component: () => import('@/views/dev.vue'),
      meta: {
        hiddenInMenu: false,
      },
    },
  ],
}];

export default routes;
