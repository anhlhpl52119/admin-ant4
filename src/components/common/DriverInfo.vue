<template>
  <div class="min-w-650">
    <ASpin size="large" :spinning="loadIdsHas(EApiId.DRIVER_SEARCH)">
      <ADescriptions
        :bordered="true"
        size="small"
        class="cursor-default"
      >
        <ADescriptionsItem label="Tên tài xế" :span="2">
          {{ driverState?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Status">
          <FieldDynamicTag :status="driverState?.status" />
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
  </div>
</template>

<script lang="ts" setup>
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { EApiId } from '@/enums/request.enum';
import { formatDate } from '@/utils/date.util';

const props = defineProps<{
  driverId: string
  driver?: API.Driver
  hideExtraBtn?: boolean
}>();

defineEmits<{
  cancel: [v: void]
}>();

const { driverId, driver } = toRefs(props);

const driverState = ref<OrNull<API.Driver>>(null);

const { loadIdsHas } = storeToRefs(useLoaderStore());

const init = async () => {
  if (driver?.value) {
    driverState.value = driver.value;
    return;
  }
  const rs = await retailerDriverApis.searchMyDrivers({ query: { id_eq: props.driverId }, includes: ['group_drivers'] });
  if (!(rs && rs.data) || rs.data.drivers.length === 0) {
    return;
  }
  [driverState.value] = rs.data.drivers;
};

watchEffect(() => {
  if (!driverId.value) { return; }
  init();
});
</script>
