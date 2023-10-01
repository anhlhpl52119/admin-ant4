import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'retailer',
    name: ERouteName.RETAILER,
    component: PageContent,
    redirect: '/retailer/management',
    meta: {
      hiddenInMenu: false,
      title: 'Nhà bán lẻ',
      icon: 'i-fluent:building-retail-shield-20-filled',
    },
    children: [
      {
        path: 'management',
        name: ERouteName.RETAILER_MANAGEMENT,
        component: () => import('@/views/retailer/retailer.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý nhà bán lẻ',
        },
      },
      // {
      //   path: 'details',
      //   name: ERouteName.RETAILER_DETAILS,
      //   component: () => import('@/layout/page-details-content/index.vue'),
      //   redirect: '/details/:id/overview',
      //   meta: {
      //     hiddenInMenu: true,
      //     title: 'Chi tiết nhà bán lẻ',
      //   },
      //   children: [
      //     {
      //       path: ':id/overview',
      //       name: ERouteName.RETAILER_DETAILS_OVERVIEW,
      //       component: () => import('@/views/retailer/retailer-details.vue'),
      //       meta: {
      //         hiddenInMenu: true,
      //         title: 'Chi tiết nhà bán lẻ',
      //       },
      //     },
      //   ],
      // },
    ],
  },
];

export default routes;
