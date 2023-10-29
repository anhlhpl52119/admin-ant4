<template>
  <div>
    <ASpin size="large" :spinning="loadingIds.has(EApiId.DRIVER_SEARCH)">
      <ADescriptions
        title="Thông tin người dùng"
        :bordered="true"
        size="small"
        class="cursor-default"
      >
        <ADescriptionsItem label="Tên tài xế" :span="2">
          {{ driverState?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Status">
          <ATag color="success">
            {{ driverState?.status.toUpperCase() ?? '_' }}
          </ATag>
        </ADescriptionsItem>
        <ADescriptionsItem label="Số điện thoại" :span="2">
          {{ driverState?.phone || '_' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Email">
          {{ driverState?.email || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày chỉnh sửa">
          {{ formatDate(driverState?.updated_at) }}
        </ADescriptionsItem>
      </ADescriptions>
    </ASpin>
    <div class="flex flex-row-reverse mt-16">
      <AButton @click="$emit('close')">
        Đóng
      </AButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { EApiId } from '@/enums/request.enum';
import { useVisibilityStore } from '@/stores/visibility.store';
import { formatDate } from '@/utils/date.util';

const props = defineProps<{
  driverId: string
}>();

const emits = defineEmits<{
  close: [v?: any]
}>();

const driverState = ref<OrNull<API.Driver>>(null);

const { loadingIds } = storeToRefs(useVisibilityStore());

const init = async () => {
  const rs = await retailerDriverApis.search({ query: { id_eq: props.driverId }, includes: ['group_drivers'] });
  if (!(rs && rs.data) || rs.data.drivers.length === 0) {
    return;
  }
  [driverState.value] = rs.data.drivers;
};
init();
</script>
