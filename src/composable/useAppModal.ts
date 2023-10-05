import type { Component, ComponentOptions } from 'vue';

interface AppModal {
  modalTitle?: string
  component?: Component | undefined
  props?: ComponentProps<any> | undefined
  emitEvent?: ComponentOptions<any>['emits'] | undefined
  isOpen: boolean
}
export const visibleModalState = ref<AppModal>({ isOpen: false });

export const showModal = <T extends ComponentOptions<any>>(modalContent: ComponentGenericCapture<T> & { modalTitle?: string }) => {
  const { component, emits, props, modalTitle } = modalContent;
  if (!component) {
    return;
  }
  visibleModalState.value = {
    component: shallowRef(component),
    props,
    emitEvent: emits ?? {},
    isOpen: true,
    modalTitle,
  };
};
export const closeModal = () => {
  visibleModalState.value = { isOpen: false };
};
