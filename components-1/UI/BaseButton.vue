<template>
  <button
    class="rounded-lg transition-colors"
    :class="className"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// Types
import { VariantsType } from '~/types';

const props = defineProps<{
  variant?: VariantsType;
}>();

const classNameContent = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-brand hover:bg-brand-600 text-dark-400';
    case 'secondary':
      return 'bg-dark-800 hover:bg-dark-950 text-white-900';
    case 'danger':
      return 'bg-danger text-dark-400'
  }
});

const className = props.variant === undefined ? '' : classNameContent;
</script>