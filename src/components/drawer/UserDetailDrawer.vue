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
    <div v-if="!userDetail" class="text-center h-full">
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
          {{ userDetail?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Số điện thoại">
          {{ userDetail?.phone || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Phân quyền">
          <!-- {{  || '' }} -->
          <ATag color="magenta">
            {{ userDetail?.role.toUpperCase() ?? '_' }}
          </ATag>
        </ADescriptionsItem>
        <ADescriptionsItem label="Email">
          {{ userDetail?.email || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày tạo">
          {{ new Date(userDetail?.created_at).toLocaleString('vi-VN') || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày chỉnh sửa">
          {{ new Date(userDetail?.updated_at).toLocaleString('vi-VN') || '' }}
        </ADescriptionsItem>
      </ADescriptions>
      <ADivider />
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { retailerUserApis } from '@/apis/retailer/user-mgt/user-mgt.api';

const props = defineProps<{
  isOpen: boolean
  title: string
  userId: string
  item?: API.RetailerUser
}>();

const emit = defineEmits<{
  close: [v: boolean]
}>();

const RetailerUserCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerUserCreateUpdateForm.vue'));

const { isOpen, userId } = toRefs(props);
const userDetail = ref<API.RetailerUser>();

const onClose = () => {
  userDetail.value = undefined;
  emit('close', false);
};

const initGroupDriver = async () => {
  if (!userId.value) {
    return;
  }
  const rs = await retailerUserApis.getDetails(userId.value, { includes: ['belonged_retailer'] });
  if (!(rs && rs.data)) {
    return;
  }
  userDetail.value = rs.data;
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  initGroupDriver();
};

const pStyle = {
  fontSize: '1.5rem',
  color: '#978f8f',
  lineHeight: '2.4rem',
  display: 'block',
  marginBottom: '1.6rem',
};
const pStyle2 = {
  marginBottom: '24px',
};

const openModel = () => {
  const modalId = coreModal.show({
    component: RetailerUserCreateUpdateForm,
    title: 'Cập nhật thông tin người dùng',
    props: {
      userId: userDetail.value?.id ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};

const onDelete = async () => {
  const confirm = await showConfirmAlert({ content: 'Xóa toàn bộ dữ liệu của người dùng này?' });
  if (!confirm) {
    return;
  }
  if (!userDetail.value?.id) {
    return;
  }
  const rs = await retailerUserApis.delete(userDetail.value.id);
  if (rs && rs.data) {
    emit('close', true);
  }
};

watch(isOpen, (val) => {
  if (val && !userDetail.value) {
    initGroupDriver();
  }
});
</script>
