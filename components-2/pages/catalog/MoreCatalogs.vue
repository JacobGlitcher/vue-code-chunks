<template>
  <!-- <div v-if="categories?.length"
    class="max-w-xl mx-auto w-full mt-[6.125rem] pt-[2.5rem] pl-[1rem] sm:pl-[1.75rem] pr-0 sm:pr-[1.75rem] full-hd:pr-[2.75rem] full-hd:pl-[2.75rem] border-t-[#EBEBEB] border-t-[0.063rem]">
    <h5 class="w-full text-left text-sm leading-[1rem] font-medium uppercase xga:text-center">
      More for You
    </h5>

    <ul
      class="w-full pt-[1.5rem] pb-[2.5rem] xga:pb-[1rem] overflow-x-auto flex flex-row items-center justify-start xga:justify-center">
      <li v-for="(catalog, index) in categories" :key="catalog.name" class="flex xga:mb-[1.5rem]">
        <NuxtLink :to="{ path: '/', query: { ...route.query } }"
          :class="{ '!pl-0': index === 0, 'lg:pr-0 pr-[1rem] !border-r-0': index === (categories.length - 1) }"
          class="text-sm border-r-[0.063rem] border-r-[#ccc] leading-[1rem] tracking-[0.3px] px-[1rem] font-book hide-scrollbar whitespace-nowrap text-black-lighter hover:text-black-light-hover transition-colors duration-[160] ease-in-out">
          {{ catalog.name }}
        </NuxtLink>
      </li>
    </ul>
  </div> -->
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia';

// // Store
// import { useShopStore } from '~/store/shop';

// const shopStore = useShopStore();

// const { categories } = storeToRefs(shopStore);
</script>
