<template>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 2.75C0 1.23122 1.23122 0 2.75 0H15.25C16.7688 0 18 1.23122 18 2.75V15.25C18 16.7688 16.7688 18 15.25 18H2.75C1.23122 18 0 16.7688 0 15.25V2.75ZM13 16.5H15.25C15.9404 16.5 16.5 15.9404 16.5 15.25V2.75C16.5 2.05964 15.9404 1.5 15.25 1.5H13V16.5ZM11.5 1.5V16.5H2.75C2.05964 16.5 1.5 15.9404 1.5 15.25V2.75C1.5 2.05964 2.05964 1.5 2.75 1.5H11.5Z"
      :fill="fill"
    />
    <path
      d="M15.25 16.5H13V1.5H15.25C15.9404 1.5 16.5 2.05964 16.5 2.75V15.25C16.5 15.9404 15.9404 16.5 15.25 16.5Z"
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
});
</script>