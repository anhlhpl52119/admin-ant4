import { message } from 'ant-design-vue';

type DebounceFn<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

/**
 * @description Return random item in arr
 * @param {Array<T>} arr - list of items
 * @returns {T}
 */
export const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** sleep for n milliseconds */
export const sleepFor = async (millisecond: number = 0) => {
  return new Promise((resolve: (value: unknown) => void) => {
    setTimeout(() => {
      resolve(null);
    }, millisecond);
  });
};

export const debounceFor = <T extends (...args: any[]) => any>(func: T, delay: number): DebounceFn<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debounced(...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

export const stringWithoutDiacritics = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
};

export const copyText = async (text: string) => {
  message.destroy();
  try {
    await navigator.clipboard.writeText(text);
    message.success({ content: `Copied: ${text}`, duration: 1.2 });
  }
  catch (e) {}
};

/** merge object values to object target, only pick fields existed in target */
export const mergeValues = (target: any, values: any) => {
  if (!(typeof target === 'object' && target && typeof values === 'object' && values)) {
    return target;
  }

  Object.entries(values).forEach(([key, value]: any) => {
    if (!(key in target)) {
      return;
    }

    // deep merge object or array
    if (typeof value === 'object' && value && !Array.isArray(value) && Object.keys(value)?.length > 0) {
      mergeValues(target[key], value);

      return;
    }

    target[key] = value;
  });

  return target;
};
