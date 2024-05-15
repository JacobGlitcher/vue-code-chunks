<template>
  <div
    :class="{ '!top-[-16rem]': !isHeaderOpen, 'top-[23.75rem]': isBannerOpen && isCategoryOpen, 'top-[21rem]': isCategoryOpen && !isBannerOpen, 'top-[8.25rem]': isBannerOpen && !isCategoryOpen, 'top-[5.5rem]': !isCategoryOpen && !isBannerOpen, 'after:bg-black !border-b-transparent': isSearchOpen }"
    class="fixed z-popup left-0 w-full bg-white border-t-[#EBEBEB] border-t-[0.063rem] border-b-[#EBEBEB] border-b-[0.063rem] px-[1.875rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] transition-all duration-300 ease-in-out hidden sm:flex items-center flex-col after:absolute after:bottom-0 after:z-component after:w-[calc(100%-5rem)] after:h-[0.063rem] after:transition-colors after:duration-300 after:ease-in-out"
  >
    <div class="w-full h-[3.625rem] flex items-center justify-between">
      <FilterBarFilters />

      <SortBy />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Components
import FilterBarFilters from '~/components-2/pages/catalog/FilterBarFilters.vue';
import SortBy from '~/components-2/pages/catalog/SortBy.vue';

// Store
import { useUiStore } from '~/store/ui';

const route = useRoute();

const uiStore = useUiStore();

const { isHeaderOpen } = storeToRefs(uiStore);

const isCategoryOpen = useCheckCategoryOpen();

const isBannerOpen = useCheckBannerOpen();

const isSearchOpen = computed(() => {
  return typeof route.query.search === 'string';
});
</script>
