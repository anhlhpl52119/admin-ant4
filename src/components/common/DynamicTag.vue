<template>
  <ATag :color="dynamicTag.color" :bordered="!noBorder" class="rounded-7">
    <div v-if="dynamicTag.icon" class="flex gap-5 items-center">
      <i class="text-16 inline-block" :class="dynamicTag.icon" />
      <span>
        {{ dynamicTag.statusText }}
      </span>
    </div>
    <span v-else>{{ dynamicTag.statusText }}</span>
  </ATag>
</template>

<script lang="ts" setup>
import { useVisibilityStore } from '@/stores/visibility.store';

const props = defineProps<{
  status: OrNullish<string>
  loading?: boolean
  noBorder?: boolean
}>();

const { isAppLoading } = useVisibilityStore();
const { status, loading } = toRefs(props);

const generalLoading = computed(() => !status.value && isAppLoading);

const statusColorMap: Record<string, string[]> = {
  default: ['cancelled'],
  success: ['done', 'active', 'full_synced', 'sync_failed', 'synced'],
  purple: ['pending', 'webhook_not_enough'],
  error: ['in-active'],
  processing: ['processing'],
  geekblue: ['not_config'],
  cyan: ['ready_to_sync'],
  magenta: ['user'],
};

const statusTextMap: Record<string, string> = {
  cancelled: 'Đã hủy',
  success: 'Thành công',
  pending: 'Đang chờ',
  done: 'Hoàn tất',
  not_config: 'Chưa config',
  full_synced: 'Full sync',
  ready_to_sync: 'Sẵn sàng sync',
  sync_failed: 'Sync thất bại',
  webhook_not_enough: 'Webhook không đủ',
  synced: 'Đã sync',
  user: 'Nhân viên',
  processing: 'Đang tải',
};

const statusIconMap: Record<string, string> = {
  'active': 'i-material-symbols:verified-user-rounded',
  'in-active': 'i-fluent:plug-disconnected-20-filled',
  'unknown': 'i-pajamas:severity-unknown',
  'processing;': 'i-svg-spinners:tadpole',
};

const findColor = (status: OrNullish<string>) => {
  if (generalLoading.value || loading.value) {
    return 'processing';
  }
  if (!status) {
    return 'default';
  }

  for (const [color, statusList] of Object.entries(statusColorMap)) {
    if (statusList.includes(status)) {
      return color;
    }
  }
};

const findLabel = (status: OrNullish<string>) => {
  if (generalLoading.value || loading.value) {
    return 'Đang tải';
  }
  if (status) {
    return statusTextMap[status] ?? status.toUpperCase();
  }

  return 'UNKNOWN';
};

const dynamicTag = computed(() => {
  const statusText = loading.value ? 'processing' : status.value!;
  return {
    statusText: findLabel(statusText),
    color: findColor(statusText),
    icon: generalLoading.value ? 'i-svg-spinners:tadpole' : statusIconMap[statusText],
  };
});
</script>
