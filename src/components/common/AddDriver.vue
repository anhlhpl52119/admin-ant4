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
      <AButton type="primary" :disabled="!selectedId" @click="onOk">
        Ok
      </AButton>
      <AButton @click="$emit('cancel', '')">
        Cancel
      </AButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';

const props = defineProps<{ groupId: string }>();
const emits = defineEmits<{
  confirm: [v: string]
  cancel: [v: any]
}>();
const selectedId = ref('');

const onAddDriver = async () => {
  if (!(selectedId.value && props.groupId)) {
    return;
  }
  const rs = await groupDriverApis.addDriver(props.groupId, { id: selectedId.value });
};

const onOk = async () => {
  if (!selectedId.value) {
    return;
  }
  await onAddDriver();
  emits('confirm', selectedId.value);
};

const composeDriverOption = async (query?: ApiQueryAttr<API.Driver>) => {
  const rs = await driverApis.search({ query });
  if (!rs || rs.data.drivers.length === 0) {
    return [];
  }

  return rs.data.drivers;
};
</script>
