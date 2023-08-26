<template>
  <ALayout class="min-h-screen">
    <ALayoutSider v-model:collapsed="collapsed" collapsible>
      <div class="bg-white m-24 h-40" />
      <AMenu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <AMenuItem key="1">
          <PieChartOutlined />
          <span>Option 1</span>
        </AMenuItem>
        <ASubMenu key="sub1">
          <template #title>
            <UserOutlined />
            <span>User</span>
          </template>
          <AMenuItem key="3">
            Tom
          </AMenuItem>
          <AMenuItem key="4">
            Bill
          </AMenuItem>
          <AMenuItem key="5">
            Alex
          </AMenuItem>
        </ASubMenu>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <header class="h-64" bg-white />
      <ALayoutContent class="m-16">
        <div class="card bg-white min-h-360">
          <RouterView />
        </div>
      </ALayoutContent>
      <ALayoutFooter class="text-center">
        Ant Design ©2018 Created by Ant UED
      </ALayoutFooter>
    </ALayout>
  </ALayout>
</template>

<script lang="ts" setup>
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
</script>
