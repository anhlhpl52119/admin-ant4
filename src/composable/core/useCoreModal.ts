import type { ComponentOptions } from 'vue';
import { v4 as uuid } from 'uuid';

export const modalState = reactive<Map<string, CoreAppModal>>(new Map());

type ModalProps<T extends ComponentOptions<any>> = CoreModalProps<T>

export const coreModal = {
  show: <T extends ComponentOptions<any>>(modalContent: ModalProps<T>) => {
    const id = uuid();
    const { component, emits, props, title, maskCloseable = false, modalWidth, showCloseBtn } = modalContent;
    if (component) {
      const setState: CoreAppModal = {
        id,
        maskCloseable,
        component: shallowRef(component),
        headerTitle: title ?? '',
        props: props ?? {},
        event: emits ?? {},
        isOpen: true,
        modalWidth,
        showCloseBtn,
      };
      modalState.set(id, setState);
    }

    return id; // use for handle state close
  },
  close: (id: string) => {
    const modal = modalState.get(id);
    if (modal) {
      modal.isOpen = false;
    }
  },
  destroyAll: () => {
    modalState.clear();
  },
};
