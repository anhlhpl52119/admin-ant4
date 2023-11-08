<template>
  <div>
    hello
  </div>
</template>

<script lang="ts" setup>
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';

const props = defineProps<{
  driverId: string
}>();

const { driverId } = toRefs(props);
const driverInvoices = reactive({
  records: [] as API.SourceInvoice[],
  total: 0,
});

const getDriverUnpaidInvoice = async () => {
  const rs = await invoiceApis.search({
    items: 10,
    query: {
      driver_id_eq: driverId.value,
      transaction_history_id_null: 'true',
      s: 'invoice_date desc',
    },
  });

  const invoices = rs?.data?.source_invoices;
  if (!invoices || invoices.length === 0) { return; }

  driverInvoices.records = invoices;
  driverInvoices.total = rs.data.total_records;
};
</script>
