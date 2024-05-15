<template>
  <svg
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.05268 1.09464C1.34557 0.801746 1.82044 0.801746 2.11334 1.09464L4.33301 3.31431L6.55268 1.09464C6.84557 0.801746 7.32044 0.801746 7.61334 1.09464C7.90623 1.38753 7.90623 1.86241 7.61334 2.1553L4.86334 4.9053C4.72269 5.04595 4.53192 5.12497 4.33301 5.12497C4.1341 5.12497 3.94333 5.04595 3.80268 4.9053L1.05268 2.1553C0.759784 1.86241 0.759785 1.38753 1.05268 1.09464Z"
      :fill="fill"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  fill: {
    type: String,
    default: '#787878',
  },
  width: {
    type: Number,
    default: 7,
  },
  height: {
    type: Number,
    default: 4.25,
  },
});
</script>
