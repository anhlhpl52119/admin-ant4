import type { EApiId } from '@/enums/request.enum';

export const useVisibilityStore = defineStore('visibility-store', () => {
  const loadingIdsState = reactive<Set<EApiId>>(new Set());
  // state
  const loadingIds = readonly(loadingIdsState);

  // getter
  const isAppLoading = computed(() => !!loadingIdsState.size);

  // actions
  const setLoadingId = (id: EApiId) => {
    loadingIdsState.add(id);
  };

  const removeLoadingId = (id?: EApiId) => {
    id && loadingIdsState.delete(id);
  };

  return {
    loadingIds,
    isAppLoading,

    setLoadingId,
    removeLoadingId,
  };
});
