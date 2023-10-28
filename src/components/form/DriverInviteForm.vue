<template>
  <div class="min-h-400 flex flex-col gap-16 ">
    <div class="flex flex-row gap-16 bg-abg border-abd b p-10 rounded-7">
      <ASelect
        v-model:value="searchBy"
        class="w-200"
        :options="SEARCH_BY_OPTIONS"
      />
      <ASelect
        v-model:value="selected"
        :placeholder="placeholderDesc[searchBy]"
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
              <ATag color="success">
                <span class="ml0">Active</span>
              </ATag>
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
import { BEGIN_BY_SPACE, MULTIPLE_SPACE_ADJACENT, NO_SCRIPT_INJECTION, NO_SPECIAL_SYMBOL } from '@/constants/regex.constant';
import { stringWithoutDiacritics } from '@/utils/common.util';
import { retailerDriverInvitationApis } from '@/apis/retailer/invitation-mgt/invitation-mgt';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';

const props = defineProps<{ groupId: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

enum SEARCH_QUERY_KEY {
  CODE = 'driver_code',
  NAME = 'name_cont',
};

const SEARCH_BY_OPTIONS = [
  { label: 'Tìm theo mã', value: SEARCH_QUERY_KEY.CODE },
  { label: 'Tìm theo tên', value: SEARCH_QUERY_KEY.NAME },
];

const placeholderDesc = {
  [SEARCH_QUERY_KEY.NAME]: 'Nhập tên tài xế (Vd: Nguyễn Văn A...)',
  [SEARCH_QUERY_KEY.CODE]: '#Mã Tài xế (Vd: TAIXE01...)',
};

const appStore = useVisibilityStore();

const driversMap = reactive<Map<string, API.Driver>>(new Map()); // driverId => Driver Object
const selected = ref<OrUndefine<string>>();
const searchBy = ref<`${SEARCH_QUERY_KEY}`>(SEARCH_QUERY_KEY.CODE);
const isSearch = ref<boolean>(false);

const driverOptions = computed<CommonOption[]>(() => {
  const drivers = Array.from(driversMap.values());
  if (drivers.length === 0) {
    return [];
  }

  return drivers.map(i => ({ label: i?.name ?? '', value: i?.id ?? '' }));
});
const isFetch = computed(() => appStore.loadingIds.has(EApiId.DRIVER_SEARCH));
const selectedDriver = computed(() => driversMap.get(selected.value ?? ''));

const fetchDriver = async (keyword?: string) => {
  let queryCond: API.SearchDriverQueryParams['query'] = {};

  if (keyword) {
    queryCond = { [searchBy.value]: keyword };
  }

  const rs = await retailerDriverApis.search({ query: queryCond });
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

  const confirm = await showAsyncAlert({ content: 'Gửi lời mời sẽ đợi tài xế phản hồi?' });
  if (!confirm) {
    return;
  }

  const rs = await retailerDriverInvitationApis.sendInvite({ driver_id: selected.value, group_driver_id: props.groupId });
  if (!(rs && rs.data)) {
    return;
  }
  emits('success');
};

const debounceFetch = debounce((value) => {
  driversMap.clear();
  isSearch.value = true;
  fetchDriver(value);
}, 300);

const onInputSearch = (e: any) => {
  if (!e?.target?.value) {
    isSearch.value = false;

    return;
  }

  let val: string = e.target.value;
  // remove first space
  val = val.replace(BEGIN_BY_SPACE, '');
  // remove adj
  val = val.replace(MULTIPLE_SPACE_ADJACENT, ' ');

  // prevent script injection
  val = val.replace(NO_SCRIPT_INJECTION, '');

  // upper case input when search by code
  if (searchBy.value === SEARCH_QUERY_KEY.CODE) {
    val = val.toUpperCase();
    val = val.replace(NO_SPECIAL_SYMBOL, '');
    val = stringWithoutDiacritics(val);
  }

  e.target.value = val;

  if (!val) {
    isSearch.value = false;

    return;
  }

  debounceFetch(val);
};
</script>
