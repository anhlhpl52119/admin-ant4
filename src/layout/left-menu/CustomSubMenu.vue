<template>
  <ASubMenu :key="data.name">
    <template #title>
      <UserOutlined />
      <span>{{ data.meta.title }}</span>
    </template>

    <AMenuItem v-for="item in data.children" :key="item.name" class="flex-center">
      <PieChartOutlined />
      <RouterLink :to="{ name: item.name }" class="ml-5">
        {{ item.meta.title }}
      </RouterLink>
    </AMenuItem>
  </ASubMenu>
</template>

<script lang="ts" setup>
import {
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import type { CustomRoute } from '@/router/typing';

const props = defineProps<{ data: CustomRoute }>();
const { data } = toRefs(props);
</script>
