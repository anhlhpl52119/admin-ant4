<template>
  <h3 class="mb-16 text-18">
    Hóa đơn gần đây
  </h3>
  <AList
    class="max-h-600 overflow-y-scroll cursor-default"
    :loading="loadIdsHas(EApiId.INVOICE_SEARCH)"
    itemLayout="horizontal"
    :data-source="sourceInvoices"
  >
    <!-- List render -->
    <template #renderItem="{ item, index }: {item: API.SourceInvoice, index: number}">
      <AListItem>
        <ASkeleton avatar :title="false" :loading="loadIdsHas(EApiId.INVOICE_SEARCH)" active>
          <AListItemMeta>
            <template #title>
              <div
                class="text-nowrap font-500 clickable"
                @click="onShowSourceInvoiceInfo(item?.id)"
              >
                {{ item?.source_invoice_code || '_' }}
              </div>
            </template>
            <template #description>
              <ul class="text-nowrap">
                <li>
                  Tài xế: <span
                    class="clickable"
                    @click="onShowDriverOverViewModal(item?.driver?.id)"
                  >{{ item?.driver?.name || '-' }}</span>
                </li>
                <li>{{ formatDate(item?.invoice_date, EDateFormat.DATE_API_QUERY) || '-' }}</li>
              </ul>
            </template>
            <template #avatar>
              <AAvatar :src="randomAvatar(index)" />
            </template>
          </AListItemMeta>
        </ASkeleton>
        <template #actions>
          <ul class="text-right">
            <li>{{ vndFormat(item.total_amount) }}</li>
            <li class="text-12">
              {{ timeFromNow(item.invoice_date) }}
            </li>
            <li>{{ formatDate(item?.invoice_date, EDateFormat.HOUR_AND_MINUTES) }}</li>
          </ul>
        </template>
      </AListItem>
    </template>

    <!-- Load More Button -->
    <template #loadMore>
      <div
        v-if="!loadIdsHas(EApiId.INVOICE_SEARCH)"
        class="mt-12 text-center"
      >
        <AButton type="link" @click="onLoadMore">
          Tải thêm
        </AButton>
      </div>
    </template>
  </AList>
</template>

<script lang="ts" setup>
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { EDateFormat } from '@/enums/common.enum';
import { EApiId } from '@/enums/request.enum';
import { formatDate, timeFromNow } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';

const DriverOverview = defineAsyncComponent(() => import('@/components/overview/retailer/DriverOverview.vue'));
const SourceInvoiceOverview = defineAsyncComponent(() => import('@/components/overview/retailer/SourceInvoiceOverview.vue'));

const sourceInvoices = ref<API.SourceInvoice[]>([]);
const { loadIdsHas } = useLoaderStore();

const composeSourceInvoiceInfo = async (page: number = 1) => {
  const rs = await invoiceApis.search({
    includes: ['driver'],
    items: 10,
    page,
    query: {
      status_eq: 'active',
      transaction_history_id_null: 'true',
      s: 'invoice_date desc',
    },
  });
  if (!(rs && rs?.data?.source_invoices?.length > 0)) {
    return;
  }
  sourceInvoices.value = rs.data.source_invoices;
};
const onLoadMore = () => {};
const onShowDriverOverViewModal = (driverId: string) => {
  if (!driverId) {
    return;
  }
  coreModal.show({
    component: DriverOverview,
    modalWidth: '80rem',
    props: {
      driverId,
    },
  });
};

const onShowSourceInvoiceInfo = (invoiceId: string) => {
  if (!invoiceId) {
    return;
  }
  coreModal.show({
    component: SourceInvoiceOverview,
    modalWidth: '80rem',
    title: 'Thông tin hóa đơn',
    props: {
      invoiceId,
    },
  });
};

const randomAvatar = (idx: number) => {
  return `https://i.pravatar.cc/150?img=${idx}`;
};
composeSourceInvoiceInfo();
</script>
