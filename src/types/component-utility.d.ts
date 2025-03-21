import type { ComponentOptions, VNodeProps, Component } from "vue";

export {};

declare global {
  type ComponentProps<C extends Component> = C extends new (...args: any) => any
    ? Omit<InstanceType<C>["$props"], keyof VNodeProps>
    : never;

  type ComponentGenericCapture<T extends ComponentOptions<any>> = {
    component: T;
    emits?: T["emits"];
    props: ComponentProps<T>;
  };

  type CoreModalProps<T extends ComponentOptions<any>> =
    ComponentGenericCapture<T> & {
      title?: string;
      maskCloseable?: boolean;
      modalWidth?: string | number;
      showCloseBtn?: boolean;
    };

  type CoreAppModal = {
    id: string;
    headerTitle?: string;
    component: Component;
    props: ComponentProps<any>;
    event: ComponentOptions<any>["emits"];
    isOpen: boolean;
    modalWidth?: string | number;
    maskCloseable?: boolean;
    showCloseBtn?: boolean;
  };

  type CoreAsyncAlert = {
    severity?: 'error' | 'warn' | 'info' | 'success'
    strictMsg?: string | boolean
    content: string | string[]
  }
}
