import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [{
  path: 'demo',
  name: ERouteName.ERROR,
  component: PageContent,
  redirect: '/demo/error-500',
  meta: {
    hiddenInMenu: false,
    title: 'Demo',
  },
  children: [
    {
      path: 'error-500',
      name: ERouteName.ERROR_500,
      component: () => import('@/views/errors/500.vue'),
      meta: {
        hiddenInMenu: false,
        title: 'Error 500',
      },
    },
    {
      path: 'error-404',
      name: ERouteName.ERROR_404,
      component: () => import('@/views/errors/404.vue'),
      meta: {
        hiddenInMenu: false,
        title: 'Error 404',
      },
    },
    {
      path: 'error-403',
      name: ERouteName.ERROR_403,
      component: () => import('@/views/errors/403.vue'),
      meta: {
        hiddenInMenu: false,
        title: 'Error 304',
      },
    },
  ],
}];

export default routes;
