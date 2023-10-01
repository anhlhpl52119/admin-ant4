export const useTableCache = <T>() => {
  const detailsCodeMap = reactive<Map<string, T>>(new Map());
  const getDetails = (id: string) => {
    return detailsCodeMap.get(id);
  };
  const setDetails = (id: string, item: T) => {
    if (!id) {
      return;
    }
    detailsCodeMap.set(id, item);
  };

  return {
    getDetails,
    setDetails,
  };
};
