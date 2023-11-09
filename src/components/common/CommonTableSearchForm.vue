<template>
  <section class="card grid gap-10" @keypress.enter="onSearch">
    <div class="flex-btw-center">
      <ul class="flex gap-5">
        <li>
          <CInput
            v-model:value="quickSearchVal"
            placeholder="Tìm theo Tên, Mã hoặc Sđt"
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
        <li v-if="stateSearchItem.length !== 0">
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
          <!-- TODO: add dynamic component for search item and remove disabled after -->
          <AButton disabled size="large" class="self-end" @click="addNewSearchItem">
            <template #icon>
              <FilterFilled />
            </template>
          </AButton>
        </li>
      </ul>
    </div>
    <div v-if="stateSearchItem.length !== 0" ref="scrollElement" class="max-w-full overflow-x-auto overflow-y-hidden bg-slate-100 rounded-10 p-5">
      <TransitionGroup name="fade" tag="ul" class="flex gap-10 mt-7">
        <template v-for="item in stateSearchItem" :key="item.key">
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
import type { QueriesRaw } from '@/composable/useTableMethod';

const props = defineProps<{
  loading: boolean
  queries?: ApiQueryAttr<T>
  options?: any[]
  quickSearchKey: string
  rawSearchableItems: QueriesRaw<T>[]
}>();

const emits = defineEmits<{
  search: [v: QueriesRaw<T>[]]
  reset: [v?: any]
}>();

const { loading } = toRefs(props);

const stateSearchItem: Ref<QueriesRaw<T>[]> = ref([]);
const scrollElement = ref<HTMLElement>();
const quickSearchVal = ref('');

const filteredQueries = computed(() => {
  const queryItems: QueriesRaw<T>[] = [
    ...stateSearchItem.value,
    {
      key: props.quickSearchKey,
      label: '',
      value: quickSearchVal.value,
    }];

  return queryItems.filter(i => !!i.value);
});

const onSearch = () => {
  if (loading.value) {
    return;
  }
  emits('search', filteredQueries.value);
};

const addNewSearchItem = async () => {
  // TODO
  const stateKey = stateSearchItem.value.map(({ key }) => key);
  const data2 = randomPick(props.rawSearchableItems.filter(({ key }) => !stateKey.includes(key)));
  stateSearchItem.value.push(data2);

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

const removeSearchItem = (removeKey: any) => {
  // TODO
  const item = stateSearchItem.value.find(({ key }) => key === removeKey);
  if (!item) {
    return;
  }
  stateSearchItem.value = stateSearchItem.value.filter(i => i.key !== removeKey);
  if (item.value) {
    onSearch();
  }
};

const clearAll = () => {
  stateSearchItem.value = [];
  quickSearchVal.value = '';
  emits('search', []);
};
</script>
