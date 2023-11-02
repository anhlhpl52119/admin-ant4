<template>
  <div class="min-h-400 flex flex-col gap-16 ">
    <div class="flex flex-row gap-16 bg-abg border-abd b p-10 rounded-7">
      <ASelect
        v-model:value="selected"
        placeholder="nhập Tên hoặc Mã tài xế (Vd: TAIXE01...)"
        class="w-full"
        :showSearch="true"
        :filterOption="false"
        :notFoundContent="isSearch ? undefined : null"
        @input="onInputSearch"
      >
        <template v-if="isSearch" #notFoundContent>
          <ASpin v-if="isFetch" size="small" />
          <span v-if="!isFetch && isSearch">Không tìm thấy tài xế</span>
        </template>

        <template v-for="item in driverOptions" :key="item.value">
          <ASelectOption :value="item.value">
            <div class="flex items-center justify-between">
              <span>{{ item.label }}</span>
              <DynamicTag :status="() => 'active'" />
            </div>
          </ASelectOption>
        </template>
      </ASelect>
    </div>
    <div class="border-abd b flex-grow p-10 rounded-7" :class="{ 'grid-center': !selected }">
      <div v-if="!selected" class="text-desc">
        <i class="i-ph:identification-card block text-100 self-center" />
        <p>
          Thông tin tài xế
        </p>
      </div>
      <div v-else>
        <ADescriptions size="small">
          <ADescriptionsItem label="Tên" :span="3">
            {{ selectedDriver?.name || '' }}
          </ADescriptionsItem>
          <ADescriptionsItem label="Mô tả" :span="3">
            {{ selectedDriver?.description || '' }}
          </ADescriptionsItem>
          <ADescriptionsItem label="Trạng thái" :span="3">
            {{ selectedDriver?.status || '' }}
          </ADescriptionsItem>
          <ADescriptionsItem label="Điện thoại" :span="3">
            {{ selectedDriver?.phone ?? '' }}
          </ADescriptionsItem>
          <ADescriptionsItem label="Địa chỉ" :span="3">
            {{ selectedDriver?.address || '' }}
          </ADescriptionsItem>
          <ADescriptionsItem label="Email" :span="3">
            {{ selectedDriver?.email || '' }}
          </ADescriptionsItem>
        </ADescriptions>
      </div>
    </div>
    <div>
      <AButton type="primary" class="float-right" :disabled="!selected" @click="onAddDriver">
        Gửi yêu cầu
      </AButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { debounce } from 'lodash-es';
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { BEGIN_BY_SPACE, MULTIPLE_SPACE_ADJACENT, NO_SCRIPT_INJECTION } from '@/constants/regex.constant';
import { retailerDriverInvitationApis } from '@/apis/retailer/invitation-mgt/invitation-mgt';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';

const props = defineProps<{ groupId: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadingIds } = storeToRefs(useVisibilityStore());

const driversMap = reactive<Map<string, API.Driver>>(new Map()); // driverId => Driver Object
const selected = ref<OrUndefine<string>>();
const isSearch = ref<boolean>(false);

const driverOptions = computed<CommonOption[]>(() => {
  const drivers = Array.from(driversMap.values());
  if (drivers.length === 0) {
    return [];
  }

  return drivers.map(i => ({ label: i?.name ?? '', value: i?.id ?? '' }));
});
const isFetch = computed(() => loadingIds.value.has(EApiId.DRIVER_SEARCH));
const selectedDriver = computed(() => driversMap.get(selected.value ?? ''));

const fetchDriver = async (keyword?: string) => {
  const QUERY_MATCHING = 'driver_code_or_name_cont';

  if (!keyword) {
    return;
  }

  const rs = await retailerDriverApis.search({ query: { [QUERY_MATCHING]: keyword } });
  if (!(rs && rs?.data?.drivers) || rs.data.drivers.length === 0) {
    return;
  }

  rs.data.drivers.forEach(driver => driversMap.set(driver.id, driver));
};

const onAddDriver = async () => {
  if (!(props.groupId && selected.value)) {
    message.error('Thiếu id');

    return;
  }

  const confirm = await showAsyncAlert({ content: 'Lời mời cần được tài xế chấp nhận trước khi được thêm vào nhóm' });
  if (!confirm) {
    return;
  }

  const rs = await retailerDriverInvitationApis.sendInvite({ driver_id: selected.value, group_driver_id: props.groupId });
  if (!(rs && rs.data)) {
    return;
  }
  emits('success');
};

const debounceFetch = debounce(async (value) => {
  driversMap.clear();
  isSearch.value = true;
  await fetchDriver(value);
}, 1000);

const onInputSearch = (e: any) => {
  let val: string = e?.target?.value || '';

  // prevent begin by space
  val = val.replace(BEGIN_BY_SPACE, '');

  // remove adjacent space
  val = val.replace(MULTIPLE_SPACE_ADJACENT, ' ');

  // prevent script injection
  val = val.replace(NO_SCRIPT_INJECTION, '');

  e.target.value = val;

  if (!val) {
    isSearch.value = false;

    return;
  }

  debounceFetch(val.trim());
};
</script>
