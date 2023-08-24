import type { App } from 'vue';
import Antd from 'ant-design-vue';

// import '@unocss/reset/tailwind.css';
import 'ant-design-vue/dist/reset.css';

// import '@/styles/ant-design.less';

// setup
export const setupAntdv = (app: App) => {
  app.use(Antd);
};
