<template>
  <div class="w-full flex flex-col items-start">
    <button
      :class="buttonClass || ''"
      class="w-full flex row items-center justify-between"
      type="button"
      @click="handleToggle"
    >
      <slot></slot>

      <Icon
        name="chevron-down"
        class="transition-all duration-300 ease-in-out"
        :class="iconClassComputed"
      />
    </button>

    <Transition name="fade-translate-down">
      <slot v-if="open" name="content"></slot>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: any;
  open: boolean;
  iconClass?: string;
  buttonClass?: string;
}>();

const emit = defineEmits(['toggle']);

const iconClassComputed = computed(() => {
  return [
    props.iconClass,
    props.open ? 'rotate-180' : '',
  ];
});

function handleToggle() {
  emit('toggle', props.id);
}
</script>
