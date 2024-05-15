<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.1 4C2.1 1.79086 3.89086 0 6.1 0C8.30914 0 10.1 1.79086 10.1 4V5.5H10.25C11.2165 5.5 12 6.2835 12 7.25V12.25C12 13.2165 11.2165 14 10.25 14H1.75C0.783502 14 0 13.2165 0 12.25V7.25C0 6.2835 0.783502 5.5 1.75 5.5H2.1V4ZM3.6 5.5H8.6V4C8.6 2.61929 7.48071 1.5 6.1 1.5C4.71929 1.5 3.6 2.61929 3.6 4V5.5ZM1.75 7C1.61193 7 1.5 7.11193 1.5 7.25V12.25C1.5 12.3881 1.61193 12.5 1.75 12.5H10.25C10.3881 12.5 10.5 12.3881 10.5 12.25V7.25C10.5 7.11193 10.3881 7 10.25 7H1.75Z"
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
    default: 12,
  },
  height: {
    type: Number,
    default: 14,
  },
});
</script>