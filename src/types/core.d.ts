import type { EApiId, ERequestMethod } from '@/enums/request.enum';
import type { AxiosResponse } from 'axios';
import type { CamelCasedPropertiesDeep, PartialDeep, RequiredDeep } from 'type-fest';

export {};

declare global {
  // type-fest utility
  type Camelize<T> = CamelCasedPropertiesDeep<T>;
  type DeepPartial<T> = PartialDeep<T>;
  type DeepRequired<T> = RequiredDeep<T>;

  type WidenLiteral<T> = T extends string | number | boolean ? ReturnType<T['valueOf']> : T;

  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };

  type RansackQuery<T> = {
    [K in keyof T as `${string & K}${T[K] extends string | null | boolean
      ? "_eq" | "_cont"
      : T[K] extends Date | null
      ? "_lteq" | "_gteq" | "_gt" | "_lt"
      : T[K] extends boolean | null
      ? "_true" | "_false"
      : never}`]: T[K];
  };

  type RequestConfig = {
    url: string
    method: ERequestMethod
    body?: any
    params?: any
    timeout?: number
  }
  type RequestOptions = {
    id?: EApiId
    permitRoles?: Array<API.UserRole>
    isAuth?: boolean
    successMsg?: string
    errorMsg?: string
    isShowLoading?: boolean
    loadingMessage?: string
    getDataDirectly?: boolean
  }
}
