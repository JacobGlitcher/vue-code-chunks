import { storeToRefs } from 'pinia';

// Store
import { useShopStore } from '~/store/shop';

export const useCheckCategoryOpen = () => {
  const shopStore = useShopStore();

  const {
    query,
    selectedCategories
  } = storeToRefs(shopStore);

  const isCategoryOpen = computed<boolean>(() => {
    return selectedCategories.value?.length > 0;
  });

  return computed(() => {
    return Boolean(isCategoryOpen.value || query.value.length);
  });
};
