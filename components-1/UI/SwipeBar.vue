<template>
  <Transition name="fade-translate-up">
    <div
      v-if="isOpen"
      class="fixed bottom-0 left-0 bg-dark-600 w-full z-[100]"
      :class="isFull ? 'h-screen' : 'h-[calc(100vh-2.1875rem)] rounded-tl-4xl rounded-tr-4xl pt-10 px-[0.375rem]'"
    >
      <div class="flex items-center justify-between px-3 pb-8">
        <span class="text-white-900 text-lg">{{ label }}</span>
        <button
          class="w-11 h-11 inline-flex items-center justify-center bg-dark-800 rounded-lg text-white-900"
          variant="secondary"
          type="button"
          @click.stop="handleClose"
        >
          <Icon name="close" />
        </button>
      </div>
      <span v-if="!isFull" class="h-[0.1875rem] w-10 bg-[#434343] absolute left-1/2 top-4 -translate-x-1/2"></span>
      <slot></slot>
    </div>
  </Transition>
  
</template>

<script setup lang="ts">
defineProps<{
  isFull?: boolean;
  label?: string;
  isOpen?: boolean;
}>();

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>