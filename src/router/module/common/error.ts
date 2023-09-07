import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: '/:pathMatch(.*)*',
    name: ERouteName.ERROR,
    component: PageContent,
    redirect: 'ERROR-404',
    meta: {
      hiddenInMenu: true,
      title: 'Error',
    },
    children: [
      {
        path: 'ERROR-404',
        name: ERouteName.ERROR_404,
        component: () => import('@/views/errors/404.vue'),
        meta: {
          hiddenInMenu: true,
          title: 'Error',
        },
      },
    ],
  },
];

export default routes;
