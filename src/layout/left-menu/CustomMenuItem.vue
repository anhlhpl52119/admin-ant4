<template>
  <AMenuItem :key="data.name" class="flex-center">
    <PieChartOutlined />
    <!-- <span>{{ data.meta.title }}</span> -->
    <RouterLink :to="{ name: data.name }" class="ml-5">
      {{ data.meta.title }}
    </RouterLink>
  </AMenuItem>
</template>

<script lang="ts" setup>
import {
  PieChartOutlined,
} from '@ant-design/icons-vue';
import type { CustomRoute } from '@/router/typing';

const props = defineProps<{ data: CustomRoute }>();
const { data } = toRefs(props);
</script>
