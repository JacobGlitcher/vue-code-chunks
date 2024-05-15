<template>
  <div>
    <Slider v-model="value" :min="props.min" :max="props.max" :step="props.step" :format="props.format" :classes="{
      tooltip: 'absolute block border-[0.02rem] text-md font-normal whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-black border border-black bg-white transform h:-translate-x-1/2 h:left-1/2 v:-translate-y-1/2 v:top-1/2 disabled:bg-gray-400 disabled:border-gray-400 merge-h:translate-x-1/2 merge-h:left-auto merge-v:-translate-x-4 merge-v:top-auto tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
      connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-black cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
      handle: 'absolute rounded-full bg-white border-[0.02rem] border-black shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed',
      base: 'w-full h-full relative z-1 bg-gray-500',
    }" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider';

const emit = defineEmits(['change']);

const props = defineProps<{
  min: number,
  max: number,
  step: number,
  defaultValue?: [number, number],
  value?: Ref<number[]>,
  format: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
    thousand?: string;
  },
}>();

const value = props.value ?? ref(props.defaultValue ?? [props.min, props.max]);

function handleChange(newValue: [number, number]) {
  emit('change', newValue);
}
</script>

<style lang="scss">
@import '@vueform/slider/themes/tailwind.scss'
</style>