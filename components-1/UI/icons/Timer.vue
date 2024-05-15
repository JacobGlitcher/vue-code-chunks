<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11Z"
      :stroke="fill"
      stroke-width="2"
    />
    <path
      d="M11 3.14288C12.783 3.14288 14.513 3.74935 15.9058 4.86266L11 11V3.14288Z"
      :fill="fill"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  fill: {
    type: String,
    default: 'currentColor',
  },
  width: {
    type: Number,
    default: 22,
  },
  height: {
    type: Number,
    default: 22,
  },
});
</script>
