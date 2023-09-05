<template>
  <ASubMenu v-if="data.children && data.children.length > 0" :key="data.name">
    <template #title>
      <div class="flex items-center">
        <i v-if="data.meta.icon" :class="data.meta.icon" class="w-25 h-25 mr-5" />
        <span>{{ data.meta.title }}</span>
      </div>
    </template>
    <CustomSubMenu v-for="item in data.children" :key="item.name" :data="item" />
  </ASubMenu>
  <template v-else>
    <AMenuItem :key="data.name" class="flex-center">
      <div class="flex items-center">
        <i v-if="data.meta.icon" :class="data.meta.icon" class="w25 h25 mr-5" />
        <RouterLink :to="{ name: data.name }">
          {{ data.meta.title }}
        </RouterLink>
      </div>
    </AMenuItem>
  </template>
</template>

<script lang="ts" setup>
import type { CustomRoute } from '@/router/typing';

const props = defineProps<{ data: CustomRoute }>();
const { data } = toRefs(props);
</script>
