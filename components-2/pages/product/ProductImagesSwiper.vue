<template>
  <div
    :style="{ maxHeight: isLoaded ? screenHeight ? `${screenHeight - productBuyButtonSize}px` : undefined : `calc(100vh - ${productBuyButtonSize}px)` }"
    class="product-images-swiper lg:hidden relative z-component flex items-center justify-center w-full bg-[#EDEDED]">
    <swiper :modules="modules" :slides-per-view="1" :loop="false" :controller="{ control: controlledSwiper }"
      :pagination="{ clickable: false }" @slide-change="handleSlideChange" @swiper="setControlledSwiper"
      wrapper-class="h-full">
      <swiper-slide v-for="(image, index) in product.images" :key="index">
        <div class="bg-[#f6f6f6] w-full h-full flex items-center justify-center">
          <img :src="image.url" :alt="product.title" class="w-auto h-full max-w-full max-h-full object-cover" />
        </div>
      </swiper-slide>
    </swiper>

    <div class="absolute z-component bottom-[1.5rem] left-[1rem] flex">
      <div class="text-black font-medium leading-[1.25rem] text-lg full-hd:text-[1rem] full-hd:leading-[1.5rem]">
        <span class="min-w-[0.625rem] inline-block">
          {{ activeImageIndex }}
        </span>
        <span class="mx-[0.375rem] min-w-[0.287rem] inline-block">|</span>
        <span class="min-w-[0.625rem] inline-block">
          {{ product.images?.length ?? 0 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Controller, Pagination } from 'swiper/modules';

// Constants
import { productBuyButtonSize } from '~/constants';

// Types
import { IProduct } from '~/types';

const props = defineProps<{
  product: IProduct;
}>();

const modules = [Pagination, Controller];

const controlledSwiper = ref<any>(null);
const activeSlideIndex = ref<number>(0);
const activeImageIndex = ref<number>(1);
const isLoaded = ref<boolean>(false);

const screenHeight = useScreenHeight({
  media: '(max-height: 743px) and (max-width: 1023px)',
});

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 0);
});

function handleSlideChange(slide: any) {
  activeSlideIndex.value = slide.realIndex;
  activeImageIndex.value = slide.realIndex + 1;
}

function setControlledSwiper(swiper: any) {
  controlledSwiper.value = swiper;
}
</script>

<style>
@media (max-width: 1023px) {
  .product-images-swiper {
    height: 100vh;
  }
}

@media (max-height: 743px) and (max-width: 1023px) {
  .product-images-swiper {
    max-height: calc(100vh - 7.75rem);
  }
}

@media (min-height: 744px) and (max-width: 1023px) {
  .product-images-swiper {
    max-height: 700px;
  }
}
</style>
