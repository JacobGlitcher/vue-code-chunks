<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 18 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0H7.68311V2.02148H5.10498V8.18115H2.57666V2.02148H0V0ZM8.79932 0H12.1245L13.4077 4.97607L14.6865 0H18V8.17969H15.9346V1.94238L14.3335 8.17969H12.4658L10.8691 1.94238V8.17969H8.79932V0Z"
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
    default: 18,
  },
  height: {
    type: Number,
    default: 9,
  },
});
</script>