<template>
  <component :is="icons[name]"></component>
</template>

<script setup lang="ts">
import icons from './icons';

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});
</script>