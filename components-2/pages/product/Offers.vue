<template>
  <div class="absolute right-0 lg:py-[0.438rem] lg:px-[0.375rem] w-full lg:w-[47.625rem] h-full">
    <div class="content rounded-[0.125rem] w-full h-full overflow-y-auto bg-white scroll">
      <div class="relative sm:px-[1.75rem] py-[0.938rem] sm:py-[2.5rem] w-full flex items-center justify-center sm:justify-between">
        <button
          v-if="isMobile"
          aria-label="Close offers"
          class="absolute left-[1.25rem]"
          @click="handleClose"
        >
          <Icon
            name="arrow-left-line"
            class="stroke-black w-[1.25rem] h-[1.25rem]"
          />
        </button>

        <h2 class="text-xxl text-black font-light">
          Price offers from stores
        </h2>

        <button
          v-if="!isMobile"
          class="w-[1.5rem] h-[1.5rem] flex items-center justify-between"
          aria-label="Close offers"
          @click="handleClose"
        >
          <Icon
            name="close"
            class="w-[1.25rem] h-[1.25rem] stroke-[#939393]"
          />
        </button>
      </div>

      <div class="border-t-[#EAEAEA] border-t-[0.063rem] pb-[2rem]">
        <Offer
          v-for="offer in offers"
          :key="offer.id"
          :offer="offer"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import Offer from '~/components-2/pages/product/Offer.vue';

// Constants
import { mobileMediaQuery } from '~/constants';

// Types
import { IProductOffer } from '~/types';

const props = defineProps<{
  offers: IProductOffer[];
}>();

const emit = defineEmits(['close']);

const isMobile = useMedia(mobileMediaQuery);

function handleClose() {
  emit('close');
}
</script>
