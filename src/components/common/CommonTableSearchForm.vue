<template>
  <section class="card grid gap-10" @keypress.enter="onSearch">
    <div class="flex items-center justify-between">
      <CInput
        v-model:value="searchNameVal"
        placeholder="Nhập tên để tìm kiếm..."
        size="large"
        :maxlength="100"
        allow-clear
        class="w-400 self-end"
      >
        <template #suffix>
          <SearchOutlined />
        </template>
      </CInput>
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
          <AButton shape="round" size="small" class="self-end" @click="addNew">
            + Thêm bộ lọc
          </AButton>
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
    </div>
    <div v-if="state.length !== 0" ref="scrollElement" class="max-w-full overflow-x-auto overflow-y-hidden">
      <TransitionGroup name="fade" tag="ul" class="flex gap-10 my-7">
        <template v-for="item in state" :key="item.key">
          <li class="search-form-items shrink-0 basis-170">
            <CInput v-model:value="item.value" :label="item.label" size="small" class="rounded-full" />
            <i class="i-ic:baseline-cancel" @click="remove(item.key)" />
          </li>
        </template>
      </TransitionGroup>
    </div>
  </section>
</template>

<script lang="ts" setup generic="T">
import { ClearOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { randomPick, sleepFor } from '@/utils/common.util';

const props = defineProps<{
  loading: boolean
  queries?: ApiAttributeQuery<T>
  options?: any[]
}>();

const emits = defineEmits<{
  search: [v: ApiAttributeQuery<T>]
  reset: [v: void]
}>();

const scrollElement = ref<HTMLElement>();

const { loading } = toRefs(props);
interface TestVl {
  key: string
  label: string
  value: string | number
}

const searchNameVal = ref('');

const data: TestVl[] = [
  {
    key: 'name_cont',
    label: 'Tìm theo tên',
    value: '',
  },
  {
    key: 'email_cont',
    label: 'Tìm theo Email',
    value: '',
  },
  {
    key: 'email_eq',
    label: 'Tìm theo Email',
    value: '',
  },
  {
    key: 'email_dfdfdf',
    label: 'Tìm theo Email',
    value: '',
  },
  {
    key: 'email_dfdf',
    label: 'Tìm theo Email',
    value: '',
  },
];
const state = ref<TestVl[]>([]);

const addNew = async () => {
  const data2 = randomPick(data);
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

const remove = (key: string) => {
  state.value = state.value.filter(i => i.key !== key);
};

const onSearch = () => {
  if (loading.value) {
    return;
  }
  searchNameVal.value = searchNameVal.value.replace(/ {2,}/g, ' '); // keep 1 space on search conditions
  emits('search', { name_cont: searchNameVal.value } as unknown as ApiAttributeQuery<T>);
};

const clearAll = () => {
  state.value = [];
  emits('reset');
};
</script>
