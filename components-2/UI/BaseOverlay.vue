<template>
  <div
    class="fixed z-modal top-0 left-0 bottom-0 right-0 bg-modal-backdrop"
    @mouseover.self="handleSelfHover"
    @click.self="handleSelfClick"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  closeOnOverlayHover?: boolean;
  hideScroll?: boolean;
}>();

const emit = defineEmits(['close']);

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mouseleave', handleMouseLeave);

  if (props.hideScroll) {
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
    }, 0);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('mouseleave', handleMouseLeave);

  if (props.hideScroll) {
    document.body.style.overflow = '';
  }
});

function close() {
  emit('close');
}

function handleSelfClick() {
  close();
}

function handleSelfHover() {
  if (props.closeOnOverlayHover) {
    close();
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close();
  }
}

function handleMouseLeave(e: MouseEvent) {
  if (!props.closeOnOverlayHover) {
    return;
  }

  if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
    close();
  }
}
</script>
