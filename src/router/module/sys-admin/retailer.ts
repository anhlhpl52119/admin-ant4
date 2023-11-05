import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: 'retailer',
    name: ERouteName.RETAILER,
    component: () => import('@/layout/sys-layout/page-content/index.vue'),
    redirect: '/retailer/management',
    meta: {
      hiddenInMenu: false,
      title: 'Nhà bán lẻ',
      icon: 'i-fluent:building-retail-shield-20-filled',
      permit: ['sys'],
    },
    children: [
      {
        path: 'management',
        name: ERouteName.RETAILER_MANAGEMENT,
        component: () => import('@/views/sys-admin/retailer-management/retailer.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý nhà bán lẻ',
        },
      },
      {
        path: '/:id/details',
        name: ERouteName.RETAILER_DETAILS,
        component: () => import('@/views/sys-admin/retailer-management/retailer-details.vue'),
        meta: {
          hiddenInMenu: true,
          title: 'Chi tiết nhà bán lẻ',
        },
        props: route => ({ retailerId: route?.params?.id?.toString() || '' }),
      },
    ],
  },
];

export default routes;
