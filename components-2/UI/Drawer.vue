<template>
  <Transition :name="transition || ''">
    <BaseOverlay
      v-if="isOpen"
      :class="overlayClass"
      :close-on-overlay-hover="closeOnOverlayHover || false"
      :hide-scroll="hideScroll || false"
      @close="handleClose"
    >
      <div @click="$event.stopPropagation()" :class="contentClass">
        <slot></slot>
      </div>
    </BaseOverlay>
  </Transition>
</template>

<script setup lang="ts">
// Add direction for opening side of the drawer

defineProps<{
  transition?: string;
  isOpen: boolean;
  contentClass?: string;
  overlayClass?: string;
  closeOnOverlayHover?: boolean;
  hideScroll?: boolean;
}>();

const emit = defineEmits(['open', 'close']);

const handleClose = () => {
  emit('close');
};
</script>
