import type { App } from 'vue';
import Antd, { Spin } from 'ant-design-vue';
import { h } from 'vue';

// import 'ant-design-vue/dist/reset.css';

// setup
export const setupAntdv = (app: App) => {
  // Spin.setDefaultIndicator({
  //   indicator: h('i', { class: 'i-line-md:downloading-loop text-20' }),
  // });
  app.use(Antd);
};
