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
      <div class="flex">
        <AButton @click="openModel">
          Edit
        </AButton>
      </div>
    </template>
    <div v-if="!groupDriver" class="text-center h-full">
      <ASpin size="large" />
    </div>
    <template v-else>
      <ADescriptions title="Thông tin nhóm" bordered size="small">
        <ADescriptionsItem label="Tên">
          {{ groupDriver?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Email">
          {{ groupDriver?.email || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Mô tả">
          {{ groupDriver?.description || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Trạng thái">
          {{ groupDriver?.status || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Địa chỉ">
          {{ groupDriver?.address || '' }}
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider />
      <AButton @click="openAddDriver">
        Thêm tài xế
      </AButton>
      <AList
        :data-source="drivers"
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
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';

const props = defineProps<{
  isOpen: boolean
  title: string
  groupId: string
}>();

const emit = defineEmits<{
  close: [v: void]
}>();

const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));
const AddDriver = defineAsyncComponent(() => import('@/components/common/AddDriver.vue'));

const { isOpen, groupId } = toRefs(props);
const groupDriver = ref<API.GroupDriver>();

const drivers = computed(() => groupDriver.value?.drivers ?? []);
const onClose = () => {
  groupDriver.value = undefined;
  emit('close');
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
  }
});
</script>
