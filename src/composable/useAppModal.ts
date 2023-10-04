import type { Component } from 'vue';

export const useAppModal = () => {
  const component = shallowRef<Component>();
  const modalTitle = ref<string>('');

  return {
    component,
  };
};
