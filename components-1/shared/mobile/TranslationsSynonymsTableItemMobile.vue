<template>
  <li class="px-4 py-[1.125rem] hover:bg-dark-700 rounded-lg" @click="handleOpenSwipeBar">
    <span class="text-white-700 mr-6">{{ index + 1 }}</span>
    <span class="text-white-900">{{ data }}</span>
    <SwipeBar
      :is-open="isSwipeBarOpen"
      :label="data"
      @close="handleCLoseSwipeBar"
    >
      <ul class="text-white-900 w-full">
        <li class="w-full">
          <button class="flex items-center justify-start p-3 hover:bg-dark-800 w-full rounded-lg">
            <Icon class="mr-5" name="translator" />
            <span>Show in other languages</span>
          </button>
          <button class="flex items-center justify-start p-3 hover:bg-dark-800 w-full rounded-lg">
            <Icon class="mr-5" name="search2" />
            <span>Create search</span>
          </button>
        </li>
      </ul>
    </SwipeBar>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  data: string;
  index: number;
}>();

const isSwipeBarOpen = ref(false);


const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCLoseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>