import type { CustomRoute } from './typing';
import router from '@/router';
import { commonRoutes } from '@/router/module/common';
import { ERouteName } from '@/enums/router.enum';

const filterRoutesByRole = (routes: CustomRoute[], userRole: API.UserRole) => {
  const result: CustomRoute[] = [];

  routes.forEach((i) => {
    if (!i.meta.permit || i.meta.permit.length === 0) {
      if (!i.children || i.children.length === 0) {
        result.push(i);

        return;
      }
      i.children = filterRoutesByRole(i.children, userRole);
      result.push(i);

      return;
    }

    if (!i.meta.permit.includes(userRole)) {
      return;
    }

    if (!i.children || i.children.length === 0) {
      result.push(i);

      return;
    }

    i.children = filterRoutesByRole(i.children, userRole);
    result.push(i);
  });

  return result;
};

export const dynamicRouterGenerator = async (userRole: API.UserRole) => {
  try {
    const layout = commonRoutes.find(item => item.name === ERouteName.MAIN_LAYOUT)!;
    const userRoutes = filterRoutesByRole(layout.children || [], userRole);
    const menus = [...userRoutes];
    layout.children = userRoutes;
    router.addRoute(layout);

    return Promise.resolve({
      menus,
      routes: layout.children,
    });
  }
  catch (error) {
    return Promise.reject(error);
  }
};
