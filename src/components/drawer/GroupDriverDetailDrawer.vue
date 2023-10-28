<template>
  <ADrawer
    :open="isOpen"
    width="90rem"
    :title="title"
    placement="right"
    destroyOnClose
    @close="onClose"
  >
    <template #extra>
      <div class="flex gap-16">
        <AButton @click="openModel">
          Edit
        </AButton>
        <AButton :icon="h(DeleteOutlined)" danger type="primary" @click="onDelete">
          Xóa
        </AButton>
      </div>
    </template>
    <div v-if="!groupDriver" class="text-center h-full">
      <ASpin size="large" />
    </div>
    <template v-else>
      <ADescriptions
        title="Thông tin người dùng"
        :labelStyle="{ fontWeight: 500 }"
        :contentStyle="pStyle"
        class="cursor-default"
      >
        <ADescriptionsItem label="Tên">
          {{ groupDriver?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Email">
          {{ groupDriver?.email || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Địa chỉ">
          {{ groupDriver?.address || '_' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Status">
          {{ groupDriver?.status || '' }}
          <ATag color="success">
            {{ groupDriver?.status.toUpperCase() ?? '_' }}
          </ATag>
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày tạo">
          {{ formatDate(groupDriver?.created_at) }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày chỉnh sửa">
          {{ formatDate(groupDriver?.updated_at) }}
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider><span class="text-spotlight">Danh sách tài xế</span></ADivider>
      <div class="flex flex-row-reverse mb-16">
        <AButton type="primary" @click="openAddDriver">
          +  Thêm tài xế
        </AButton>
      </div>

      <AList
        :data-source="driversState"
        bordered
        class="max-h-500 overflow-y-scroll"
      >
        <template #renderItem="{ item, index } : {item: API.Driver, index: number}">
          <AListItem :key="item.id">
            <template #actions>
              <a>Xem chi tiết</a>
            </template>
            <AListItemMeta>
              <template #title>
                <a href="">{{ item.name }}</a>
              </template>
              <template #description>
                <div>{{ item?.description || '-' }}</div>
              </template>
              <template #avatar>
                <AAvatar size="large" :src="randomAvatar(index)" />
              </template>
            </AListItemMeta>
          </AListItem>
        </template>
      </AList>
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';
import { formatDate } from '@/utils/date.util';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';

const props = defineProps<{
  isOpen: boolean
  title: string
  groupId: string
}>();

const emit = defineEmits<{
  close: [v: boolean]
}>();

const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));
const AddDriver = defineAsyncComponent(() => import('@/components/common/AddDriver.vue'));

const { isOpen, groupId } = toRefs(props);
const groupDriver = ref<API.GroupDriver>();

const driversState = ref<API.Driver[]>([]);

const pStyle = {
  fontSize: '1.5rem',
  color: '#978f8f',
  lineHeight: '2.4rem',
  display: 'block',
  marginBottom: '1.6rem',
};

const onClose = () => {
  groupDriver.value = undefined;
  emit('close', false);
};

const onDelete = async () => {
  const confirm = await showAsyncAlert({ content: 'Xóa toàn bộ dữ liệu của nhóm tài xế này, bao gồm tất cả tài xế trong nhóm?', strictMsg: true });
  if (!confirm) {
    return;
  }
  if (!groupId.value) {
    return;
  }
  const rs = await groupDriverApis.delete(groupId.value);
  if (rs && rs.data) {
    emit('close', true);
  }
};

const initGroupDriver = async () => {
  if (!groupId.value) {
    return;
  }
  const rs = await groupDriverApis.getDetails(groupId.value, { includes: ['drivers'] });
  if (!(rs && rs.data)) {
    return;
  }
  groupDriver.value = rs.data;
};

const initDriver = async () => {
  // fetch
  const res = await driverApis.search({ items: 20 });
  if (!(res && res.data.drivers)) {
    return;
  }
  driversState.value = res.data.drivers;
};

const randomAvatar = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  initGroupDriver();
};

const openAddDriver = () => {
  const modalId = coreModal.show({
    component: AddDriver,
    title: 'Thêm tài xế',
    props: {
      groupId: groupId.value,
    },
    emits: {
      confirm: (v: string) => console.log('object', v),
      cancel: () => coreModal.close(modalId),
    },
  });
};

const openModel = () => {
  const modalId = coreModal.show({
    component: GroupDriverCreateUpdateForm,
    title: 'Cập nhật thông tin nhóm tài xế',
    props: {
      groupId: groupDriver.value?.id ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};

watch(isOpen, (val) => {
  if (val && !groupDriver.value) {
    initGroupDriver();
    initDriver();
  }
});
</script>
