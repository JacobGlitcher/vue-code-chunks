<template>
  <BaseOverlay
    hide-scroll
    :class="`overflow-y-auto ${backdrop || '!bg-modal-backdrop-darker'}`"
    @close="handleClose"
  >
    <div
      class="min-h-full w-full flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      @click.self="handleClose"
    >
      <div :class="`content relative z-modal w-full bg-white ${contentClass || ''} ${padding || 'px-[1rem] pb-[1rem] pt-[1.125rem] md:p-[2.5rem] md:my-[2.5rem]'} ${maxWidth || 'max-w-[36.5rem]'}`">
        <slot></slot>
      </div>
    </div>
  </BaseOverlay>
</template>

<script setup lang="ts">
const props = defineProps<{
  maxWidth?: string;
  padding?: string;
  backdrop?: string;
  contentClass?: string;
}>();

const emit = defineEmits(['close']);

const route = useRoute();

function handleClose() {
  emit('close');
}
</script>
