import type { App } from 'vue';
import Antd from 'ant-design-vue';

// setup
export const setupAntdv = (app: App) => {
  app.use(Antd);
};
