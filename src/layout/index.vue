<template>
  <ALayout class="min-h-screen">
    <ALayoutSider v-model:collapsed="isCollapsed" collapsible :width="250" theme="light">
      <AMenu
        v-model:openKeys="activeKey"
        :selected-keys="selectedKeys"
        theme="light"
        mode="inline"
      >
        <template v-for="item in userStore.userMenu" :key="item.name">
          <CustomSubMenu :data="item" />
        </template>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <header class="h-64 bg-white flex-center">
        <AButton danger @click="doLogout"> Log out </AButton>
      </header>
      <ALayoutContent class="relative">
        <div class="card bg-white min-h-360 m-16">
          <PageContent />
          <AppDrawer />
        </div>
      </ALayoutContent>
      <!-- <ALayoutFooter class="text-center">
        Footer
      </ALayoutFooter> -->
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import CustomSubMenu from './left-menu/CustomSubMenu.vue';
import PageContent from '@/layout/page-content/index.vue';
import { useUserStore } from '@/stores/user.store';
import { ERouteName } from '@/enums/router.enum';
import { BrowserStorage } from '@/utils/storage.util';
import { EStorage } from '@/enums/cache.enum';
import type { CustomRoute } from '@/router/typing';

const routes = useRoute();
const userStore = useUserStore();

const isCollapsed = ref<boolean>(false);
const activeKey = ref<string[]>(
  findParentRouteName(
    userStore.userMenu,
    (routes.name?.toString() as ERouteName) ?? ERouteName.DASHBOARD,
  ),
);
const selectedKeys = computed(() => [routes?.name?.toString() ?? ERouteName.DASHBOARD]);

const doLogout = () => {
  BrowserStorage.removeCookie(EStorage.ACCESS_TOKEN);
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
