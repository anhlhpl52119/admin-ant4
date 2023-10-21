<template>
  <ATag :color="tag.color" class="rounded-10">
    <div class="flex gap-5 items-center">
      <i class="i-fluent:plug-disconnected-20-filled text-16 inline-block" :class="tag.iconClass" />
      <span>
        {{ tag.label }}
      </span>
    </div>
  </ATag>
</template>

<script lang="ts" setup>
const props = defineProps<{
  status?: 'active' | 'in-active' | string
  loading?: boolean
}>();
const { status, loading } = toRefs(props);
const tag = computed(() => {
  if (loading.value) {
    return {
      label: 'Processing',
      color: 'processing',
      iconClass: 'i-line-md:loading-loop',
    };
  };
  if (!status?.value) {
    return {
      label: 'Unknown',
      color: 'purple',
      iconClass: 'i-pajamas:severity-unknown',
    };
  }
  switch (status.value) {
    case 'active':

      return {
        label: 'Active',
        color: 'success',
        iconClass: 'i-material-symbols:verified-user-rounded',
      };
    case 'in-active':

      return {
        label: 'In-active',
        color: 'error',
        iconClass: 'i-fluent:plug-disconnected-20-filled',
      };

    default:
      return {
        label: 'Unknown',
        color: 'purple',
        iconClass: 'i-pajamas:severity-unknown',
      };
  }
});
</script>
