<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 10 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 6.25L5 3.75L2.5 6.25"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 11.75L5 14.25L7.5 11.75"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'currentColor',
  },
  width: {
    type: Number,
    default: 10,
  },
  height: {
    type: Number,
    default: 18,
  },
});
</script>