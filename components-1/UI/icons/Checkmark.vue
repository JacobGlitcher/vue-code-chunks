<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3333 1L4.99996 8.33333L1.66663 5"
      :stroke="fill"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  fill: {
    type: String,
    default: '#BEC1FE',
  },
  width: {
    type: Number,
    default: 11,
  },
  height: {
    type: Number,
    default: 7,
  },
});
</script>