import type { CamelCasedPropertiesDeep, PartialDeep, RequiredDeep } from 'type-fest';

export {};

declare global {
  // type-fest utility
  type Camelize<T> = CamelCasedPropertiesDeep<T>;
  type DeepPartial<T> = PartialDeep<T>;
  type DeepRequired<T> = RequiredDeep<T>;
}
