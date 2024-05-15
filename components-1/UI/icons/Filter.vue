<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 1.31821C14 1.69468 13.6399 2 13.1954 2H0.804598C0.360086 2 0 1.69468 0 1.31821V0.681788C0 0.305319 0.360086 0 0.804598 0H13.1954C13.6399 0 14 0.305319 14 0.681788V1.31821ZM12 5.31815C12 5.69485 11.6074 6 11.1228 6H2.87719C2.39258 6 2 5.69485 2 5.31815V4.68185C2 4.30515 2.39258 4 2.87719 4H11.1228C11.6074 4 12 4.30515 12 4.68185V5.31815ZM8.25925 10C8.66849 10 9 9.69468 9 9.31821V8.68179C9 8.30532 8.66849 8 8.25925 8H5.74075C5.33151 8 5 8.30532 5 8.68179V9.31821C5 9.69468 5.33151 10 5.74075 10H8.25925Z"
      :fill="fill"
    />
  </svg>
</template>

<script setup type="ts">
const props = defineProps({
  fill: {
    type: String,
    default: 'currentColor',
  },
  width: {
    type: Number,
    default: 14,
  },
  height: {
    type: Number,
    default: 10,
  },
});
</script>
