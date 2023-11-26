<template>
  <div md="grid-cols-3 grid-flow-col" class="grid gap-8">
    <CommonRetailerStatistic class="col-span-2" />
    <div md="col-span-2 row-span-5" class="card min-h-400 m0 col-span-2">
      <BarChart />
    </div>
    <div md="row-span-6" class="card min-h-400 m0 col-span-2">
      {{ formatDate(dateconvvv, EDateFormat.UNIX_TIME) }}
      <strong>
        {{ Math.floor(new Date(dateconvvv).getTime() / 1000) }}
      </strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EDateFormat } from '@/enums/common.enum';
import { formatDate } from '@/utils/date.util';

const dateconvvv = '2023-01-01 00:00:00 UTC';
</script>
