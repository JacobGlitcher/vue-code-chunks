<template>
  <div class="min-h-[calc(100vh-4.125rem)] max-w-[85.875rem] w-full mx-auto flex flex-col items-center justify-start pt-[3.25rem]">
    <Timer class="py-4 px-6" />
    <span class="mt-[1.375rem] text-white-700 text-[0.8125rem]">
      Generate domains...
    </span>
    <div class="w-full mt-[4.375rem] -sm:mt-auto -sm:p-[1.25rem]">
      <img class="w-full" src="/images/thumbnail.png" alt="thumbnail">
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import Timer from './Timer.vue';
</script>