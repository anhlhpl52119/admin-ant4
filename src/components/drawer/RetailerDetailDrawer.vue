<template>
  <ADrawer
    :open="isOpen"
    width="90rem"
    :title="title"
    placement="right"
    destroyOnClose
    @close="$emit('close')"
  >
    <template #extra>
      <AButton @click="goToDetails">
        Xem chi tiết
      </AButton>
    </template>
    <div v-if="!retailerItem" class="text-center h-full">
      <ASpin size="large" />
    </div>
    <template v-else>
      <ADescriptions title="Thông tin Chi nhánh" bordered size="small">
        <ADescriptionsItem label="Tên">
          {{ retailerItem?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Mô tả">
          {{ retailerItem?.description || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Trạng thái">
          {{ retailerItem?.status || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Liên hệ">
          {{ retailerItem?.phone ?? '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Địa chỉ">
          {{ retailerItem?.address || '' }}
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider />
      <AList
        :data-source="retailerDrivers"
        bordered
        class="max-h-300 overflow-y-scroll"
      >
        <template #renderItem="{ item } : {item: API.Driver}">
          <AListItem :key="item.id">
            <template #actions>
              <a>View Profile</a>
            </template>
            <AListItemMeta>
              <template #title>
                <a href="">{{ item.name }}</a>
              </template>
              <template #description>
                <div>{{ item?.description || '-' }}</div>
              </template>
              <template #avatar>
                <AAvatar src="" />
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
      <ADivider />
      <AList
        :data-source="retailerGroupDrivers"
        bordered
        class="max-h-300 overflow-y-scroll"
      >
        <template #renderItem="{ item }: {item: API.GroupDriver}">
          <AListItem :key="item.id">
            <template #actions>
              <a>View Profile</a>
            </template>
            <AListItemMeta :description="item.description">
              <template #title>
                <a href="">{{ item.name }}</a>
              </template>
              <template #avatar>
                <AAvatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
      <ADivider />
      <AList
        :data-source="retailerConfig"
        bordered
        class="max-h-300 overflow-y-scroll"
      >
        <template #renderItem="{ item }: {item: API.RetailerConfig}">
          <AListItem :key="item.id">
            <template #actions>
              <a>View Profile</a>
            </template>
            <AListItemMeta :description="item.value">
              <template #title>
                <a href="">{{ item.name }}</a>
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { ERouteName } from '@/enums/router.enum';
import router from '@/router';

const props = defineProps<{
  isOpen: boolean
  title: string
  retailerItem: API.Retailer | null
}>();

defineEmits<{
  close: [v: void]
}>();

const { retailerItem, isOpen } = toRefs(props);
const retailerConfig = ref<API.RetailerConfig[]>([]);

const retailerDrivers = computed(() => {
  if (!retailerItem.value?.drivers || retailerItem.value?.drivers.length === 0) {
    return [];
  }

  return retailerItem.value.drivers;
});
const retailerGroupDrivers = computed(() => {
  if (!retailerItem.value?.group_drivers || retailerItem.value?.group_drivers.length === 0) {
    return [];
  }

  return retailerItem.value.group_drivers;
});

// const loadRetailerConfig = async () => {
//   if (!retailerItem.value?.id) {
//     return;
//   }
//   const rs = await retailerConfigApis.search({ query: { retailer_id_eq: retailerItem.value.id } });
//   if (!rs || rs.data.retailer_configs.length === 0) {
//     return;
//   }
//   retailerConfig.value = rs.data.retailer_configs;
// };

const goToDetails = () => {
  if (!retailerItem?.value?.id) {
    message.error('Thiếu Retailer ID');

    return;
  }
  router.push({ name: ERouteName.RETAILER_DETAILS, params: { id: retailerItem.value.id } });
};

watch([isOpen, retailerItem], (val) => {
  if (val) {
    // loadRetailerConfig();
  }
}, { immediate: true });
</script>
