import type { ComponentOptions } from 'vue';
import { v4 as uuid } from 'uuid';

export const modalState = reactive<Map<string, CoreAppModal>>(new Map());

export const coreModal = {
  show: <T extends ComponentOptions<any>>(modalContent: CoreModalProps<T>) => {
    const { component, emits, props, title, maskCloseable = false } = modalContent;
    const id = uuid();
    if (component) {
      const setState: CoreAppModal = {
        id,
        maskCloseable,
        component: shallowRef(component),
        headerTitle: title ?? '',
        props: props ?? {},
        event: emits ?? {},
        isOpen: true,
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
