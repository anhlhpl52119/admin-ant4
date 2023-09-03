<template>
  <ALayout class="min-h-screen">
    <!-- <div class="bg-white m-24 h-40" /> -->
    <ALayoutSider v-model:collapsed="collapsed" collapsible :width="250">
      <AMenu v-model:openKeys="activeKey" :selected-keys="selectedKeys" theme="dark" mode="inline">
        <template v-for="item in userStore.userMenu" :key="item.name">
          <CustomSubMenu :data="item" />
        </template>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <header class="h-64 bg-white" />
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

const routes = useRoute();
const userStore = useUserStore();
const collapsed = ref<boolean>(false);
const activeKey = ref<string[]>([ERouteName.DASHBOARD]);
const selectedKeys = computed(() =>
  [routes?.name?.toString() ?? ERouteName.DASHBOARD],
);
</script>
