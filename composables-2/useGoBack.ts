import { Ref } from 'vue';

// Store
import { useUiStore } from '~/store/ui';

export const useGoBack = (path: string | Ref<string>, query?: Record<string, string>) => {
  const uiStore = useUiStore();

  onMounted(() => {
    uiStore.changeGoBackPath(
      typeof path !== 'string' ? path.value : path,
      query,
    );
  });

  onBeforeUnmount(() => {
    uiStore.changeGoBackPath(null, {});
  });

  if (typeof path !== 'string') {
    watch(path, (value) => {
      uiStore.changeGoBackPath(
        value,
        query,
      );
    });
  }
};
