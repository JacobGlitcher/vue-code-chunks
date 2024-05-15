<template>
  <Transition name="fade-translate-down">
    <div
      v-if="isOpen"
      class="fixed top-0 left-0 w-full h-full overflow-auto p-6 bg-modal-backdrop flex flex-col"
      @click="handleClose"
    >
      <div class="max-w-2xl w-full mx-auto" :class="[{'my-auto': position === 'center'}, contentClassName]" @click="$event.stopPropagation()">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Types
import { ModalPositionType } from '~/types';


const props = defineProps<{
  isOpen?: boolean;
  position?: ModalPositionType;
  withCloseButton?: boolean;
  contentClassName?: string;
}>();

const emit = defineEmits(['close', 'toggle']);

const handleToggle = () => {
  emit('toggle', !props.isOpen);
};

const handleClose = () => {
  emit('close');
};

const clodeModalByEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('keyup', clodeModalByEsc);
});

onUnmounted(() => {
  document.removeEventListener('keyup', clodeModalByEsc);
});
</script>