<template>
  <button class="relative flex items-center pl-[1.75rem] w-full group/option"
    @click="handleClick(props.sortOption.value)">
    <Icon v-if="isSelected" name="check"
      class="absolute left-0 stroke-black-lighter w-[1rem] h-[1rem] group-hover/option:stroke-black-lighter-hover transition-colors duration-[160] ease-in-out" />

    <span :class="{ 'font-medium': isSelected, 'font-normal': !isSelected }"
      class="text-sm text-black-lighter full-hd:text-lg full-hd:leading-[1.25rem] break-words w-full group-hover/option:text-black-lighter-hover transition-colors duration-[160] ease-in-out">
      {{ sortOption.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
// Types
import { ISortOption } from '~/types';

import { useFilterStore } from '~/store/filter';

import { storeToRefs } from 'pinia';

const props = defineProps<{
  sortOption: ISortOption;
  isDefault: boolean;
}>();

const emit = defineEmits(['close']);

const filterStore = useFilterStore();

const { sorting } = storeToRefs(filterStore);

const isSelected = computed(() => {
  return (sorting?.value === props.sortOption.value) || (!sorting?.value && props.isDefault);
});

function handleClick(value: string) {
  filterStore.setSorting(value);
  setTimeout(() => {
    emit('close');
  }, 0);
}
</script>
