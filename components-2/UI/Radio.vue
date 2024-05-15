<template>
  <div :class="wrapperClass || ''" class="flex items-center w-full">
    <input
      v-bind="$attrs"
      type="radio"
      :id="id"
      :value="value"
      v-model="radioSelected"
      class="appearance-none w-0 h-0 border-0 p-0 "
    />

    <label
      :for="id"
      class="flex items-center cursor-pointer w-full group/radio"
    >
      <span
        aria-hidden="true"
        :class="{ 'after:bg-black lg:group-hover/radio:after:bg-gray-800': isSelected, 'after:bg-transparent': !isSelected }"
        class="lg:group-hover/radio:border-gray-800 relative w-[1.25rem] h-[1.25rem] full-hd:w-[1.5rem] full-hd:h-[1.5rem] border-[0.063rem] border-black rounded-full bg-transparent after:absolute after:z-component after:w-[0.813rem] after:h-[0.813rem] full-hd:after:w-[0.962rem] full-hd:after:h-[0.962rem] after:rounded-full after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%]"
      />

      <span
        :class="labelClass || ''"
        class="text-lg text-black pl-[0.5rem] select-none leading-[0.875rem] font-light full-hd:text-[1rem] full-hd:leading-[1.5rem]"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: string;
  id?: string;
  modelValue: string | null;
  wrapperClass?: string;
  labelClass?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const radioSelected = ref<string | null>(props.modelValue);

watch(radioSelected, (value) => {
  if (value !== props.modelValue) {
    emit('update:modelValue', value);
  }
});

watch(props, (value) => {
  if (value.modelValue !== radioSelected.value) {
    radioSelected.value = value.modelValue;
  }
});

const isSelected = computed(() => {
  return props.value === props.modelValue;
});
</script>
