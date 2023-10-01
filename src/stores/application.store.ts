import type { EApiId } from '@/enums/request.enum';

const currentFetching = reactive<Set<EApiId>>(new Set());
export const useApplicationStore = defineStore('application-store', () => {
  // state
  const loadingAppState = readonly(currentFetching);

  // getter
  const isAppLoading = computed(() => currentFetching.size !== 0);

  // actions
  const setLoadingId = (id: EApiId) => {
    currentFetching.add(id);
  };

  const removeLoadingId = (id?: EApiId) => {
    id && currentFetching.delete(id);
  };

  return {
    loadingAppState,
    isAppLoading,

    setLoadingId,
    removeLoadingId,
  };
});
