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
    title: 'Dashboard',
  },
  children: [
    {
      path: 'page1',
      name: ERouteName.DASHBOARD_PAGE1,
      component: () => import('@/views/demo/demo-button.vue'),
      meta: {
        hiddenInMenu: true,
        title: 'Dashboard Page 1',
      },
    },
    {
      path: 'page2',
      name: ERouteName.DASHBOARD_PAGE2,
      component: () => import('@/views/demo/dev.vue'),
      meta: {
        hiddenInMenu: false,
        title: 'Dashboard Page 2',
      },
    },
  ],
}];

export default routes;
