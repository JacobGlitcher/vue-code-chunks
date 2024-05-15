<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_317_4409)">
      <path d="M13.258 3.25L8.11214 8.39583L5.40381 5.6875L1.34131 9.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.0083 3.25H13.2583V6.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_317_4409">
        <rect width="13" height="13" fill="white" transform="translate(0.799805)"/>
      </clipPath>
    </defs>
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
