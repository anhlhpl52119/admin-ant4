<template>
  <div>
    <ASpin :spinning="loadingIds.has(EApiId.RETAILER_DETAILS) || !retailerState">
      <section class="card mt-0 cursor-default">
        <div class="flex-btw-center">
          <div>
            <ABadge status="success" dot class="text-20 ml-10">
              <AAvatar shape="square" size="large" :src="randomAvatar(50)" />
            </ABadge>
            <span class="text-spotlight text-24 ml-7">{{ retailerState?.name || '-' }}</span>
            <span class="text-desc text-12 ml-7">{{ retailerState?.retailer_code || '' }}</span>
            <DynamicTag :status="retailerState?.status ?? ''" isLoading />
          </div>

          <AButton size="large" @click="openModel(retailerState?.id ?? '')">
            Chỉnh sửa
          </AButton>
        </div>
        <div class="mt-30">
          <ul class="flex gap-30">
            <li>
              <div class="flex items-center gap-7">
                <i class="i-solar:phone-calling-rounded-bold text-20 block text-primary" />
                <span>Điện thoại</span>
              </div>

              <div class="mt-10" @click="copyText(retailerState?.phone ?? '')">
                <span class="text-spotlight hover:underline cursor-pointer">{{ retailerState?.phone ?? '-' }}</span>
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
            <li>
              <div class="flex items-center gap-7">
                <i class="i-ic:round-alternate-email text-20 block text-primary" />
                <span>Email</span>
              </div>
              <div class="mt-10" @click="copyText(retailerState?.email ?? '')">
                <span class="text-spotlight hover:underline cursor-pointer">{{ retailerState?.email ?? '-' }}</span>
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
            <li>
              <p>Số tài xế</p>
              <div class="mt-10" @click="activeKey = '2'">
                <span class="text-spotlight hover:underline cursor-pointer">{{ totalDrivers }}</span>
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
            <li>
              <div class="flex items-center gap-7">
                <i class="i-tdesign:system-sum text-20 block text-primary" />
                <span>{{ retailerSourceName }}</span>
              </div>
              <div class="mt-10">
                <DynamicTag :status="retailerState?.sync_status ?? ''" />
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
          </ul>
        </div>
      </section>
    </ASpin>

    <section class="card mt-20">
      <ATabs v-model:activeKey="activeKey" size="large" type="card">
        <template #renderTabBar="{ DefaultTabBar, ...props }">
          <Component :is="DefaultTabBar" v-bind="props" class="h-40" />
        </template>
        <ATabPane key="3" tab="Người dùng">
          <pre> {{ userRetailer }}</pre>
        </ATabPane>
        <ATabPane key="1" tab="Cấu hình" class="h-800 max-h-800 overflow-y-scroll">
          <ASpin :spinning="!retailerState">
            <VerticalTabsContainer
              v-model="selectedPlatform"
              :items="kiotVietOption"
              contentClass=""
              class="mt-16"
            >
              <!-- header -->
              <template #header>
                <div class="p-18 text-17 font-medium">
                  Cấu hình
                </div>
              </template>
              <!-- actions -->
              <template #actions>
                <div class="text-center p-12">
                  <AButton>+ Thêm mới</AButton>
                </div>
              </template>
              <!-- content -->
              <div class="">
                <div class="b-b b-b-abd b-b-solid p-16">
                  <div class="flex justify-end gap-10">
                    <AButton
                      :loading="loadingIds.has(EApiId.RETAILER_CHECK_REQUIRE_CONFIG)"
                      @click="checkRequiredConfig(true)"
                    >
                      Kiểm tra cấu hình
                    </AButton>

                    <AButton type="primary" @click="onEditConfig">
                      Edit
                    </AButton>
                  </div>
                </div>
                <div class="p-16">
                  <AList
                    :data-source="configsState"
                    size="small"
                  >
                    <template #renderItem="{ item } : {item: API.RetailerConfig}">
                      <AListItem :key="item.id">
                        <template #actions>
                          {{ formatDate(item.updated_at) }}
                          <!-- <span>{{ item?.updated_at || '-' }}</span> -->
                        </template>
                        <AListItemMeta>
                          <template #title>
                            {{ item.name }}
                          </template>
                          <template #description>
                            {{ item?.value || '-' }}
                          </template>
                        </AListItemMeta>
                      </AListItem>
                    </template>
                  </AList>
                </div>
              </div>
            </VerticalTabsContainer>
          </ASpin>
        </ATabPane>
        <ATabPane key="2" tab="Tài xế" class="h-800 max-h-800">
          <ASpin :spinning="!retailerState">
            <VerticalTabsContainer
              v-model="selectedValue"
              :items="tabItems"
              contentClass="max-h-600 overflow-y-scroll"
              tabClass="max-h-600 overflow-y-scroll"
              class="mt-16"
            >
              <!-- header -->
              <template #header>
                <div class="p-16 text-18 font-medium">
                  Nhóm tài xế
                </div>
              </template>
              <!-- actions -->
              <template #actions>
                <div class="text-center p-12">
                  <AButton>+ Thêm mới</AButton>
                </div>
              </template>
              <!-- content -->
              <div class="p-16">
                <AList
                  :data-source="driversState"
                  class=""
                >
                  <template #renderItem="{ item, index } : {item: API.Driver, index: number}">
                    <AListItem :key="item.id">
                      <template #actions>
                        <a>View Profile</a>
                      </template>
                      <AListItemMeta>
                        <template #title>
                          {{ item.name }}
                        </template>
                        <template #avatar>
                          <AAvatar size="large" :src="randomAvatar(index)" />
                        </template>
                        <template #description>
                          {{ item.description }}
                        </template>
                      </AListItemMeta>
                    </AListItem>
                  </template>
                </AList>
              </div>
            </VerticalTabsContainer>
          </ASpin>
        </ATabPane>
      </ATabs>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Modal, message } from 'ant-design-vue';

import { useVisibilityStore } from '@/stores/visibility.store';
import { useCommonStore } from '@/stores/common.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';
import { formatDate } from '@/utils/date.util';
import { retailerConfigApis } from '@/apis/sys-admin/retailer-mgt/retailer-config';
import { copyText } from '@/utils/common.util';

/**
 * 'retailerId' props also passthrough Router
 *  Checkout Retailer router module 'src/router/module/common/retailer.ts'
 */
const props = defineProps<{
  retailerId?: string
}>();

const ConfigUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerConfigUpdateForm.vue'));
const RetailerCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerCreateUpdateForm.vue'));

const { loadingIds } = storeToRefs(useVisibilityStore());
const { retailerId } = toRefs(props);
const { getRetailerTypes } = useCommonStore();

const retailerState = ref<API.Retailer>();
const driversState = ref<API.Driver[]>([]);
const configsState = ref<API.RetailerConfig[]>([]);
const retailerType = ref<API.RetailerConfigType[]>([]);
const selectedValue = ref('');
const activeKey = ref('1');

const groupDriver = computed(() => retailerState.value?.group_drivers ?? []);
const userRetailer = computed(() => retailerState.value?.user);

const totalDrivers = computed(() => driversState.value.length);

const retailerSourceName = computed(() => {
  const source = retailerType.value.find(i => i.retailer_type_code === retailerState.value?.source);
  if (!source) {
    return 'Chưa có source';
  }

  return source.name;
});

const randomAvatar = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
};

const initConfig = async () => {
  if (!retailerId?.value) {
    message.error('Thiếu retailerId');

    return;
  }

  const res = await retailerConfigApis.getCurrentConfigs(retailerId.value);
  if (!(res && res?.data?.length > 0)) {
    message.error(`Không tìm thấy retailer với id: ${retailerId.value}`);

    return;
  }
  configsState.value = res.data;
};

const initDetails = async () => {
  retailerType.value = await getRetailerTypes();
  if (!retailerId?.value) {
    message.error('Thiếu retailerId');

    return;
  }
  // fetch
  const res = await retailerApis.getDetails(retailerId.value, { includes: ['user', 'group_drivers'] });
  if (!(res && res.data.group_drivers)) {
    message.error(`Không tìm thấy retailer với id: ${retailerId.value}`);

    return;
  }
  selectedValue.value = res.data.group_drivers[0].group_driver_code;
  retailerState.value = res.data;
};

// const checkAuth = async () => {
//   if (!retailerId?.value) {
//     return;
//   }
//   const res = await retailerConfigApis.checkAuthConnection(retailerId.value);
//   if (res.data?.result) {
//     Modal.success({ content: res?.message ?? 'missing message', title: 'Hoàn tất cấu hình cần thiết!' });
//     initDetails();

//     return;
//   }
//   // TODO: refactor
//   const [title, missingItems] = res.message[0].split(':');
//   const content = missingItems.split(',').map(i => h('div', i));
//   Modal.error({ title, content });
//   initDetails();
// };

const checkRequiredConfig = async (byBassMsg: boolean) => {
  if (!retailerId?.value) {
    return;
  }
  const res = await retailerConfigApis.checkRequireConfigs(retailerId?.value ?? '');
  if (!res) {
    message.error('Call api error');

    return;
  }
  if (res.data?.result) {
    Modal.success({ content: res?.message ?? 'missing message', title: 'Hoàn tất cấu hình cần thiết!' });
    initDetails();
    // checkAuth();

    return;
  }
  // TODO: refactor
  const [title, missingItems] = res.message[0].split(':');
  const content = missingItems.split(',').map(i => h('div', i));
  Modal.error({ title, content });
  initDetails();
};

const onEditConfigSuccess = (modelId: string) => {
  coreModal.close(modelId);
  initConfig();
  checkRequiredConfig(false);
};

const onEditConfig = () => {
  const editModal = coreModal.show({
    component: ConfigUpdateForm,
    props: {
      retailerId: retailerId?.value ?? '',
      onCancel: () => coreModal.close(editModal),
      onSuccess: () => onEditConfigSuccess(editModal),
    },
  });
};

// dfdf________________________________________________________________________________________________

const tabItems = computed(() => {
  if (!retailerState.value?.group_drivers) {
    return [];
  }

  return retailerState.value?.group_drivers.map(i => ({
    value: i?.group_driver_code ?? '',
    label: i?.name ?? '',
  }));
});
const kiotVietOption = [{ label: 'KiotViệt', value: '1' }];
const selectedPlatform = ref('1');// kiotViet

const initDriver = async () => {
  // fetch
  const res = await driverApis.search({ items: 20 });
  if (!(res && res.data.drivers)) {
    return;
  }
  driversState.value = res.data.drivers;
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  initDetails();
};

const openModel = (retailerId?: string) => {
  const title = retailerId ? 'Cập nhật thông tin nhà bán lẻ' : 'Tạo mới nhà bán lẻ';
  const modalId = coreModal.show({
    component: RetailerCreateUpdateForm,
    title,
    props: {
      retailerId: retailerId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};

// _______________________________________________________________________________________________
const init = async () => {
  initDetails();
  initDriver();
  initConfig();
};
init();
</script>
