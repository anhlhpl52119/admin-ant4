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
