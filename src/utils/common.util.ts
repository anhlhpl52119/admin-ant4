/**
 * @description Return random item in arr
 * @param {Array<T>} arr - list of items
 * @returns {T}
 */
export const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
