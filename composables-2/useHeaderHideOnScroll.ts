import { storeToRefs } from 'pinia';

// Store
import { useUiStore } from '~/store/ui';

// Utilities
import debounce from '~/utilities/debounce';

export const useHeaderHideOnScroll = () => {
  const route = useRoute();

  const uiStore = useUiStore();

  const { isHeaderOpen } = storeToRefs(uiStore);

  const scrollPosition = ref<number>(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 0 && scrollPosition.value < currentScroll) {
      uiStore.hideHeader();

      navigateTo({
        path: route.fullPath,
        replace: true,
        query: {
          ...route.query,
          filterDropdown: undefined,
          search: undefined,
          category: undefined,
        },
      });
    } else {
      if (currentScroll < 1 || scrollPosition.value > currentScroll) {
        uiStore.openHeader();
      }
    }

    scrollPosition.value = currentScroll;
  };

  const debounceHandleScroll = debounce(handleScroll, 20);

  watchEffect((onInvalidate) => {
    if (process.client) {
      window.addEventListener('scroll', debounceHandleScroll);

      onInvalidate(() => {
        window.removeEventListener('scroll', debounceHandleScroll);
      });
    }
  });

  return isHeaderOpen;
};
