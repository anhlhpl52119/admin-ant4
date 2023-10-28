import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'driver',
    name: ERouteName.DRIVER,
    component: PageContent,
    redirect: '/driver/driver-management',
    meta: {
      hiddenInMenu: false,
      title: 'Tài xế',
      icon: 'i-healthicons:truck-driver',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      // {
      //   path: 'driver-management',
      //   name: ERouteName.DRIVER_MANAGEMENT,
      //   component: () => import('@/views/retailer-management/driver/driver-management.vue'),
      //   meta: {
      //     hiddenInMenu: false,
      //     title: 'Quản lý tài xế',
      //     permit: [ERole.RETAILER_MANAGER],
      //   },
      // },
      {
        path: 'driver-group',
        name: ERouteName.DRIVER_GROUP,
        component: () => import('@/views/retailer-management/group-driver/group-driver-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Nhóm tài xế',
          permit: [ERole.RETAILER_MANAGER],
        },
      },
    ],
  },
];

export default routes;
