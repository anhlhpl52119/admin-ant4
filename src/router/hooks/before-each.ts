import { type Router } from 'vue-router';

// import NProgress from 'nprogress';

// import { useUserAuth } from '@/stores/auth';
// import { DefaultRoutes } from '@/enums/route-name';
import { EStorage } from '@/enums/cache.enum';
import { useUserStore } from '@/stores/user.store';
import { localStore } from '@/utils/storage.util';

export const beforeEach = (router: Router) => {
//   router.beforeEach(async (to, _, next) => {
//     // NProgress.start();
//     const authStore = useUserAuth();
//     const token = localStore.get(EStorage.ACCESS_TOKEN);
//     if (token) {
//       try {
//         await authStore.afterLogin();l
//       }
//       catch (error) {
//         authStore.resetToken();
//       }
//       const hasRoute = router.hasRoute(to.name!);
//       if (to.name === DefaultRoutes.Default) {
//         next({ path: '/' });
//       }
//       else {
//         if (!hasRoute) {
//           next({ ...to, replace: true });
//         }
//         else {
//           next();
//         }
//       }
//     }
//     else {
//       const hasRoute = router.hasRoute(to.name!);
//       if (hasRoute) {
//         next();
//       }
//       else {
//         next({ name: DefaultRoutes.Default, replace: true });
//       }
//     }
//   });
  router.beforeEach(async (to, _, next) => {
    const token = localStore.get(EStorage.ACCESS_TOKEN);
    const userStore = useUserStore();
    await userStore.login();
    console.log('to', to);
    next();
  });
};
