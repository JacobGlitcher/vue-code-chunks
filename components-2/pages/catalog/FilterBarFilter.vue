<template>
  <button :class="{ 'after:!w-full after:!opacity-100': filter.key === route.query.filterDropdown }"
    class="relative flex items-center after:absolute after:top-[calc(100%+1.2rem)] after:z-component after:bg-black after:opacity-0 after:w-[0] after:h-[0.125rem] after:transition-all after:duration-300 after:ease-in-out"
    @mouseenter="handleFilterHover(filter.key)" @click="handleFilterClick(filter.key)">
    <span
      class="text-sm font-medium text-black full-hd:text-[0.875rem] full-hd:leading-[1.25rem] mr-[0.875rem] uppercase leading-[1rem]">
      {{ filter.label }}
    </span>

    <span v-if="appliedFiltersCount" class="absolute top-[-0.2rem] left-[calc(100%-1.7rem)] text-[0.625rem] font-light">
      {{ appliedFiltersCount }}
    </span>

    <Icon name="chevron-down" :class="{ 'rotate-180': filter.key === route.query.filterDropdown }"
      class="stroke-black w-[1rem] h-[1rem] transition-all duration-300 ease-in-out" />
  </button>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Store
import { useFilterStore } from '~/store/filter';

// Utilities
import { getObjectLength } from '~/utilities/getObjectLength';

// Types
import { FilterType } from '~/types';

const props = defineProps<{
  filter: FilterType;
}>();

const route = useRoute();

const filterStore = useFilterStore();

const { appliedFilters } = storeToRefs(filterStore);

const appliedFiltersCount = computed(() => {
  return Array.isArray(appliedFilters.value[props.filter.key]) ? 1 : getObjectLength(appliedFilters.value[props.filter.key]);
});

function handleFilterHover(key: string) {
  if (route.query.filterDropdown !== key) {
    navigateTo({
      path: route.fullPath,
      replace: true,
      query: {
        ...route.query,
        filterDropdown: key,
        category: undefined,
      },
    });
  }
}

function handleFilterClick(key: string) {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      filterDropdown: route.query.filterDropdown === key ? undefined : key,
      category: undefined,
    },
  });
}
</script>
