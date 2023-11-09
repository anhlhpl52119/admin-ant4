import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/retailer-layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'my-info',
    name: ERouteName.RETAILER_INFO,
    component: () => PageContent,
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
