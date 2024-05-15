import { IUiState } from '~/types';

export const useUiStore = defineStore('ui', {
  state: (): IUiState => {
    return {
      back: null,
      backQuery: {},
      isHeaderOpen: true,
    };
  },
  getters: {

  },
  actions: {
    changeGoBackPath(path: string | null, query?: Record<string, string>) {
      this.back = path;
      this.backQuery = query || {};
    },
    openHeader() {
      this.isHeaderOpen = true;
    },
    hideHeader() {
      this.isHeaderOpen = false;
    },
  },
});
