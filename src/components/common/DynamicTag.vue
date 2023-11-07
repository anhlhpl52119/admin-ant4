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
const props = defineProps<{
  status: OrNullish<string>
  loading?: boolean
  noBorder?: boolean
}>();

const { isAppLoading } = storeToRefs(useLoaderStore());
const { status, loading } = toRefs(props);

const generalLoading = computed(() => !status.value && isAppLoading);

const statusColorMap: Record<string, string[]> = {
  default: ['cancelled'], // plain
  success: ['done', 'full_synced', 'sync_failed', 'synced'], // green
  purple: ['pending', 'webhook_not_enough'], // bg: #f9f0ff || border: #d3adf7
  error: ['in-active'], // red
  processing: ['processing'], // yellow
  geekblue: ['not_config'], // bg: #f0f5ff || border: #adc6ff
  cyan: ['ready_to_sync', 'active'], // bg: #e6fffb || border: #87e8de
  magenta: ['user'], // bg: #fff0f6 || border: #ffadd2
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
  active: 'Đang hoạt động',
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
