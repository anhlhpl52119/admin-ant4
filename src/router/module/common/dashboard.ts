import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'dashboard',
    name: ERouteName.DASHBOARD,
    component: PageContent,
    redirect: '/dashboard/page1',
    meta: {
      hiddenInMenu: true,
      title: 'Dashboard',
      icon: 'i-material-symbols:insert-chart',
    },
    children: [
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
  },
];

export default routes;
