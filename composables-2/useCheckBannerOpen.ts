import { storeToRefs } from 'pinia';

// Store
import { useBannerStore } from '~/store/banner';

export const useCheckBannerOpen = () => {
  const bannerStore = useBannerStore();

  const { data } = storeToRefs(bannerStore);

  return computed(() => {
    return !!data.value;
  });
};
