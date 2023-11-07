<template>
  <div class="h-150 grid gap-10">
    <CFetchOption
      v-model:initial-value="selectedId"
      :requestData="composeDriverOption"
      labelKey="name"
    />
    <div class="text-desc">
      <p>
        - Nhập tên tài xế để tìm kiếm
      </p>
      <p> - Tài xế thêm vào phải chưa nằm trong nhóm nào</p>
    </div>

    <div class="mt-20 flex gap-16 justify-center">
      <AButton type="primary" :disabled="!selectedId" :loading="loadIdsHas([EApiId.GROUP_DRIVER_ADD_DRIVER])" @click="onSubmit">
        Thêm
      </AButton>
      <AButton @click="$emit('success', false)">
        Hủy bỏ
      </AButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';
import { EApiId } from '@/enums/request.enum';

const props = defineProps<{ groupId: string }>();
const emits = defineEmits<{
  success: [v: boolean]
}>();
const { loadIdsHas } = storeToRefs(useLoaderStore());
const selectedId = ref('');

const onSubmit = async () => {
  if (!selectedId.value && props.groupId) {
    return;
  }
  const rs = await groupDriverApis.addDriver(props.groupId, { id: selectedId.value });

  if (!(rs && rs.data)) {
    return;
  }
  emits('success', true);
};

const composeDriverOption = async (query?: ApiQueryAttr<API.Driver>) => {
  const rs = await driverApis.search({ query });
  if (!rs || rs.data.drivers.length === 0) {
    return [];
  }

  return rs.data.drivers;
};
</script>
