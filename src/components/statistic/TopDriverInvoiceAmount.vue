<template>
  <div class="p-12">
    <h3 class="text-spotlight text-18 mb-16">
      Tài xế có đơn đóng góp nhiều nhất
    </h3>
    <ASpin :spinning="loading">
      <div>
        <PolarArea
          id="my-chart-id"
          class="!h-full !w-full"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </ASpin>
  </div>
</template>

<script setup lang="ts">
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { PolarArea } from 'vue-chartjs';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { retailerDashboardApis } from '@/apis/retailer/dashboard/dashboard';
import { dateGap, formatDate, isValidDate } from '@/utils/date.util';
import { EDateFormat } from '@/enums/common.enum';
import { sleepFor } from '@/utils/common.util';
import { vndFormat } from '@/utils/number.util';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const topDriverState = ref<API.DriverContribute[]>([]);

const loading = ref(false);

const chartLabel = computed(() => {
  return topDriverState.value.map(i => i?.name || '');
});

const chartDataSet = computed(() => {
  return topDriverState.value.map(i => Number(i.total));
});

const chartData = computed(() => ({
  labels: chartLabel.value,
  datasets: [{
    label: '',
    data: chartDataSet.value,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)',
    ],
  }],
}));

const init = async () => {
  loading.value = true;
  const rs = await retailerDashboardApis.topDriverTotalAmount({
    start_date: 1672531200,
    end_date: 1704067199,
  });
  loading.value = false;
  if (!rs?.data) {
    return;
  }
  topDriverState.value = rs.data;
};
init();
</script>
