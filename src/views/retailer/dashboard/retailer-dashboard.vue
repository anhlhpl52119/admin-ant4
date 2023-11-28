<template>
  <div>
    <div lg="grid-cols-3 grid-flow-col h-500" md="grid-cols-2" class="grid gap-8">
      <CommonRetailerStatistic class="col-span-2" />
      <div lg="col-span-2 row-span-5" class="card min-h-400 m0 col-span-2">
        <NumberSourceInvoiceChart />
      </div>
      <div lg="row-span-6" class="card m0 col-span-2">
        <LatestInvoice />
      </div>
      <div lg="row-span-3" class="col-span-2">
        <TopDriverInvoiceAmount />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
