<template>
  <span class="flex items-center justify-between hover:cursor-pointer">
    {{ label }}
    <span>
      <Icon class="-sm:-rotate-90" name="chevron-down" />
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>()
</script>