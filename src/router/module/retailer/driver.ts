import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: 'driver',
    name: ERouteName.DRIVER,
    component: () => import('@/layout/retailer-layout/page-content/index.vue'),
    redirect: '/driver/driver-management',
    meta: {
      hiddenInMenu: false,
      title: 'Tài xế',
      icon: 'i-healthicons:truck-driver',
    },
    children: [
      {
        path: 'driver-management',
        name: ERouteName.DRIVER_MANAGEMENT,
        component: () => import('@/views/retailer/driver/driver-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý tài xế',
        },
      },
      {
        path: 'group-driver',
        name: ERouteName.DRIVER_GROUP,
        component: () => import('@/views/retailer/group-driver/group-driver-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý nhóm tài xế',
        },
      },
    ],
  },
];

export default routes;
