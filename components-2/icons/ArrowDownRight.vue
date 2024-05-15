<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.8335 6.33325L14.1668 14.6666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.1668 6.33325V14.6666H5.8335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    default: 16,
  },
  height: {
    type: Number,
    default: 16,
  },
});
</script>
