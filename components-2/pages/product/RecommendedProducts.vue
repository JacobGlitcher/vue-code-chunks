<template>
  <div
    class="relative z-advanced-component bg-white pb-[2rem] pt-[2.5rem] lg:pt-[7.5rem] lg:pb-[6.75rem] full-hd:pb-[8rem] full-hd:pt-[10.25rem] w-full lg:border-t-0 border-t-[0.063rem] border-t-[#ccc]"
  >
    <h4
      class="uppercase text-lg leading-[1.25rem] font-medium text-center mb-[2.5rem] lg:mb-[3.5rem] full-hd:mb-[5rem] full-hd:text-[1rem] full-hd:leading-[1.5rem]"
    >
      You might also like
    </h4>

    <div class="relative flex items-center w-full">
      <swiper
        :modules="modules"
        :autoplay="
          isMobile
            ? {
                delay: 5000,
              }
            : false
        "
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }"
        :slides-per-view="slidesPerView"
        :loop="false"
        :pagination="{ clickable: false }"
        wrapper-class="w-full h-full"
        @slide-change="handleSlideChange"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <ShopItem :product="product" />
        </swiper-slide>
      </swiper>

      <button
        :class="{ '!hidden': isTablet || activeSlideIndex === 0 }"
        class="swiper-button-prev absolute z-component left-0 cursor-pointer rotate-180 w-[2rem] h-[2rem] flex items-center justify-center group/arrow"
      >
        <Icon
          name="chevron-right"
          class="stroke-black w-[1.5rem] h-[1.5rem] group-hover/arrow:stroke-black-lighter-hover"
        />
      </button>

      <button
        :class="{
          '!hidden':
            isTablet || activeSlideIndex === products.length - slidesPerView,
        }"
        class="swiper-button-next absolute z-component right-0 cursor-pointer w-[2rem] h-[2rem] flex items-center justify-center group/arrow"
      >
        <Icon
          name="chevron-right"
          class="stroke-black w-[1.5rem] h-[1.5rem] group-hover/arrow:stroke-black-lighter-hover"
        />
      </button>
    </div>

    <!-- <div class="relative hidden sm:flex items-center w-full">
      <swiper
        :modules="modules"
        :navigation="{
          prevEl: '.swiper-button-prev-second',
          nextEl: '.swiper-button-next-second',
        }"
        :slides-per-view="slidesPerView"
        :loop="false"
        :pagination="{ clickable: false }"
        wrapper-class="w-full h-full"
        @slide-change="handleSecondSlideChange"
      >
        <swiper-slide v-for="product in products" :key="product.id">
          <RecommendedProduct :product="product" />
        </swiper-slide>
      </swiper>

      <button
        :class="{ '!hidden': isTablet || activeSecondSlideIndex === 0 }"
        class="swiper-button-prev-second absolute z-component left-0 cursor-pointer rotate-180 w-[2rem] h-[2rem] flex items-center justify-center group/arrow"
      >
        <Icon
          name="chevron-right"
          class="stroke-black w-[1.5rem] h-[1.5rem] group-hover/arrow:stroke-black-lighter-hover"
        />
      </button>

      <button
        :class="{
          '!hidden':
            isTablet ||
            activeSecondSlideIndex === products.length - slidesPerView,
        }"
        class="swiper-button-next-second absolute z-component right-0 cursor-pointer w-[2rem] h-[2rem] flex items-center justify-center group/arrow"
      >
        <Icon
          name="chevron-right"
          class="stroke-black w-[1.5rem] h-[1.5rem] group-hover/arrow:stroke-black-lighter-hover"
        />
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Controller, Navigation, Autoplay } from "swiper/modules";

// Components
import RecommendedProduct from "~/components-2/pages/product/RecommendedProduct.vue";
import ShopItem from "~/components-2/shared/ShopItem.vue";

// Constants
import { mobileMediaQuery, tabletMediaQuery } from "~/constants";

import type { Product } from "~/server/api/search.post";

const props = defineProps<{
  products: Product[];
}>();

const isMobile = useMedia(mobileMediaQuery);
const isTablet = useMedia(tabletMediaQuery);

const modules = [Controller, Navigation, Autoplay];

const activeSlideIndex = ref<number>(0);
const activeSecondSlideIndex = ref<number>(0);

const slidesPerView = computed(() => {
  if (isMobile?.value) {
    return 2.2;
  }

  if (isTablet?.value) {
    return 3;
  }

  return 4;
});

function handleSlideChange(slide: any) {
  activeSlideIndex.value = slide.realIndex;
}

function handleSecondSlideChange(slide: any) {
  activeSecondSlideIndex.value = slide.realIndex;
}
</script>
