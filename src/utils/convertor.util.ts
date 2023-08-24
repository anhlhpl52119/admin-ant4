/** convert snake object key to camel object key */
export function keySnakeToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => keySnakeToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_(\w)/g, (_, letter) => letter.toUpperCase());
    const value = obj[key];
    acc[camelKey] = keySnakeToCamelCase(value);

    return acc;
  }, {} as any);
}
