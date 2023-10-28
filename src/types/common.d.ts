import type { ComponentOptions, VNodeProps, Component } from "vue";

export {};

declare global {
  type CommonOption<T = any> = {
    label: string;
    value: OrNull<string | number>;
    disabled?: boolean
    item?: T
  }
}
