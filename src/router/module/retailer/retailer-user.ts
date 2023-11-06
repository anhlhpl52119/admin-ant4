import type { CustomRoute } from '@/router/typing';

import PageContent from '@/layout/retailer-layout/page-content/index.vue';
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
      title: 'Quản lý người dùng',
      icon: 'i-svg:group-users',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      {
        path: 'management',
        name: ERouteName.RETAILER_USER_MANAGEMENT,
        component: () => import('@/views/retailer/user/user-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Danh sách người dùng',
        },
      },
    ],
  },
];

export default routes;
