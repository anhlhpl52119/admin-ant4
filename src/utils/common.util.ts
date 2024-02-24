import { message } from 'ant-design-vue';

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

export const stringWithoutDiacritics = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
};

export const copyText = async (text: string) => {
  message.destroy();
  try {
    await navigator.clipboard.writeText(text);
    message.success({ content: `Sao chép: ${text}`, duration: 1.2 });
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

export const generateUuid = (optional?: { prefix?: string; suffix?: string }) => {
  const str = '10000000-1000-4000-8000-100000000000'.replace(
    /[018]/g,
    (c: string) => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16),
  );
  return `${optional?.prefix ?? ''}${str}${optional?.suffix ?? ''}`;
};
