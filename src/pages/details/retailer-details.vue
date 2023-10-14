<template>
  <section class="card">
    <ASpin :spinning="!retailerState">
      <ADescriptions title="Tổng quan" bordered>
        <ADescriptionsItem label="Tên">
          {{ retailerState?.name || '-' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Mô tả">
          {{ retailerState?.description || '-' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Trạng thái ">
          {{ retailerState?.status || '-' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Liên hệ">
          {{ retailerState?.phone ?? '-' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Địa chỉ">
          {{ retailerState?.address || '-' }}
        </ADescriptionsItem>
      </ADescriptions>
    </ASpin>
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
            <AButton>Edit</AButton>
            <AButton>Test</AButton>
          </div>
          <div class="p-16">
            <AList
              :data-source="configsState"
              class="max-h- overflow-y-scroll"
            >
              <template #renderItem="{ item } : {item: API.RetailerConfig}">
                <AListItem :key="item.id">
                  <template #actions>
                    <a>View Profile</a>
                  </template>
                  <AListItemMeta>
                    <template #title>
                      {{ item.name }}
                    </template>
                    <template #description>
                      {{ item.description }}
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
                    <AAvatar size="large" :src="auto(index)" />
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
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { driverApis } from '@/apis/core/driver/driver.api';

// *this props also passthrough Router, checkout Retailer router module '/details'
const props = defineProps<{
  retailerId?: string
}>();

const { retailerId } = toRefs(props);

const retailerState = ref<API.Retailer>();
const driversState = ref<API.Driver[]>([]);
const configsState = ref<API.RetailerConfig[]>([]);

const groupDriver = computed(() => retailerState.value?.group_drivers ?? []);
const userRetailer = computed(() => retailerState.value?.user ?? undefined);

const auto = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
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

const initDriver = async () => {
  // fetch
  const res = await driverApis.search({ items: 20 });
  if (!(res && res.data.drivers)) {
    return;
  }
  driversState.value = res.data.drivers;
};

// _______________________________________________________________________________________________
const init = async () => {
  initDetails();
  initDriver();
  initConfig();
};
init();
</script>
