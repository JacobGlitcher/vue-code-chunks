<template>
  <Drawer
    :is-open="isOpen"
    transition="fade-translate-down-content"
    hide-scroll
    content-class="sm:max-w-[33.25rem] h-full"
  >
    <div class="relative h-full">
      <div
        class="content pb-[4rem] h-full overflow-y-auto bg-white text-black scroll"
      >
        <form @submit="handleSubmit($event)">
          <div class="sm:pl-[2.188rem] sm:pr-[2.313rem] sm:pt-[2.375rem]">
            <div
              class="relative flex items-center justify-center sm:justify-start w-full py-[0.938rem] sm:py-0"
            >
              <NuxtLink
                :to="{
                  path: route.fullPath,
                  query: { ...route.query, filter: undefined },
                }"
                class="absolute left-[1.25rem] block sm:hidden"
              >
                <Icon
                  name="arrow-left-line"
                  class="stroke-black w-[1.25rem] h-[1.25rem]"
                />
              </NuxtLink>

              <h2 class="text-xl font-medium text-black font-suisse">
                Filters
              </h2>
            </div>

            <div class="sm:mt-[2.188rem] flex flex-col items-start">
              <SortBy @change="handleChangeFilter" />

              <Filter
                v-for="filter in filtersList"
                :filter="filter"
                :state="filtersState[filter.key] || {}"
                :open="openedFilters[filter.key]"
                :default-value="appliedFilters[filter.key]"
                @toggle="toggleFilter"
                @change="(v) => handleChangeFilters(filter, v)"
              />
            </div>
          </div>

          <div
            class="absolute z-component bottom-0 left-0 w-full px-[0.375rem] pb-[0.375rem]"
          >
            <button
              type="submit"
              class="bg-black text-white text-xl font-medium h-[3.688rem] w-full"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FilterType } from "types";

// Components
import Filter from "~/components-2/common/Filters/Filter.vue";
import SortBy from "~/components-2/common/Filters/SortBy.vue";

// Store
import { useFilterStore } from "~/store/filter";

// Utils
import getObjectOfKeysFromArray from "~/utilities/getObjectOfKeysFromArray";

const filterStore = useFilterStore();

const route = useRoute();

const { list: filtersList, appliedFilters } = storeToRefs(filterStore);

const filtersState = reactive<Record<string, Record<string, any>>>({});

const openedFilters = ref<Record<string, boolean>>(
  getObjectOfKeysFromArray(filtersList.value, "key", true)
);

const isOpen = computed(() => {
  return typeof route.query.filter === "string";
});

function toggleFilter(id: string) {
  openedFilters.value[id] = !openedFilters.value[id];
}

function handleChangeFilter(value: { key: string; value: any }) {
  if (value.key === "sorting") {
    filterStore.setSorting(value.value);
  } else {
    filtersState[value.key] = value.value;
  }
}

function handleChangeFilters(filter: FilterType, value: any) {
  const prevFiltersState = filtersState[filter.key] || {};

  if (filter.type === "variants") {
    filtersState[filter.key] = {
      ...prevFiltersState,
      [value.fieldKey]: value.value,
    };
  } else if (filter.type === "range") {
    filtersState[filter.key] = value;
  }
}

function handleSubmit(e: Event) {
  e.preventDefault();

  filterStore.setFilters(filtersState);

  // Request...
  navigateTo({
    path: "/",
    query: {
      ...route.query,
      filter: undefined,
    },
  });
}
</script>
