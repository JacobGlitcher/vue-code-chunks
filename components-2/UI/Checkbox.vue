<template>
  <div
    :class="wrapperClass || ''"
    class="flex items-center cursor-pointer"
    @click="handleClick"
  >
    <button
      v-bind="$attrs"
      role="checkbox"
      tabindex="0"
      type="button"
      class="flex items-center justify-center w-[1.25rem] h-[1.25rem] border-black border-[0.063rem] transition-all duration-300 ease-in-out"
      :class="`${buttonClass || ''} ${value ? 'bg-black !border-black' : ''}`"
    >
      <Transition name="fade">
        <Icon
          v-if="value"
          name="check"
          class="stroke-white w-[0.875rem] h-[0.875rem]"
        />
      </Transition>
    </button>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
  buttonClass?: string;
  wrapperClass?: string;
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
