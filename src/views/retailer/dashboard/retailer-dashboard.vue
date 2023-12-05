<template>
  <div>
    <div
      class="grid gap-8"
      lg="grid-cols-3 grid-flow-dense"
    >
      <div lg="col-span-2">
        <CommonRetailerStatistic />
      </div>
      <div lg="row-span-5 col-span-2" class="card min-h-400 m0">
        <NumberSourceInvoiceChart />
      </div>
      <div lg="row-span-6" class="card m0 ">
        <LatestInvoiceList />
      </div>
      <div lg="row-span-6" class="card m0">
        <TopDriverInvoiceAmount />
      </div>
    </div>
  </div>
</template>
