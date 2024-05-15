<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.75 6.1C1.25294 6.1 0.85 6.50294 0.85 7C0.85 7.49706 1.25294 7.9 1.75 7.9L12.0772 7.9L8.36361 11.6136C8.01213 11.9651 8.01213 12.5349 8.36361 12.8864C8.71508 13.2379 9.28493 13.2379 9.6364 12.8864L14.8864 7.6364C15.2379 7.28492 15.2379 6.71508 14.8864 6.3636L9.6364 1.1136C9.28493 0.762132 8.71508 0.762132 8.36361 1.1136C8.01213 1.46508 8.01213 2.03492 8.36361 2.3864L12.0772 6.1L1.75 6.1Z"
      :fill="fill"
      :stroke="fill"
      stroke-width="0.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
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
