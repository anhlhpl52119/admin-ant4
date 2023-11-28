<template>
  <div class="p-12">
    <h3 class="text-spotlight text-18 mb-16">
      Tài xế có đơn đóng góp nhiều nhất
    </h3>
    <ASpin :spinning="loading">
      <div md="h-400 w-full" class="w-400 h-500">
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

// TEMPPPPP
const MOCK_RESPONSE2 = [
  {
    name: 'Driver name 11',
    code: '01887396986',
    total: '141750.0',
  },
  {
    name: 'Driver name 44',
    code: '01641140772',
    total: '128250.0',
  },
  {
    name: 'Driver name 14',
    code: '0866167339',
    total: '126000.0',
  },
  {
    name: 'Driver name 46',
    code: '0885106128',
    total: '126000.0',
  },
  {
    name: 'Driver name 45',
    code: '01637203520',
    total: '121500.0',
  },
  {
    name: 'Driver name 10',
    code: '01677005878',
    total: '119250.0',
  },
  {
    name: 'Driver name 31',
    code: '01995443650',
    total: '112500.0',
  },
  {
    name: 'Driver name 17',
    code: '01627003650',
    total: '110250.0',
  },
  {
    name: 'Driver name 40',
    code: '01653534838',
    total: '110250.0',
  },
  {
    name: 'Driver name 47',
    code: '0866130368',
    total: '110250.0',
  },
];

// TEMPPPPPPP
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const loading = ref(false);
const state = reactive({
  period: 'month' as 'day' | 'month' | 'year',
  startDate: 1672531200,
  endDate: 0, // 1704067199
});

const chartLabel = computed(() => {
  return MOCK_RESPONSE2.map(i => i?.name || '');
});

const chartDataSet = computed(() => {
  return MOCK_RESPONSE2.map(i => vndFormat(i?.total));
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

const testsss = async () => {
  loading.value = true;
  // const rs = await retailerDashboardApis.invoicesChart({
  //   period: 'month',
  //   start_date: 1672531200,
  //   end_date: 1704067199,
  // });

  await sleepFor(500);
  state.period = 'month';
  state.endDate = 1704067199;
  loading.value = false;
};
testsss();
</script>
