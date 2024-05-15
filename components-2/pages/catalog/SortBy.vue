<template>
  <div ref="sortByRef" class="group" @mouseleave="handleClose">
    <button
      class="relative flex items-center group-hover:after:opacity-100 group-hover:after:w-full after:absolute after:top-[calc(100%+1.15rem)] after:z-component after:bg-black after:opacity-0 after:w-[0] after:h-[0.125rem] after:transition-all after:duration-300 after:ease-in-out"
      @mouseenter="handleOpen" @click="handleClick">
      <span
        class="text-sm font-medium text-black full-hd:text-[0.875rem] full-hd:leading-[1.25rem] mr-[0.875rem] leading-[1rem]">
        SORT BY
      </span>

      <span v-if="sorting" class="mr-[0.375rem] text-[#717171] font-medium text-sm leading-[1rem]">
        {{ sortOptions.find(t => t.value === sorting)?.name ?? '' }}
      </span>

      <Icon name="chevron-down" :class="{ 'rotate-180': isOpen }"
        class="stroke-black w-[1rem] h-[1rem] mt-[0.1rem] transition-all duration-300 ease-in-out" />
    </button>

    <div v-if="isOpen" class="absolute z-popup right-0 w-[14.625rem] h-[1.8rem]" />

    <Transition name="fade">
      <div v-if="isOpen"
        class="absolute z-popup top-[calc(100%+0.063rem)] right-0 min-w-[14.625rem] max-w-[20.313rem] px-[1.125rem] py-[2.25rem] bg-white gap-y-[1.5rem] flex flex-col">
        <SortByOption v-for="(sortOption, index) in sortOptions" :key="sortOption.value" :sort-option="sortOption"
          :is-default="index === 0" @close="handleClose"></SortByOption>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Components
import SortByOption from '~/components-2/pages/catalog/SortByOption.vue';

// Store
import { useFilterStore } from '~/store/filter';
import { useUiStore } from '~/store/ui';

// Types
import { ISortOption } from '~/types';

const route = useRoute();

const filterStore = useFilterStore();
const uiStore = useUiStore();

const { sortOptions, sorting } = storeToRefs(filterStore);
const { isHeaderOpen } = storeToRefs(uiStore);

const isOpen = ref<boolean>(false);

const sortByRef = ref<HTMLElement | null>(null);

useOutsideClick(sortByRef, () => {
  handleClose();
});

watch(isHeaderOpen, (value) => {
  if (!value) {
    isOpen.value = false;
  }
})

function handleClick() {
  isOpen.value ? handleClose() : handleOpen();
}

function handleOpen() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      filterDropdown: undefined,
    },
  });

  isOpen.value = true;
}

function handleClose() {
  isOpen.value = false;
}
</script>
