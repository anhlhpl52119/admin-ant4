<template>
  <ALayout class="min-h-screen">
    <div class="bg-white m-24 h-40" />
    <ALayoutSider v-model:collapsed="collapsed" collapsible :width="250">
      <AMenu v-model:openKeys="activeKey" :selected-keys="selectedKeys" theme="dark" mode="inline">
        <template v-for="item in userStore.userMenu" :key="item.name">
          <CustomMenuItem v-if="!item.children || item.children.length === 0" :data="item" />
          <CustomSubMenu v-else :data="item" />
        </template>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <header class="h-64 bg-white" />
      <ALayoutContent class="m-16">
        <div class="card bg-white min-h-360">
          <PageContent />
        </div>
      </ALayoutContent>
      <ALayoutFooter class="text-center">
        Ant Design ©2018 Created by Ant UED
      </ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import CustomMenuItem from './left-menu/CustomMenuItem.vue';
import CustomSubMenu from './left-menu/CustomSubMenu.vue';
import PageContent from '@/layout/page-content/index.vue';
import { useUserStore } from '@/stores/user.store';
import { ERouteName } from '@/enums/router.enum';

const routes = useRoute();
const userStore = useUserStore();
const collapsed = ref<boolean>(false);
const activeKey = ref<string[]>([ERouteName.DASHBOARD, ERouteName.MANAGEMENT]);
const selectedKeys = computed(() =>
  [routes?.name?.toString() ?? ERouteName.DASHBOARD],
);

// watch(selectedKeys, (val) => {
//   console.log(val);
//   console.log('route', routes.name);
// });
</script>
