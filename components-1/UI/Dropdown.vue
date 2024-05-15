<template>
  <div class="relative" @click="handleToggleDropdown">
    <slot></slot>
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="absolute"
        :class="[!customPosition ? placement : null, dropdownWrapperClassName]"
        @click="$event.stopPropagation()"
      >
          <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import { DropdownPlacementType, IDropdownCustomPosition } from '~/types';


const props = defineProps<{
  isOpen: boolean;
  placement?: DropdownPlacementType;
  customPosition?: IDropdownCustomPosition;
  dropdownWrapperClassName?: string;
  // TODO add custom position[top, right, bottom, left] by style which will override placement
}>();

const placement = computed<string>(() => {
  switch (props.placement) {
    case 'bottom-left':
      return 'top-full left-0';
    case 'bottom-center':
      return `top-full left-1/2 -translate-x-1/2`;
    case 'bottom-right':
      return 'top-full right-0';
    case 'center-right':
      return 'top-1/2 -translate-y-1/2 right-full';
    default:
      return '';
  }
});

const emit = defineEmits(['toggle-dropdown', 'close']);

const handleToggleDropdown = () => {
  emit('toggle-dropdown');  
};

// const handleOutsideClick = () => {
//   emit('close');
// };

// onMounted(() => {
//   document.addEventListener('click', handleOutsideClick);
// });

// onUnmounted(() => {
//   document.removeEventListener('click', handleOutsideClick);
// });
</script>
