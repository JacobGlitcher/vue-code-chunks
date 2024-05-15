<template>
  <Transition name="fade-translate-down">
    <div
      v-if="bannerData"
      :class="{ '!top-[-16rem]': !isHeaderOpen }"
      class="fixed z-advanced-component top-0 left-0 w-full h-banner bg-black flex items-center justify-center px-[2.75rem] transition-top duration-300 ease-in-out"
    >
      <p class="text-md text-white font-light text-center full-hd:text-[1rem] full-hd:leading-[1.5rem]">
        {{ bannerData.title }}
      </p>

      <button
        type="button"
        class="absolute z-component full-hd:right-[2.875rem] right-[1.25rem] sm:right-[2.5rem]"
        aria-label="Close banner"
        @click="handleClose"
      >
        <Icon
          name="close"
          class="stroke-white w-[1.25rem] h-[1.25rem]"
        />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Store
import { useBannerStore } from '~/store/banner';
import { useUiStore } from '~/store/ui';

const bannerStore = useBannerStore();
const uiStore = useUiStore();

const { data: bannerData } = storeToRefs(bannerStore);
const { isHeaderOpen } = storeToRefs(uiStore);

onMounted(() => {
  bannerStore.getBanner();
});

function handleClose() {
  bannerStore.resetBanner();
}
</script>
