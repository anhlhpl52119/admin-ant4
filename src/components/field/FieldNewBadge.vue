<template>
  <slot />
  <sup v-if="isNew" class="ml2 p-2 b-abd bg-success rounded-5 text-white text-8">New</sup>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { isFiveMinutesAgo } from '@/utils/date.util';

const props = defineProps<{
  createTime: OrNullish<string | number | Dayjs>
}>();

const isNew = computed(() => isFiveMinutesAgo(props.createTime));
</script>
