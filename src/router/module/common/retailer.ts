import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'retailer',
    name: ERouteName.RETAILER,
    component: PageContent,
    redirect: '/retailer/retailer-management',
    meta: {
      hiddenInMenu: false,
      title: 'Nhà bán lẻ',
      icon: 'i-fluent:building-retail-shield-20-filled',
    },
    children: [
      {
        path: 'retailer-management',
        name: ERouteName.RETAILER_MANAGEMENT,
        component: () => import('@/views/retailer/retailer.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản Lý Nhà bán lẻ',
        },
      },
    ],
  },
];

export default routes;
