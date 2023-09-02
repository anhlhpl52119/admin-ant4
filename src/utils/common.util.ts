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
