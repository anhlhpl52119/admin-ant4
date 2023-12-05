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
          Sửa
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
          <FieldDynamicTag :status="groupDriver?.status" />
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
          +  Thêm tài xế vào nhóm
        </AButton>
      </div>

      <AList
        :data-source="driversInGroup"
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
                <a @click="showDriverInfo(item?.id ?? '')">{{ item.name }}</a>
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
      <div v-if="driverInvitation.length > 0">
        <ADivider>
          <span class="text-spotlight">Danh sách mời đang chờ chấp nhận</span>
        </ADivider>
        <div class="flex flex-row-reverse mb-16">
          <AButton type="primary" @click="onAddDriver">
            +  Tạo lời lời mời
          </AButton>
        </div>
        <AList
          :data-source="driverInvitation"
          bordered
          class="max-h-500 overflow-y-scroll"
        >
          <template #renderItem="{ item, index } : {item: API.DriverInvitation, index: number}">
            <AListItem :key="item.id">
              <template #actions>
                <AButton shape="round" size="small" danger @click="onCancelInvite(item.id)">
                  Hủy
                </AButton>
              </template>
              <AListItemMeta>
                <template #title>
                  <a @click="showDriverInfo(item?.driver?.id ?? '')">{{ item?.driver?.name ?? '_' }}</a>
                </template>
                <template #description>
                  <div>{{ item?.driver?.driver_code || '-' }}</div>
                </template>
                <template #avatar>
                  <AAvatar size="large" :src="randomAvatar(index)" />
                </template>
              </AListItemMeta>
            </AListItem>
          </template>
        </AList>
      </div>
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';
import { formatDate } from '@/utils/date.util';
import { retailerDriverInvitationApis } from '@/apis/retailer/invitation-mgt/invitation-mgt';

const props = defineProps<{
  isOpen: boolean
  title: string
  groupId: string
}>();

const emit = defineEmits<{
  close: [v: boolean]
}>();

const DriverInviteForm = defineAsyncComponent(() => import('@/components/form/DriverInviteForm.vue'));

const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));
const DriverInfo = defineAsyncComponent(() => import('@/components/common/DriverInfo.vue'));
const AddDriver = defineAsyncComponent(() => import('@/components/common/AddDriver.vue'));

const { isOpen, groupId } = toRefs(props);
const groupDriver = ref<API.GroupDriver>();
const driversInGroup = computed<API.Driver[]>(() => groupDriver.value?.drivers ?? []);
const driverInvitation = ref<API.DriverInvitation[]>([]);

const pStyle = {
  fontSize: '1.5rem',
  color: '#978f8f',
  lineHeight: '2.4rem',
  display: 'block',
  marginBottom: '1.6rem',
};

const showDriverInfo = (driverId: string) => {
  const modalId = coreModal.show({
    component: DriverInfo,
    modalWidth: '60rem',
    props: {
      driverId,
    },
    emits: {
      close: () => coreModal.close(modalId),
    },
  });
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

const randomAvatar = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
};

const initDriverInvitation = async () => {
  const query: API.SearchInvitationQueryParams = {
    includes: ['driver'],
    items: 50,
    query: {
      group_driver_id_eq: props.groupId,
      status_not_eq: 'accepted',
    },
  };
  const rs = await retailerDriverInvitationApis.search(query);
  if (!(rs && rs.data) || rs.data.driver_invitations.length === 0) {
    return;
  }
  driverInvitation.value = rs.data.driver_invitations;
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  initGroupDriver();
};

const onAddDriverSuccess = (isSuccess: boolean, modalId: string) => {
  if (isSuccess) {
    initDriverInvitation();
  }
  coreModal.close(modalId);
};

const onAddDriver = async () => {
  if (!props.groupId) {
    message.error('Thiếu id nhóm!');

    return;
  }
  const modalId = coreModal.show({
    component: DriverInviteForm,
    title: 'Mời tài xế vào nhóm',
    props: {
      groupId: props.groupId,
    },
    emits: {
      success: () => onAddDriverSuccess(true, modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};

const openAddDriver = () => {
  const modalId = coreModal.show({
    component: AddDriver,
    title: 'Thêm tài xế',
    props: {
      groupId: groupId.value,
    },
    emits: {
      success: (isSuccess: boolean) => onAddDriverSuccess(isSuccess, modalId),
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

const onCancelInvite = async (inviteId: string) => {
  const confirm = await showAsyncAlert({ content: 'Hủy lời mời đến tài xế nảy' });
  if (!confirm) {
    return;
  }
  const rs = await retailerDriverInvitationApis.cancelInvite(inviteId);
  if (!(rs && rs.data)) {
    return;
  }
  initDriverInvitation();
};
watch(isOpen, (val) => {
  if (val && !groupDriver.value) {
    initGroupDriver();
    initDriverInvitation();
  }
});
</script>
