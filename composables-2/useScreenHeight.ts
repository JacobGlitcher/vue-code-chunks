export const useScreenHeight = (options?: { media?: string, defaultValue?: string | number }) => {
  const { defaultValue = 0, media } = (options || {});

  const screenHeight = ref<string | number>(defaultValue);

  function handleDetectScreenHeight() {
    if (!media || (media && window.matchMedia(media).matches)) {
      screenHeight.value = window.innerHeight;

      setTimeout(() => {
        screenHeight.value = window.innerHeight;
      }, 200);
    }
  }

  onBeforeMount(() => {
    handleDetectScreenHeight();
  });

  return screenHeight;
};
