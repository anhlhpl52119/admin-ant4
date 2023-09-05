import { createApp } from 'vue';

import App from './App.vue';
import * as plugins from '@/plugins';
import { setupRouter } from '@/router';

const app = createApp(App);

const setupPlugin = () => {
  plugins.setupAssets();
  plugins.setupAntdv(app);
  plugins.setupPinia(app);
};

const setupApp = async () => {
  await setupRouter(app);
};

setupPlugin();
await setupApp();
app.mount('#app');
