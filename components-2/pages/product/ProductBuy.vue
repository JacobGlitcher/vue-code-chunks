<template>
  <div
    ref="buttonWrapper"
    class="w-full flex items-start mb-[2rem]"
  >
    <a
      :href="mainOffer.url"
      target="_blank"
      :class="`${isButtonFixed ? 'lg:static fixed ' : 'static'}`"
      class="z-component bottom-0 left-0 bg-black lg:hover:bg-black-lighter w-full flex items-center justify-center overflow-hidden h-[2.875rem] lg:h-[2.625rem] full-hd:h-[3rem] transition-all duration-[160] ease-in-out"
    >
      <span class="text-white text-md font-medium leading-[1rem] px-[1.5rem] text-ellipsis text-center whitespace-nowrap overflow-hidden">
        Buy on {{ mainOffer.website_url }}
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
// Constants
import { tabletMediaQuery } from '~/constants';

// Types
import { IProductOffer } from '~/types';

const props = defineProps<{
  mainOffer: IProductOffer;
}>();

const isTablet = useMedia(tabletMediaQuery);

const isButtonFixed = ref<boolean>(true);
const buttonWrapper = ref<HTMLDivElement | null>(null);

watchEffect((onInvalidate) => {
  if (process.client) {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    onInvalidate(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  }
});

function handleScroll() {
  if (!isTablet?.value || !buttonWrapper.value) {
    return;
  }

  const screenHeight = window.innerHeight;
  const top = buttonWrapper.value.offsetTop;
  const rect = buttonWrapper.value.getBoundingClientRect();
  const scroll = window.scrollY;

  isButtonFixed.value = scroll < (top - rect.height - screenHeight);
}
</script>
