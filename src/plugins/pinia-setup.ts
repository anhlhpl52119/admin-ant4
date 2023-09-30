import type { App } from 'vue';

const store = createPinia();

// setup
export const setupPinia = (app: App) => {
  app.use(store);
};
