<template>
  <section class="card grid gap-10" @keypress.enter="onSearch">
    <div class="flex-btw-center">
      <ul class="flex gap-5">
        <li>
          <CInput
            v-model:value="searchNameVal"
            placeholder="Nhập tên để tìm kiếm..."
            size="large"
            :maxlength="70"
            allowClear
            class="w-400 self-end"
          >
            <template #suffix>
              <SearchOutlined />
            </template>
          </CInput>
        </li>
        <li>
          <AButton
            type="primary" size="large"
            :loading="loading"
            @click="onSearch"
          >
            Tìm
            <template #icon>
              <SearchOutlined />
            </template>
          </AButton>
        </li>
      </ul>

      <ul class="justify-self-end flex gap-5 items-center">
        <li v-if="state.length !== 0">
          <AButton
            size="small"
            shape="round"
            danger
            :loading="loading"
            class="group"
            @click="clearAll"
          >
            <span>Xóa bộ lọc</span>
            <template #icon>
              <ClearOutlined />
            </template>
          </AButton>
        </li>
        <li>
          <AButton size="large" class="self-end" @click="addNewSearchItem">
            <template #icon>
              <FilterFilled />
            </template>
          </AButton>
        </li>
      </ul>
    </div>
    <div v-if="state.length !== 0" ref="scrollElement" class="max-w-full overflow-x-auto overflow-y-hidden bg-slate-100 rounded-10 p-5">
      <TransitionGroup name="fade" tag="ul" class="flex gap-10 mt-7">
        <template v-for="item in state" :key="item.key">
          <li class="search-form-items shrink-0 basis-170">
            <FieldTitle :title="item.label">
              <CInput v-model:value="item.value" size="small" class="rounded-full" />
            </FieldTitle>
            <i class="i-ic:baseline-cancel" @click="removeSearchItem(item.key)" />
          </li>
        </template>
      </TransitionGroup>
    </div>
  </section>
</template>

<script lang="ts" setup generic="T">
import { ClearOutlined, FilterFilled, SearchOutlined } from '@ant-design/icons-vue';
import { randomPick, sleepFor } from '@/utils/common.util';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

const props = defineProps<{
  loading: boolean
  queries?: ApiQueryAttr<T>
  options?: any[]
  raw: QueriesRaw<T>[]
}>();

const emits = defineEmits<{
  search: [v: QueriesRaw<T>[]]
  reset: [v: void]
}>();

const rawData = props.raw;
const state = ref<QueriesRaw<T>[]>([]) as Ref<QueriesRaw<T>[]>;

const scrollElement = ref<HTMLElement>();

const { loading } = toRefs(props);

const searchNameVal = ref('');

const addNewSearchItem = async () => {
  const stateKey = state.value.map(({ key }) => key);
  const data2 = randomPick(rawData.filter(({ key }) => !stateKey.includes(key)));
  state.value.push(data2);

  await sleepFor(100);
  if (!scrollElement.value) {
    return;
  }

  scrollElement.value.scrollTo({
    behavior: 'smooth',
    top: 0,
    left: 20000,
  });
};

const onSearch = () => {
  if (loading.value) {
    return;
  }
  const queryRaw = [...state.value];
  if (searchNameVal.value) {
    searchNameVal.value = searchNameVal.value.replace(/ {2,}/g, ' '); // keep 1 space on search conditions
    queryRaw.push({ key: 'name_cont' as keyof RansackQuery<T>, label: '', value: searchNameVal.value });
  }
  emits('search', queryRaw);
};

const removeSearchItem = (removeKey: any) => {
  const item = state.value.find(({ key }) => key === removeKey);
  if (!item) {
    return;
  }
  state.value = state.value.filter(i => i.key !== removeKey);
  if (item.value) {
    onSearch();
  }
};

const clearAll = () => {
  state.value = [];
  searchNameVal.value = '';
  emits('search', []);
};
</script>
