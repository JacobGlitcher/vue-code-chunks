<template>
  <div
    :class="`${placeholder ? 'pt-[1.25rem]' : ''} ${error ? 'after:!bg-error' : ''}`"
    class="relative w-full flex items-center after:absolute after:z-component after:top-[100%] after:left-0 after:w-full after:h-[0.063rem] after:bg-black after:duration-200 after:ease-out after:transition-colors"
  >
    <label
      v-if="placeholder"
      :for="id"
      :class="`${leftFocus || 'group-focus-within/input:left-[-0.25rem]'} ${modelValue ? `!translate-y-0 !scale-[0.857] ${left || 'left-[-0.25rem]'}` : ''}`"
      class="absolute pointer-events-none top-0 left-0 text-black-light-hover text-lg font-normal leading-[1.429] translate-x-0 translate-y-[calc(100%+0.5rem)] group-focus-within/input:text-black group-focus-within/input:translate-y-0 group-focus-within/input:scale-[0.857] transition-all duration-200 ease-out"
    >
      {{ placeholder }}
    </label>

    <select
      :id="id"
      v-model="value"
      class="w-full bg-transparent outline-none appearance-none h-[2.25rem] py-[0.5rem] text-lg text-black leading-[1.429] font-light"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        class="text-lg text-black leading-[1.429] font-normal"
      >
        {{ option.name }}
      </option>
    </select>

    <Icon
      name="chevron-down"
      class="absolute right-0 w-[1rem] h-[1rem] stroke-black"
    />

    <Transition name="fade">
      <p
        v-if="error"
        role="alert"
        :class="`absolute z-component top-[100%] left-0 text-lg font-normal text-error mt-[0.5rem] leading-[1.429] full-hd:text-xl full-hd:leading-[1.5rem ${errorClass || ''}`"
      >
        {{ error }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import { IOption } from '~/types';
import { Ref } from 'vue/dist/vue';

const props = defineProps<{
  options: IOption[];
  placeholder?: string;
  id?: string;
  modelValue?: string;
  left?: string;
  leftFocus?: string;
  error?: string | Ref<string | boolean> | boolean | null;
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
</script>
