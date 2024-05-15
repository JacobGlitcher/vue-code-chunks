<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 18 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <rect y="8" width="18" height="2" />
      <rect width="18" height="2" />
    </g>
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
