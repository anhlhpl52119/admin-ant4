<template>
  <AAutoComplete
    :value="value"
    :placeholder="placeholder ?? 'Nhập email'"
    :options="domainOptions"
    @search="handleSearch"
    @select="onSelect"
    @keypress.enter="preventEnterToSubmit"
  >
    <!-- FIXME: update ant 4.0.4 to resolve this error message -->
    <template #option="{ value: val }">
      <span>{{ val.split('@')[0] }}</span>
      <span class="font-medium text-info">
        @{{ val.split('@')[1] }}
      </span>
    </template>
  </AAutoComplete>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { GENERAL_EMAIL_DOMAIN } from '@/constants/common.constant';
import { stringWithoutDiacritics } from '@/utils/common.util';

interface Option {
  value: string
}
const props = defineProps<{
  value: string
  placeholder?: string
}>();

const emits = defineEmits<{
  'update:value': [v: string]
}>();

const { value, placeholder } = toRefs(props);
const domainOptions = ref<Option[]>([]);

/** handle user typing on input */
const handleSearch = (inputVal: string) => {
  // remove diacritics all space and 2nd '@' in search value
  const val = stringWithoutDiacritics(inputVal).replace(/\s/g, '').replace(/^([^@]*@[^@]*)@/, '$1').toLowerCase();
  emits('update:value', val);

  // case user not type '@' yet
  if (!val.includes('@')) {
    domainOptions.value = [];

    return;
  }

  const [name, domain] = val.split('@');
  // case user not type any domain name after '@'
  if (!domain) {
    domainOptions.value = GENERAL_EMAIL_DOMAIN.map(i => ({ value: `${name}@${i}` }));

    return;
  }

  // find out similar result on user typing domain with GENERAL_EMAIL_DOMAIN
  const similarDomains = GENERAL_EMAIL_DOMAIN.filter(i => i.includes(domain));

  // case no similar domains with input
  if (similarDomains.length === 0) {
    domainOptions.value = [];

    return;
  }

  // case recommend domain
  domainOptions.value = similarDomains.map(i => ({ value: `${name}@${i}` }));
};

/** Prevent submit form when press enter to chose options */
const preventEnterToSubmit = (e: Event) => {
  e.preventDefault();
};

/** handle user select item in suggestion options */
const onSelect = (v: any) => {
  emits('update:value', v);
};
</script>
