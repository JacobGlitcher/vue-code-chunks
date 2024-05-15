<template>
  <div v-if="!isSearchOpen" class="relative w-[80%] h-full flex items-center gap-x-[1.5rem]">
    <div class="relative flex items-center">
      <Icon name="filter-horizontal" class="w-[1rem] h-[0.688rem] mr-[1rem]" />

      <span v-if="appliedFiltersLength"
        class="absolute top-[-0.2rem] left-[calc(100%+0.2rem)] text-[0.625rem] font-light">
        {{ appliedFiltersLength }}
      </span>

      <span class="text-sm font-medium text-black full-hd:text-[0.875rem] full-hd:leading-[1.25rem] leading-[1rem]">
        FILTER
      </span>
    </div>

    <div class="bg-[#ccc] w-[0.063rem] h-[1.125rem]" aria-hidden="true" />

    <FilterBarFilter v-for="filter in filtersList" :key="filter.key" :filter="filter" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

// Components
import FilterBarFilter from '~/components-2/pages/catalog/FilterBarFilter.vue';

// Store
import { useFilterStore } from '~/store/filter';

const route = useRoute();

const filterStore = useFilterStore();

const { list: filtersList, appliedFiltersLength } = storeToRefs(filterStore);

const isSearchOpen = computed(() => {
  return typeof route.query.search === 'string';
});
</script>
