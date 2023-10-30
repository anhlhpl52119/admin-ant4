<template>
  <ATag :color="dynamicTag.color" :bordered="isShowBorder" class="rounded-7">
    <div v-if="dynamicTag.icon" class="flex gap-5 items-center">
      <i class="text-16 inline-block" :class="dynamicTag.icon" />
      <span>
        {{ dynamicTag.label }}
      </span>
    </div>
    <span v-else>{{ dynamicTag.label }}</span>
  </ATag>
</template>

<script lang="ts" setup>
const props = defineProps<{
  status: string
  loading?: boolean
  noBorder?: boolean
}>();
const { status, loading } = toRefs(props);

const isShowBorder = !props.noBorder;

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
  cancelled: 'Hủy bỏ',
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
};

const statusIconMap: Record<string, string> = {
  'active': 'i-material-symbols:verified-user-rounded',
  'in-active': 'i-fluent:plug-disconnected-20-filled',
  'unknown': 'i-pajamas:severity-unknown',
};

const findColor = (status: string) => {
  if (!status) {
    return 'default';
  }

  for (const [color, statusList] of Object.entries(statusColorMap)) {
    if (statusList.includes(status)) {
      return color;
    }
  }

  return 'default';
};

const findLabel = (status: string) => {
  if (!status) {
    return 'UNKNOWN';
  }

  return statusTextMap[status] ?? status.toUpperCase();
};

const dynamicTag = computed(() => ({
  label: findLabel(status.value),
  color: findColor(status.value),
  icon: statusIconMap[status.value],
}));
</script>
