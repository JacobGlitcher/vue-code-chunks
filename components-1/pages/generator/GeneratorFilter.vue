<template>
  <div
    class="bg-dark-600 -sm:bg-dark-700 rounded-lg border-b-[0.0625rem] border-b-[#111111] -sm:border-none -sm:mb-[0.125rem] flex flex-col items-start justify-start"
    :class="{'p-6': size === 'large', 'p-[0.875rem]': size === 'small'}"
  >
    <span
      class="text-white-725 text-[0.875rem]"
      :class="{'mb-[0.6875rem]': size === 'small', 'mb-[1.4375rem]': size === 'large'}"
    >
      {{ label }}
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// Types
import { GeneratorFilterSizeType } from '~/types';


defineProps<{
  label: string;
  size: GeneratorFilterSizeType;
}>();
</script>