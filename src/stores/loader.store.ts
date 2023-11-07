import type { EApiId } from '@/enums/request.enum';

interface LoaderState {
  loadIdSet: Set<EApiId>
}
export const useLoaderStore = defineStore('loader-store', {
  state: (): LoaderState => ({
    loadIdSet: new Set(),
  }),

  getters: {
    loadIdsHas: (state) => {
      return (ids: EApiId[]) => {
        if (Array.isArray(ids)) {
          return Array.from(state.loadIdSet).some(i => ids.includes(i));
        }
        return Array.from(state.loadIdSet).includes(ids);
      };
    },
    isAppLoad: (state) => {
      return state.loadIdSet.size > 0;
    },
  },
  actions: {
    addLoadingItem(id?: EApiId) {
      id && this.loadIdSet.add(id);
    },
    removeLoadingItem(id?: EApiId) {
      id && this.loadIdSet.delete(id);
    },
    forceStopLoading() {
      this.loadIdSet.clear();
    },
  },
});
