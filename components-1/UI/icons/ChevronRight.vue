<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.09467 0.71967C1.38756 0.426777 1.86244 0.426777 2.15533 0.71967L6.90533 5.46967C7.19822 5.76256 7.19822 6.23744 6.90533 6.53033L2.15533 11.2803C1.86244 11.5732 1.38756 11.5732 1.09467 11.2803C0.801777 10.9874 0.801777 10.5126 1.09467 10.2197L5.31434 6L1.09467 1.78033C0.801777 1.48744 0.801777 1.01256 1.09467 0.71967Z"
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
    default: 8,
  },
  height: {
    type: Number,
    default: 12,
  },
});
</script>