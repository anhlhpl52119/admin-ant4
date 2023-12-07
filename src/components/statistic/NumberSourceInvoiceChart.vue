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
import { dateGap, formatDate, getBoundaryDateOfMonth, isValidDate, toUnixTime } from '@/utils/date.util';
import { EDateFormat } from '@/enums/common.enum';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const START_DATE_OF_CURRENT_MONTH = getBoundaryDateOfMonth('startDate');
const END_DATE_OF_CURRENT_MONTH = getBoundaryDateOfMonth('endDate');

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
  plugins: {
    tooltip: {
      callbacks: {
        label: (item: any) => `${item.dataset.label} ${item.formattedValue} hóa đơn`,
      },
    },
  },

};

const loading = ref(false);
const state = reactive({
  period: 'month' as 'day' | 'month' | 'year',
  startDate: toUnixTime(START_DATE_OF_CURRENT_MONTH),
  endDate: toUnixTime(END_DATE_OF_CURRENT_MONTH),
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

const init = async () => {
  loading.value = true;
  if (!(START_DATE_OF_CURRENT_MONTH && END_DATE_OF_CURRENT_MONTH)) {
    showAsyncAlert({
      content: 'Lỗi định đang ngày tháng',
      severity: 'error',
    });
    return;
  }

  const startOfMonthUnix = toUnixTime(START_DATE_OF_CURRENT_MONTH);
  const endOfMonthUnix = toUnixTime(END_DATE_OF_CURRENT_MONTH);
  const rs = await retailerDashboardApis.invoicesChart({
    period: 'month',
    start_date: startOfMonthUnix,
    end_date: endOfMonthUnix,
  });
  loading.value = false;
  if (!rs?.data) {
    return;
  }
  state.period = 'month';
  statisticState.value = rs.data;
  loading.value = false;
};
init();
</script>
