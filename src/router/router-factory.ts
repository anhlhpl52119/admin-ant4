import type { CustomRoute } from './typing';
import type { ERole } from '@/enums/common.enum';
import router from '@/router';
import { commonRoutes } from '@/router/module/common';
import { ERouteName } from '@/enums/router.enum';

const filterRoutesByRole = (arr: CustomRoute[], userRole: ERole) => {
  const result: CustomRoute[] = [];
  arr.forEach((i) => {
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

export const dynamicRouterGenerator = async (userRole: ERole) => {
  try {
    const layout = commonRoutes.find((item) => item.name === ERouteName.MAIN_LAYOUT)!;
    const userRoutes = filterRoutesByRole(layout.children || [], userRole);
    const menus = [...userRoutes];
    router.addRoute(layout);

    return Promise.resolve({
      menus,
      routes: layout.children,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
