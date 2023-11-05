<template>
  <ALayout class="min-h-screen">
    <ALayoutSider
      v-model:collapsed="isCollapsed"
      collapsible :width="250"
      theme="light"
      breakpoint="lg"
    >
      <header class="p-5 h-60">
        <img v-if="isCollapsed" src="~@/assets/img/logo-tai-co-colored.png" class="object-scale-down w-full h-full" alt="logo">
        <img v-else src="~@/assets/img/logo-tai-co-vertical-text.png" class="object-scale-down w-full h-full" alt="logo">
      </header>
      <AMenu
        v-model:openKeys="activeKey"
        :selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
      >
        <template v-for="item in userStore.userMenu" :key="item.name">
          <CustomSubMenu :data="item" />
        </template>
      </AMenu>
    </ALayoutSider>
    <ALayout class="bg-abg">
      <header class="h-64 bg-white flex-center">
        <AButton danger @click="doLogout">
          Admin logout
        </AButton>
      </header>
      <ALayoutContent class="relative p-15 h-full">
        <PageContent />
      </ALayoutContent>
      <CAppDrawer />
      <CAppModal />
      <CAsyncAlertDialog />
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import CustomSubMenu from './left-menu/CustomSubMenu.vue';
import PageContent from '@/layout/sys-layout/page-content/index.vue';
import { useUserStore } from '@/stores/user.store';
import { ERouteName } from '@/enums/router.enum';
import { BrowserStorage } from '@/utils/storage.util';
import type { CustomRoute } from '@/router/typing';
import { authApis } from '@/apis/auth/auth.api';

const routes = useRoute();
const route = useRoute();

const userStore = useUserStore();

const isCollapsed = ref<boolean>(false);
const activeKey = ref<string[]>(
  findParentRouteName(
    userStore.userMenu,
    (routes.name?.toString() as ERouteName) ?? ERouteName.DASHBOARD,
  ),
);
const selectedKeys = computed(() => [routes?.name?.toString() ?? ERouteName.DASHBOARD]);
const _test = computed(() => route.matched);

const doLogout = async () => {
  await authApis.logout();
  BrowserStorage.clear();
  location.reload();
};

function findParentRouteName(
  routes: CustomRoute[],
  activeName: ERouteName,
  parents: ERouteName[] = [],
): ERouteName[] {
  for (const i of routes) {
    if (i.name === activeName) {
      return parents;
    }
    if (i.children && i.children.length > 0) {
      const result = findParentRouteName(i.children, activeName, [...parents, i.name]);
      if (result.length > 0) {
        return result;
      }
    }
  }

  return [];
}
</script>
