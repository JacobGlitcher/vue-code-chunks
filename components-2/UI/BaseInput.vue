<template>
  <div
    :class="`${wrapperClass || ''} ${placeholder ? 'pt-[1.25rem]' : ''} ${error ? 'after:!bg-error' : ''} ${!error && (modelValue || isAutofill) ? 'after:!bg-black' : ''}`"
    class="relative flex items-center justify-center group/input focus-within:after:bg-black after:absolute after:z-component after:top-[100%] after:left-0 after:w-full after:h-[0.063rem] after:bg-black-lighter-hover after:duration-200 after:ease-out after:transition-colors"
  >
    <label
      v-if="placeholder"
      :for="id"
      :class="`${topFocus || 'group-focus-within/input:translate-y-0'} ${scaleFocus || 'group-focus-within/input:scale-[0.857]'} ${top || 'translate-y-[calc(100%+0.5rem)]'} ${leftFocus || 'group-focus-within/input:left-[-0.25rem]'} ${(modelValue || isAutofill) ? `${topValue || '!translate-y-0'} ${scale || '!scale-[0.857]'} ${left || 'left-[-0.25rem]'}` : ''} ${placeholderClass || ''}`"
      class="absolute pointer-events-none tracking-[0.1px] top-0 left-0 text-black-light-hover font-light text-lg leading-[1.429] translate-x-0 group-focus-within/input:text-black transition-all duration-200 ease-out"
    >
      {{ placeholder }}
    </label>

    <input
      ref="inputElement"
      v-bind="$attrs"
      :id="id"
      :type="inputType"
      :value="value"
      :class="`${inputClass || ''} ${showEye ? 'pr-[2rem]' : ''}`"
      class="w-full h-[2.25rem] py-[0.5rem] outline-none text-xl lg:text-lg font-light leading-[1.429] text-black"
      @input="handleInput($event)"
    />

    <Transition name="fade">
      <p
        v-if="error"
        role="alert"
        :class="`absolute z-component top-[100%] left-0 text-lg font-normal text-error mt-[0.5rem] leading-[1.429] full-hd:text-xl full-hd:leading-[1.5rem] ${errorClass || ''}`"
      >
        {{ error }}
      </p>
    </Transition>

    <button
      v-if="showEye"
      class="absolute z-component right-0"
      type="button"
      aria-label="Toggle password visibility"
      @click="handleTogglePassword"
    >
      <Icon
        :name="inputType === 'password' ? 'eye' : 'eye-close'"
        class="w-[1.25rem] h-[1.25rem] fill-black"
      />
    </button>

    <slot name="icon"></slot>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const props = defineProps<{
  id: string;
  placeholder?: string;
  left?: string;
  leftFocus?: string;
  top?: string;
  topValue?: string;
  topFocus?: string;
  scale?: string;
  scaleFocus?: string;
  type?: string;
  modelValue?: string | number;
  error?: string | Ref<string | boolean> | boolean | null;
  min?: number;
  showEye?: boolean;
  errorClass?: string;
  placeholderClass?: string;
  inputClass?: string;
  wrapperClass?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const inputType = ref<string>(props.type || 'text');
const inputElement = ref<HTMLInputElement | null>(null);
const isAutofill = ref<boolean>(false);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (typeof props.min === 'number') {
      if (+(value || '') <= props.min) {
        return emit('update:modelValue', props.min);
      }
    }

    emit(
      'update:modelValue',
      typeof props.min === 'number'
        ? +(value || '')
        : value
    );
  },
});

onMounted(() => {
  setTimeout(() => {
    if (!inputElement.value) {
      return;
    }

    const match = [":autofill", ":-webkit-autofill", ":-moz-autofill"].find((selector) => {
      try {
        return inputElement.value!.matches(selector);
      } catch {
        return false;
      }
    });

    if (match) {
      isAutofill.value = true;
    }
  }, 500);
});

function handleInput(e: Event) {
  value.value = (<HTMLInputElement>e.target).value;
  isAutofill.value = false;
}

function handleTogglePassword() {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
}
</script>
