import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

// setup
export const setupPinia = (app: App) => {
  app.use(store);
};
