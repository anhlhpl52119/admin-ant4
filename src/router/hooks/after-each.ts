import { type Router } from 'vue-router';

// import NProgress from 'nprogress';

// https://www.npmjs.com/package/nprogress

export const afterEach = (router: Router) => {
  router.afterEach((to, from) => {
    if (to.path !== from.path) {
      // TODO: add NProgress done
    // NProgress.done(); // End progress bar
      document.documentElement.scrollTop = 0;
    }
  });
};
