<template>
  <Transition name="fade-translate-down-content">
    <BaseOverlay v-if="open" hide-scroll class="flex items-start justify-center" @close="handleClose">
      <div class="absolute my-[2.5rem] flex items-start justify-center">
        <div
          class="content bg-white py-[1.125rem] px-[1.875rem] sm:min-w-[26.375rem] max-w-[80%] sm:max-w-full flex items-start flex-col">
          <slot></slot>
        </div>
      </div>
    </BaseOverlay>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);

const props = defineProps<{
  open: boolean;
}>();

const alertTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

watch(() => props.open, (value) => {
  handleClearTimeout();

  if (value) {
    alertTimeout.value = setTimeout(() => {
      handleClose();
      alertTimeout.value = null;
    }, 3000);
  }
});

onUnmounted(() => {
  handleClearTimeout();
});

function handleClose() {
  emit('close');
}

function handleClearTimeout() {
  if (alertTimeout.value) {
    clearTimeout(alertTimeout.value);
    alertTimeout.value = null;
  }
}
</script>
