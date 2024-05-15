<template>
  <div class="relative w-full flex items-center justify-between mb-[1.5rem]">
    <h2 class="text-lg text-black leading-[1.25rem] font-medium">
      {{ title }}
    </h2>

    <button
      aria-label="Close"
      class="absolute right-0 w-[2rem] h-[2rem] flex items-center justify-center"
      @click="handleClose()"
    >
      <Icon
        name="close"
        class="w-[1rem] h-[1rem] stroke-black"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();

const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}
</script>
