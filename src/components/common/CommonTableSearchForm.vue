<template>
  <section class="card flex items-end justify-between" @keypress.enter="$emit('search')">
    <CInput
      v-model:value="searchNameVal"
      placeholder="Nhập tên để tìm kiếm..."
      size="large"
      allow-clear
      class="w-400 self-end"
    >
      <template #suffix>
        <SearchOutlined />
      </template>
    </CInput>
    <TransitionGroup name="fade" tag="ul" class="flex gap-10 flex-wrap">
      <template v-for="item in state" :key="item.key">
        <li class="search-form-items">
          <CInput v-model:value="item.value" :label="item.label" size="small" class="rounded-full" />
          <i class="i-ic:baseline-cancel" @click="remove(item.key)" />
        </li>
      </template>
      <AButton shape="round" size="small" class="self-end" @click="addNew">
        + Thêm bộ lọc
      </AButton>
    </TransitionGroup>
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
        <AButton
          type="primary" size="large"
          :loading="loading"
          @click="$emit('search')"
        >
          Tìm
          <template #icon>
            <SearchOutlined />
          </template>
        </AButton>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup generic="T">
import { ClearOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { randomPick } from '@/utils/common.util';

const props = defineProps<{
  loading: boolean
  queries?: ApiAttributeQuery<T>
  options?: any[]
}>();

const emits = defineEmits<{
  search: [v: ApiAttributeQuery<T>]
  reset: [v: void]
}>();

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

const addNew = () => {
  const data2 = randomPick(data);
  state.value.push(data2);
};

const remove = (key: string) => {
  state.value = state.value.filter(i => i.key !== key);
};

const clearAll = () => {
  state.value = [];
  emits('reset');
};
</script>
