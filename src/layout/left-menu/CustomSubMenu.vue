<template>
  <ASubMenu v-if="data.children && data.children.length > 0" :key="data.name">
    <template #title>
      <UserOutlined />
      <span>{{ data.meta.title }}</span>
    </template>
    <CustomSubMenu v-for="item in data.children" :key="item.name" :data="item" />
  </ASubMenu>
  <template v-else>
    <AMenuItem :key="data.name" class="flex-center">
      <PieChartOutlined />
      <RouterLink :to="{ name: data.name }" class="ml-5">
        {{ data.meta.title }}
      </RouterLink>
    </AMenuItem>
  </template>
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
