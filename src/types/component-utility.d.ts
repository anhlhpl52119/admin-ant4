import type { ComponentOptions, VNodeProps, Component } from "vue";

export {};

declare global {
  type ComponentProps<C extends Component> = C extends new (...args: any) => any
    ? Omit<InstanceType<C>["$props"], keyof VNodeProps>
    : never;

  type ComponentGenericCapture<T extends ComponentOptions<any>> = {
    component: T;
    emits: T["emits"];
    props: ComponentProps<T>;
  };

  type CoreAppModal = {
    modalTitle?: string
    component?: Component | undefined
    props?: ComponentProps<any> | undefined
    emitEvent?: ComponentOptions<any>['emits'] | undefined
    isOpen: boolean
  }
}
