import type { ComponentOptions } from 'vue';

export const visibleModalState = ref<CoreAppModal>({ isOpen: false });

export const coreModal = {
  show: <T extends ComponentOptions<any>>(modalContent: ComponentGenericCapture<T> & { modalTitle?: string }) => {
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
  },
  close: () => {
    visibleModalState.value = { isOpen: false };
  },
};
