<template>
  <div md="grid-cols-3 grid-flow-col h-600" class="grid gap-8">
    <CommonRetailerStatistic class="col-span-2" />
    <div md="col-span-2 row-span-5" class="card min-h-400 m0 col-span-2">
      <BarChart />
    </div>
    <div md="row-span-6" class="card m0 col-span-2">
      <LatestInvoice />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EDateFormat } from '@/enums/common.enum';
import { formatDate, toUnixTime } from '@/utils/date.util';

const dateconvvv = '2023-01-01 00:00:00 UTC';
</script>
