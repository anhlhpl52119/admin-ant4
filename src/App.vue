<template>
  <AConfigProvider :locale="viVN" :theme="seedTokenGlobalConfig">
    <RouterView :key="$route.fullPath" #="{ Component }">
      <Component :is="Component" />
      <CAppDrawer />
      <CAppModal />
      <CAsyncAlertDialog />
    </RouterView>
  </AConfigProvider>
</template>

<script lang="ts" setup>
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import viVN from 'ant-design-vue/es/locale/vi_VN';

const seedTokenGlobalConfig: ThemeConfig = {
  components: {
    Checkbox: {
      colorPrimary: '#12a38e',
    },
  },
  token: {
    colorPrimary: '#12a38e',
  },
};
</script>
