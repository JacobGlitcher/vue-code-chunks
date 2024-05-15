// Types
import { IBanner, IBannerStore } from '~/types';

const fakeBanner: IBanner = {
  title: 'Sign up to be one of the first to know when the winter 2023 collection arrives',
};

export const useBannerStore = defineStore('banner', {
  state: (): IBannerStore => {
    return {
      data: null,
      isClosed: false,
    };
  },
  getters: {

  },
  actions: {
    async getBanner() {
      try {
        if (this.isClosed || this.data) {
          return;
        }

        // Request

        // setTimeout(() => {
        //   this.data = fakeBanner;
        // }, 10000);
      } catch (e) {
        console.error(e);
      }
    },
    resetBanner() {
      this.data = null;
      this.isClosed = true;
    },
  },
});
