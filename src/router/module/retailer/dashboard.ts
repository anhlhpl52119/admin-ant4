import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: 'dashboard',
    name: ERouteName.DASHBOARD,
    component: () => import('@/layout/retailer-layout/page-content/index.vue'),
    redirect: '/dashboard/overview',
    meta: {
      hiddenInMenu: false,
      title: 'Bàn làm việc',
      icon: 'i-ic:round-insert-chart',
    },
    children: [
      {
        path: 'overview',
        name: ERouteName.RETAILER_DASHBOARD_OVERVIEW,
        component: () => import('@/views/retailer/dashboard/retailer-dashboard.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Thống kê tổng quan',
        },
      },
    ],
  },
];

export default routes;
