<template>
  <button
    type="button"
    role="switch"
    aria-checked="false"
    tabindex="0"
    class="relative flex w-[2.188rem] h-[0.625rem]"
    @click="handleClick"
  >
    <span
      :class="`${value ? 'bg-[#cddcf2]' : 'bg-[#f2f1f1]'} w-full h-full rounded-[2.875rem] transition-colors duration-[150] ease`"
      aria-hidden="true"
    />

    <span
      :class="`${value ? 'bg-[#4285f4] translate-x-[1rem]' : 'bg-[#7d7d7d] translate-x-0'} absolute top-[-0.313rem] bottom-[0.063rem] rounded-full w-[1.25rem] h-[1.25rem] transition-all duration-[150] ease`"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function handleClick() {
  value.value = !value.value;
}
</script>
