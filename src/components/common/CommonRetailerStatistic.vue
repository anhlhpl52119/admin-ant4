<template>
  <div class="grid grid-cols-2 gap-12 md:grid-cols-4">
    <template v-for="item in renderItem" :key="item.id">
      <div class="card m-0 flex flex-col justify-between" :class="item.className">
        <div class="line-clamp-2">
          <h3 class="text-16 font-500">
            {{ item.name }}
          </h3>
        </div>
        <ul class="flex-btw-center mt-auto">
          <li>
            <i class="block text-28" :class="item.icon" />
          </li>
          <li class="text-18 font-800">
            {{ item.value }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const renderItem = reactive([
  {
    id: '1',
    name: 'Hóa đơn mới',
    icon: 'i-basil:invoice-solid',
    className: 'bg-#ecf3ff text-#8190e9',
    value: '125',
  },
  {
    id: '2',
    name: 'Phiếu thanh toán đang chờ',
    icon: 'i-tdesign:undertake-transaction',
    className: 'bg-#fef5e6 text-#f2bd13',
    value: '50',
  },
  {
    id: '3',
    name: 'Tài xế',
    icon: 'i-game-icons:steering-wheel',
    className: 'bg-#e8f7ff',
    value: '50',
  },
  {
    id: '4',
    name: 'Chi nhánh',
    icon: 'i-ic:round-store-mall-directory',
    className: 'bg-#e5fffb text-#3cdbb3',
    value: '2',
  },
]);
</script>
