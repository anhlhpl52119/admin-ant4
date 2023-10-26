import type { CustomRoute } from '@/router/typing';

import PageContent from '@/layout/page-content/index.vue';
import { ERouteName } from '@/enums/router.enum';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'user',
    name: ERouteName.RETAILER_USER,
    component: PageContent,
    redirect: '/user/management',
    meta: {
      hiddenInMenu: false,
      title: 'User Info',
      icon: 'i-material-symbols:person-rounded',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      {
        path: 'management',
        name: ERouteName.RETAILER_USER_MANAGEMENT,
        component: () => import('@/views/retailer-management/user/user-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý người dùng',
        },
      },
      {
        path: ':id/details',
        name: ERouteName.RETAILER_USER_DETAIL,
        component: () => import('@/views/demo/demo-button.vue'),
        meta: {
          hiddenInMenu: true,
          title: 'Quản lý người dùng',
        },
        props: route => ({ userId: route?.params?.id?.toString() || '' }),
      },
    ],
  },
];

export default routes;
