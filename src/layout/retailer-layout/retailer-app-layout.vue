<template>
  <section class="h-full flex items-stretch">
    <!-- Side bar -->
    <aside>
      <!-- Logo -->
      <div class="p-5 h-60">
        <img v-if="isCollapsed" src="~@/assets/img/logo-tai-co-colored.png" class="object-scale-down w-full h-full" alt="logo">
        <img v-else src="~@/assets/img/logo-tai-co-vertical-text.png" class="object-scale-down w-full h-full" alt="logo">
      </div>
      <!-- User menu -->
      <AMenu
        v-model:openKeys="activeKey"
        :selectedKeys="selectedKeys"
        :inlineCollapsed="isCollapsed"
        theme="light"
        mode="inline"
      >
        <!-- Sub menu -->
        <template v-for="item in userStore.userMenu" :key="item.name">
          <CustomSubMenu :data="item" />
        </template>
      </AMenu>
    </aside>

    <!-- Main page -->
    <article class="flex-grow pb-10 flex flex-col">
      <!-- Header -->
      <RetailerLayoutHeader />

      <!-- Content -->
      <main class="p-12 bg-abg overflow-auto flex-grow">
        <PageContent />
      </main>
    </article>
  </section>
</template>

<script lang="ts" setup>
import CustomSubMenu from './left-menu/CustomSubMenu.vue';
import RetailerLayoutHeader from './header/RetailerLayoutHeader.vue';
import PageContent from '@/layout/retailer-layout/page-content/index.vue';
import { useUserStore } from '@/stores/user.store';
import { ERouteName } from '@/enums/router.enum';
import type { CustomRoute } from '@/router/typing';

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
