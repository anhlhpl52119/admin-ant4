import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { presetAttributify, presetIcons, presetUno } from 'unocss';

// const url = import.meta.env.VITE_BASE_API_URL;
// const auth = import.meta.env.VITE_API_AUTH_PREFIX;
// const base = import.meta.env.VITE_API_VERSION_PREFIX;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      dts: './auto/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    AutoImport({
      dts: './auto/auto-imports.d.ts',
      imports: [
        'vue', 'vue-router',
      ],
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
        additionalData: '@import "@/styles/variables.less";',
      },
    },
  },
  server: {
    port: 3001,
    host: true,
    proxy: {
      // [base]: {
      //   target: url,
      //   changeOrigin: true,
      // },
      // [auth]: {
      //   target: url,
      //   changeOrigin: true,
      // },
      '/api/v1/': {
        target: 'https://ecom-api.sonnguyenauto.com',
        changeOrigin: true,
      },
      '/authentication/': {
        target: 'https://ecom-api.sonnguyenauto.com',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
