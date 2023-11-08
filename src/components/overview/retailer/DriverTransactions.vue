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

const getDriverUnpaidInvoice = async () => {
  const rs = await invoiceApis.search({
    items: 10,
    query: {
      driver_id_eq: driverId.value,
      s: 'invoice_date desc',
    },
  });
};
</script>
