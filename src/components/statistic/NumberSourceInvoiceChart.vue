<template>
  <div class="p-12">
    <h3 class="text-spotlight text-18">
      Thống kê số lượng hóa đơn
    </h3>
    <ASpin :spinning="loading">
      <div md="h-400 w-full" class="w-400 h-500">
        <Bar
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
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';

import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import { retailerDashboardApis } from '@/apis/retailer/dashboard/dashboard';
import { dateGap, formatDate, isValidDate } from '@/utils/date.util';
import { EDateFormat } from '@/enums/common.enum';
import { sleepFor } from '@/utils/common.util';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// TEMPPPPP
const MOCK_RESPONSE = {
  '2023-09-01 00:00:00 UTC': 88,
  '2023-01-01 00:00:00 UTC': 78,
  '2023-10-01 00:00:00 UTC': 87,
  '2023-04-01 00:00:00 UTC': 81,
  '2023-05-01 00:00:00 UTC': 82,
  '2023-08-01 00:00:00 UTC': 70,
  '2023-07-01 00:00:00 UTC': 94,
  '2023-02-01 00:00:00 UTC': 97,
  '2023-06-01 00:00:00 UTC': 97,
  '2023-03-01 00:00:00 UTC': 90,
};
// TEMPPPPPPP

const chartOptions = {
  responsive: true,
  borderRadius: 4,
  borderWidth: 1,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const loading = ref(false);
const state = reactive({
  period: 'month' as 'day' | 'month' | 'year',
  startDate: 1672531200,
  endDate: 0, // 1704067199
});

const formatMap = (date: string | Dayjs) => {
  switch (state.period) {
    case 'day':
      return formatDate(date, EDateFormat.ONLY_DAY);
    case 'month':
      return formatDate(date, EDateFormat.MONTH_NAME);
    case 'year':
      return formatDate(date, EDateFormat.ONLY_YEAR);
    default:
      return '';
  }
};

const statisticState = ref<Record<string, number>>({});

const countRange = computed(() => {
  return dateGap(state.endDate, state.startDate, state.period);
});

const statisticMap = computed<Map<string, number>>(() => {
  const map = new Map<string, number>();

  if (Object.keys(statisticState.value).length === 0) {
    return map;
  }

  Object.entries(statisticState.value).forEach(([key, val]) => {
    if (!isValidDate(key)) {
      return;
    }
    map.set(formatMap(key), val);
  });

  return map;
});

const chartLabel = computed(() => {
  const rs: string[] = [];
  if (!countRange.value) {
    return rs;
  }
  for (let i = 0; i <= countRange.value; i++) {
    const nowDate = dayjs.unix(state.startDate).add(i, state.period);
    if (isValidDate(nowDate)) {
      rs.push(formatMap(nowDate));
    }
  }
  return rs;
});

const chartDataSet = computed(() => {
  const rs: number[] = [];
  chartLabel.value.forEach((i) => {
    if (statisticMap.value.get(i)) {
      rs.push(Number(statisticMap.value.get(i)));
    }
  });
  return rs;
});

const chartData = computed(() => ({
  labels: chartLabel.value,
  datasets: [{
    label: '',
    data: chartDataSet.value,
    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
    borderColor: ['rgb(75, 192, 192)'],
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
  statisticState.value = MOCK_RESPONSE;
  loading.value = false;
};
testsss();
</script>
