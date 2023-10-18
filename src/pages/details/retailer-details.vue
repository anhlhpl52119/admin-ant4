<template>
  <div>
    <ASpin :spinning="!retailerState">
      <section class="card mt-0 cursor-default">
        <div class="flex-btw-center">
          <div>
            <ABadge status="success" dot class="text-20 ml-10">
              <AAvatar shape="square" size="large" :src="randomAvatar(50)" />
            </ABadge>

            <span class="text-spotlight text-24 ml-7">{{ retailerState?.name || '-' }}</span>
            <span class="text-desc text-12 ml-7">{{ retailerState?.code || '-' }}</span>
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
              <div class="mt-10">
                <span class="text-spotlight">{{ totalDrivers }}</span>
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
            <li>
              <div class="flex items-center gap-7">
                <i class="i-tdesign:system-sum text-20 block text-primary" />
                <span>{{ retailerSourceName }}</span>
              </div>
              <div class="mt-10">
                <ATag :color="syncStatusTag(retailerState?.sync_status ?? 'not_config').color">
                  {{ syncStatusTag(retailerState?.sync_status ?? 'not_config').content.toUpperCase() }}
                </ATag>
              </div>
            </li>
            <ADivider type="vertical" class="h-50" />
          </ul>
        </div>
      </section>
    </ASpin>

    <section class="card mt-20">
      <ADivider>Cấu hình</ADivider>
      <!-- Nhóm Tài xế -->
      <ASpin :spinning="!retailerState">
        <VerticalTabsContainer
          v-model="selectedPlatform"
          :items="kiotVietOption"
          contentClass=""
          class="mt-16"
        >
          <!-- header -->
          <template #header>
            <div class="p-16 text-18 font-medium">
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
                  @click="checkCommonConfig"
                >
                  Test required config
                </AButton>

                <AButton type="primary" @click="onEdit">
                  Edit
                </AButton>
              </div>
            </div>
            <div class="p-16">
              <AList
                :data-source="configsState"
                class=""
              >
                <template #renderItem="{ item } : {item: API.RetailerConfig}">
                  <AListItem :key="item.id">
                    <template #actions>
                      <span>{{ item?.updated_at || '-' }}</span>
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
      <ADivider>Nhóm Tài xế</ADivider>
      <!-- Nhóm Tài xế -->
      <ASpin :spinning="!retailerState">
        <VerticalTabsContainer
          v-model="selectedValue"
          :items="tabItems"
          contentClass="max-h-350 overflow-y-scroll"
          tabClass="max-h-350 overflow-y-scroll"
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
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Modal, message } from 'ant-design-vue';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { driverApis } from '@/apis/core/driver/driver.api';
import { useVisibilityStore } from '@/stores/visibility.store';
import { useCommonStore } from '@/stores/common.store';
import { EApiId } from '@/enums/request.enum';

// *this props also passthrough Router, checkout Retailer router module '/details'
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
const retailerType = ref<API.RetailerType[]>([]);

const groupDriver = computed(() => retailerState.value?.group_drivers ?? []);
const userRetailer = computed(() => retailerState.value?.user ?? undefined);

const totalDrivers = computed(() => driversState.value.length);

const randomAvatar = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
};

const copyText = async (val: string) => {
  message.destroy();
  try {
    await navigator.clipboard.writeText(val);
    message.success(`Copied: ${val}`);
  }
  catch (e) {}
};

const retailerSourceName = computed(() => {
  console.log(retailerState.value?.code);
  const source = retailerType.value.find(i => i.code === retailerState.value?.source);
  if (!source) {
    return 'Chưa có source';
  }

  return source.name;
});

const syncStatusTag = (status: API.RetailerSyncStatus) => {
  switch (status) {
    case 'not_config':
      return { color: 'geekblue', content: 'Chưa config' };
    case 'full_synced':
      return { color: 'success', content: 'Full sync' };
    case 'ready_to_sync':
      return { color: 'cyan', content: 'Sẵn sàng sync' };
    case 'sync_failed':
      return { color: 'magenta', content: 'Sync thất bại' };
    case 'synced':
      return { color: 'success', content: 'Đã sync' };
    case 'webhook_not_enough':
      return { color: 'purple', content: 'Webhook không đủ' };
    default:
      return { color: 'purple', content: 'chưa xác định' };
  }
};

const initConfig = async () => {
  if (!retailerId?.value) {
    message.error('Thiếu retailerId');

    return;
  }
  const res = await retailerApis.getConfigs(retailerId.value);
  if (!(res && res?.data?.length > 0)) {
    message.error(`Không tìm thấy retailer với id: ${retailerId.value}`);

    return;
  }
  configsState.value = res.data;
};

const onEditConfigSuccess = (modelId: string) => {
  coreModal.close(modelId);
  initConfig();
};
const onEdit = () => {
  const editModal = coreModal.show({
    component: ConfigUpdateForm,
    props: {
      retailerId: retailerId?.value ?? '',
      onCancel: () => coreModal.close(editModal),
      onSuccess: () => onEditConfigSuccess(editModal),
    },
    modalWidth: '90rem',
  });
};
const checkCommonConfig = async () => {
  if (!retailerId?.value) {
    return;
  }
  const res = await retailerApis.checkRequireConfigs(retailerId?.value ?? '');
  if (!res) {
    message.error('Call api error');

    return;
  }
  if (res.data?.result) {
    Modal.success({ content: res?.message ?? 'missing message', title: 'Hoàn tất cấu hình cơ bản!' });

    return;
  }
  // TODO: refactor
  const [title, missingItems] = res.message[0].split(':');
  const content = missingItems.split(',').map(i => h('div', i));
  Modal.error({ title, content });
};

// dfdf________________________________________________________________________________________________

const selectedValue = ref('');

const tabItems = computed(() => {
  if (!retailerState.value?.group_drivers) {
    return [];
  }

  return retailerState.value?.group_drivers.map(i => ({
    value: i?.code ?? '',
    label: i?.name ?? '',
  }));
});
const kiotVietOption = [{ label: 'KiotViệt', value: '1' }];
const selectedPlatform = ref('1');// kiotViet
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
  selectedValue.value = res.data.group_drivers[0].code;
  retailerState.value = res.data;
};

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
