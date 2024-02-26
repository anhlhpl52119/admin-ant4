import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: 'my-info',
    name: ERouteName.RETAILER_INFO,
    component: () => import('@/layout/retailer-layout/page-content/index.vue'),
    redirect: '/my-info/details',
    meta: {
      hiddenInMenu: true,
      title: 'Tài khoản',
    },
    children: [
      {
        path: 'details',
        name: ERouteName.RETAILER_INFO_DETAIL,
        component: () => import('@/views/retailer/my-info/retailer-my-info-details.vue'),
        meta: {
          hiddenInMenu: true,
          title: 'Thông tin tài khoản',
        },
      },
    ],
  },
];

export default routes;
