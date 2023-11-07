<template>
  <div class="flex flex-col gap-16 ">
    <div class="flex flex-row gap-16 bg-abg border-abd b p-10 rounded-7">
      <ASelect
        v-model:value="selectedDriverId"
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
              <DynamicTag status="active" />
            </div>
          </ASelectOption>
        </template>
      </ASelect>
    </div>
    <div v-if="!groupId">
      <ASelect
        v-model:value="groupDriverState.selected"
        :options="groupDriverState.options"
        placeholder="Chọn nhóm"
        class="w-full"
      />
    </div>
    <!-- <div class="border-abd b flex-grow p-10 rounded-7" :class="{ 'grid-center': !selectedDriverId }"> -->
    <div v-if="selectedDriverId">
      <DriverInfo :driver="selectedDriver" :driverId="selectedDriverId" hideExtraBtn />
    </div>
    <!-- </div> -->
    <div>
      <AButton type="primary" class="float-right" :disabled="!selectedDriverId" @click="onAddDriver">
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
import { EApiId } from '@/enums/request.enum';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';

const props = defineProps<{
  groupId?: string
  driverId?: string
}>();

const emits = defineEmits<{
  cancel: [v: void]
}>();

const FALL_BACK_OPTIONS: CommonOption = {
  label: 'Không tìm thấy kết quả',
  value: '',
};

const { groupId } = toRefs(props);
const { loadIdsHas } = storeToRefs(useLoaderStore());

const driversMap = reactive<Map<string, API.Driver>>(new Map()); // driverId => Driver Object
const selectedDriverId = ref<OrUndefine<string>>();
const isSearch = ref<boolean>(false);
const groupDriverState = reactive({
  options: [] as CommonOption[],
  selected: '',
});

const driverOptions = computed<CommonOption[]>(() => {
  const drivers = Array.from(driversMap.values());
  if (drivers.length === 0) {
    return [];
  }

  return drivers.map(i => ({ label: i?.name ?? '', value: i?.id ?? '' }));
});
const isFetch = computed(() => loadIdsHas.value(EApiId.DRIVER_INDEPENDENT_SEARCH));
const selectedDriver = computed(() => driversMap.get(selectedDriverId.value ?? ''));
const selectedGroup = computed(() => groupDriverState.options.find(i => i.value === groupDriverState.selected)?.label ?? '');

const fetchDriverOptions = async (keyword?: string) => {
  const QUERY_MATCHING = 'driver_code_or_name_cont';

  if (!keyword) {
    return;
  }

  const rs = await retailerDriverApis.searchIndependentDrivers({ query: { [QUERY_MATCHING]: keyword } });
  if (!(rs && rs?.data?.drivers) || rs.data.drivers.length === 0) {
    return;
  }

  rs.data.drivers.forEach(driver => driversMap.set(driver.id, driver));
};

const composeGroupDriverOptions = async () => {
  // TODO: paginator after
  const rs = await groupDriverApis.search({ items: 50 });
  if (!(rs && rs.data) || !rs.data.group_drivers.length) {
    groupDriverState.options = [FALL_BACK_OPTIONS];
    return;
  }
  groupDriverState.options = rs.data.group_drivers.map(i => ({ label: i?.name ?? '', value: i?.id ?? '' }));
  groupDriverState.selected = groupId?.value ?? groupDriverState.options[0].value?.toString() ?? '';
};

const onAddDriver = async () => {
  if (!(groupDriverState.selected && selectedDriverId.value)) {
    message.error('Thiếu id');
    return;
  }
  const confirmMsg = [
    'Xác nhận gửi lời mời tham gia đến',
    `Tài xế: ${selectedDriver.value?.name ?? ''}`,
    `Vào nhóm: ${selectedGroup.value}`,
  ];
  const confirm = await showAsyncAlert({ content: confirmMsg, severity: 'info' });
  if (!confirm) {
    return;
  }

  const rs = await retailerDriverInvitationApis.sendInvite({ driver_id: selectedDriverId.value, group_driver_id: groupDriverState.selected });
  if (!(rs && rs.data)) {
    return;
  }
  emits('cancel');
};

const debounceInput = debounce(async (value) => {
  driversMap.clear();
  isSearch.value = true;
  await fetchDriverOptions(value);
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

  debounceInput(val.trim());
};
const init = async () => {
  composeGroupDriverOptions();
};
init();
</script>
