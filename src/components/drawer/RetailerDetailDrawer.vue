<template>
  <ADrawer
    :open="isOpen"
    width="90rem"
    :title="title"
    placement="right"
    destroy-on-close
    @close="$emit('close')"
  >
    <div v-if="!branchItem" class="text-center h-full">
      <ASpin size="large" />
    </div>
    <template v-else>
      <ADescriptions title="Thông tin Chi nhánh" bordered size="small">
        <ADescriptionsItem label="Tên">
          {{ branchItem?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Mô tả">
          {{ branchItem?.description || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Trạng thái">
          {{ branchItem?.status || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Liên hệ">
          {{ branchItem?.phone ?? '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Địa chỉ">
          {{ branchItem?.address || '' }}
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider />
      <ADescriptions title="Thông tin nhà bán lẻ của chi nhánh" bordered size="small">
        <ADescriptionsItem label="Tên">
          {{ retailerInfo?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Mô tả">
          {{ retailerInfo?.description || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Trạng thái">
          {{ retailerInfo?.status || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Liên hệ">
          {{ retailerInfo?.phone ?? '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Nguồn">
          {{ retailerInfo?.source || '' }}
        </ADescriptionsItem>
      </ADescriptions>
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean
  title: string
  branchItem: API.Retailer | null
}>();

defineEmits<{
  close: [v: void]
}>();

const { branchItem, isOpen } = toRefs(props);

const retailerInfo = computed(() => {
  if (!branchItem.value?.retailer) {
    return null;
  }

  return branchItem.value.retailer;
});
</script>
