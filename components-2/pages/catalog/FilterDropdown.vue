<template>
  <Drawer
    :is-open="!!filter"
    transition="fade-translate-down-content"
    close-on-overlay-hover
    :overlay-class="`sm:block hidden ${
      !isBannerOpen && !isCategoryOpen ? 'mt-[9.25rem]' : ''
    } ${isBannerOpen && isCategoryOpen ? 'mt-[27.5rem]' : ''} ${
      isBannerOpen && !isCategoryOpen ? 'mt-[12rem]' : ''
    } ${isCategoryOpen && !isBannerOpen ? 'mt-[24.75rem]' : ''}`"
    :content-class="`content bg-white w-screen full-hd:h-[25rem] h-[21.75rem] full-hd:!py-[2.5rem] pt-[2rem] pb-[3rem] px-[1.875rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] ${
      !isBannerOpen && !isCategoryOpen ? 'max-h-[calc(100vh-9.25rem)]' : ''
    } ${isBannerOpen && isCategoryOpen ? 'max-h-[calc(100vh-27.5rem)]' : ''} ${
      isBannerOpen && !isCategoryOpen ? 'max-h-[calc(100vh-12rem)]' : ''
    } ${isCategoryOpen && !isBannerOpen ? 'max-h-[calc(100vh-24.75rem)]' : ''}`"
    @close="handleClose"
  >
    <div v-if="filter" class="relative w-full h-full flex flex-col items-start">
      <!-- <button
        @click="handleSelectAll"
        class="absolute z-component top-0 left-0 text-sm font-normal full-hd:text-lg full-hd:leading-[1.25rem] text-black-lighter underline leading-[1rem] hover:text-black-lighter-hover transition-colors duration-[160] ease-in-out"
      >
        Select all
      </button> -->

      <div
        v-if="filter.type === 'variants'"
        class="relative w-full h-[calc(100%-2.5rem)] flex flex-col flex-wrap items-start content-start gap-y-[1.5rem] gap-x-[6.563rem]"
      >
        <button
          v-for="filterVariant in (filter.variants as IVariantFilter[])"
          :key="filterVariant.key"
          class="flex"
          @click="handleFilter(filterVariant.key)"
        >
          <span
            :class="{
              underline: !!appliedFilters[filter.key]?.[filterVariant.key],
            }"
            class="text-sm font-normal text-black-lighter leading-[1rem] hover:text-black-lighter-hover transition-colors duration-[160] ease-in-out full-hd:text-lg full-hd:leading-[1.25rem]"
          >
            {{ filterVariant.label }}
          </span>
        </button>
      </div>

      <div
        v-else-if="filter.type === 'range'"
        class="relative w-full h-full px-[3rem] py-[3rem]"
      >
        <Slider
          :min="filter.min"
          :max="filter.max"
          :format="filter.format"
          :step="filter.step"
          @change="handlePriceRange"
          :value="appliedFilters[filter.key]"
        />
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import Slider from "~/components-2/shared/Slider.vue";

// Store
import { useFilterStore } from "~/store/filter";

// Types
import { FilterType, IVariantFilter } from "~/types";

const route = useRoute();

const filterStore = useFilterStore();

const { list: filtersList, appliedFilters } = storeToRefs(filterStore);

const isBannerOpen = useCheckBannerOpen();

const isCategoryOpen = useCheckCategoryOpen();

const isOpen = computed<boolean>(() => {
  const filterDropdown = route.query.filterDropdown;

  return Boolean(filterDropdown && typeof filterDropdown === "string");
});

const filter = computed<FilterType | null>(() => {
  if (!isOpen) {
    return null;
  }

  return (
    filtersList.value.find(
      (filter) => filter.key === route.query.filterDropdown
    ) || null
  );
});

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      filterDropdown: undefined,
    },
  });
}

// function handleSelectAll() {
//   if (!filter.value) {
//     return;
//   }

//   const filtersData: Record<string, any> = {};

//   filter.value.variants.forEach((data) => {
//     filtersData[(<any>data).key] = true;
//   });

//   filterStore.applyFilter({
//     id: filter.value?.key!,
//     value: filtersData,
//   });
// }

function handleFilter(key: string) {
  if (!filter.value) {
    return;
  }

  filterStore.toggleFilter({
    id: filter.value?.key!,
    valueKey: key,
    value: true,
  });
}

function handlePriceRange(range: [number, number]) {
  filterStore.applyFilter(
    {
      key: "lowest_price_usd",
      type: "range",
    } as any,
    range
  );
}
</script>
