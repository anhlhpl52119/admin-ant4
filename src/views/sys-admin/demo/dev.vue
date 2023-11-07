<template>
  <main>
    <div class="text-spotlight">
      Demo Store
    </div>
    <AButton type="primary" :loading="loadIdsHas([EApiId.RETAILER_SEARCH, EApiId.BRANCH_SEARCH, EApiId.DRIVER_CREATE])" @click="asd">
      Click loader normal
    </AButton>
  </main>
</template>

<script lang="ts" setup>
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';
import { EApiId } from '@/enums/request.enum';
import { sleepFor } from '@/utils/common.util';

const loader = useLoaderStore();
const { loadIdsHas } = storeToRefs(useLoaderStore());

retailerApis.search();
const fetch = async () => {
  loader.addLoadingItem(EApiId.RETAILER_SEARCH);
  await sleepFor(1000);
  loader.removeLoadingItem(EApiId.RETAILER_SEARCH);
  await sleepFor(200);
  loader.addLoadingItem(EApiId.DRIVER_CREATE);
  await sleepFor(2000);
  loader.removeLoadingItem(EApiId.DRIVER_CREATE);
};
// const fetch2 = async () => {
//   loader.addLoadingItem(EApiId.BRANCH_SEARCH);
//   await sleepFor(2000);
//   loader.removeLoadingItem(EApiId.BRANCH_SEARCH);
// };
const asd = () => {
  fetch();
  // fetch2();
};
</script>
