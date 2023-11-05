import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import router from '@/router';
import { uniqueSlash } from '@/utils/url.util';

const filterRoutesByRole = (routes: CustomRoute[], role: API.UserRole) => {
  const result: CustomRoute[] = [];

  routes.forEach((route) => {
    const perms = route.meta.permit;
    const childRoutes = route.children;

    // no permit roles specify for current routes
    if (!perms || perms.length === 0 || perms.includes(role)) {
      if (childRoutes && childRoutes.length > 0) {
        // deep filter
        route.children = filterRoutesByRole(route.children, role);
      }

      result.push(route);
    }
  });

  return result;
};

export const generatorNamePath = (
  routes: CustomRoute[],
  namePath?: string[],
  parent?: CustomRoute,
) => {
  routes.forEach((item) => {
    if (item.meta && typeof item.name === 'string') {
      item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : [item.name];
      item.meta.fullPath = parent?.meta?.fullPath
        ? [parent.meta.fullPath, item.path].join('/')
        : item.path;
      item.meta.fullPath = uniqueSlash(item.meta.fullPath as string);

      if (item.children?.length) {
        generatorNamePath(item.children, item.meta.namePath as string[], item);
      }
    }
  });
};

export const dynamicRouterGenerator = async (userRole: API.UserRole) => {
  let newImpRoutes: CustomRoute;
  if (userRole === 'sys') {
    const { sysRoutes } = await import('@/router/module/sys-admin');
    newImpRoutes = sysRoutes;
  }
  else {
    const { retailerRoutes } = await import('@/router/module/retailer');
    newImpRoutes = retailerRoutes;
  }
  try {
    const childRoute = newImpRoutes?.children ?? [];
    const removeRoute = router.addRoute(newImpRoutes);
    const item = filterRoutesByRole(childRoute, userRole);
    removeRoute();
    newImpRoutes.children = [...item];
    router.addRoute(newImpRoutes);
    router.removeRoute(ERouteName.LOGIN);
    return Promise.resolve({
      routes: newImpRoutes.children,
    });
  }
  catch (error) {
    return Promise.reject(new Error('Router error'));
  }
};
