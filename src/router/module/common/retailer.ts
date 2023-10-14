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
      //   path: ':id',
      //   name: ERouteName.RETAILER_DETAILS,
      //   component: () => import('@/layout/page-details-content/index.vue'),
      //   redirect: '/:id/details',
      //   meta: {
      //     hiddenInMenu: true,
      //     title: 'Chi tiết nhà bán lẻ',
      //   },
      //   children: [
      //     {
      //       path: 'details',
      //       name: ERouteName.RETAILER_DETAILS_OVERVIEW,
      //       component: () => import('@/views/retailer/retailer-details.vue'),
      //       meta: {
      //         hiddenInMenu: true,
      //         title: 'Chi tiết nhà bán lẻ',
      //       },
      //     },
      //   ],
      // },
      {
        path: ':id/details',
        name: ERouteName.RETAILER_DETAILS,
        component: () => import('@/pages/details/retailer-details.vue'),
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
