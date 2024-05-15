import { Ref } from 'vue';

export const useOutsideClick = (ref: Ref<HTMLElement | null>, handler: () => any) => {
  if (process.client) {
    const handleClick = (e: MouseEvent) => {
      if (!ref.value) {
        return;
      }

      if (!ref.value.contains(<HTMLElement>e.target)) {
        handler();
      }
    };

    onMounted(() => {
      window.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
      window.removeEventListener('click', handleClick);
    });
  }
};
