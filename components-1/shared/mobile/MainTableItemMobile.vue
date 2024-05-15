<template>
  <li
    class="flex items-start justify-between py-[1.125rem] px-4 hover:bg-dark-700 rounded-lg font-medium text-white-700"
    @click="handleOpenSwipeBar"
  >
    <div class="flex flex-col items-start justify-center">
      <span class="text-[0.9375rem] text-white-900 mb-[0.375rem]">
        {{ data.domain_name }}
      </span>
      <span class="mb-[0.375rem]">
        {{ data.available ? 'Available' : 'Taken' }}
      </span>
    </div>
    <div class="flex flex-col items-end justify-center">
      <span class="text-[0.9375rem] mb-[0.375rem]">
        {{ data.price }}
      </span>
      <span class="mb-[0.375rem]">Price</span>
    </div>
    <SwipeBar
      :is-open="isSwipeBarOpen"
      :label="data.domain_name"
      @close="handleCLoseSwipeBar"
    >
      <div class="flex flex-col items-start justify-start">
        <div class="flex items-center justify-start w-full py-2 px-3">
          <span class="max-w-[3.75rem] w-full mr-5">Status</span>
          <span>{{ data.available ? 'Available' : 'Taken' }}</span>
        </div>
        <div class="flex items-center justify-start w-full py-2 px-3 mb-6">
          <span class="max-w-[3.75rem] w-full mr-5">Price</span>
          <span>{{ data.price }}</span>
        </div>
        <ul class="w-full">
          <li class="w-full">
            <button class="flex items-center justify-start p-3 hover:bg-dark-800 w-full rounded-lg">
              <Icon class="mr-5" name="save" />
              <span class="text-wfite-900">Save</span>
            </button>
          </li>
          <li class="w-full">
            <button class="flex items-center justify-start p-3 hover:bg-dark-800 w-full rounded-lg" @click="handleToolClick(data.domain_name, '/trademark')">
              <Icon class="mr-5" name="trademark" />
              <span class="text-wfite-900">Trademark</span>
            </button>
          </li>
          <li class="w-full">
            <button class="flex items-center justify-start p-3 hover:bg-dark-800 w-full rounded-lg" @click="handleToolClick(data.domain_name, '/competitors')">
              <Icon class="mr-5" name="earth" />
              <span class="text-wfite-900">Competitors</span>
            </button>
          </li>
        </ul>
      </div>
    </SwipeBar>
  </li>
</template>

<script setup lang="ts">
// Types
import { ISearchItem } from '~/types';


const { handleToolClick } = useMainTable();

defineProps<{
  data: ISearchItem;
}>();

const isSwipeBarOpen = ref(false);


const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCLoseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>