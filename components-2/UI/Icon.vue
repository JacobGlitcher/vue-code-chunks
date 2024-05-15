<template>
  <component :is="icons[name]"></component>
</template>

<script setup lang="ts">
import icons, { IconsType } from '../icons';

const props = defineProps<{
  name: IconsType;
}>();
</script>
