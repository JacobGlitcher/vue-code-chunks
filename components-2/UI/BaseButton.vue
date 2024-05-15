<template>
  <button :class="className">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  inverse?: boolean;
}>();

const mainClassName = 'px-7.5 py-3.5 shadow-base-button rounded-full';
const colorsClassName = props.inverse ? 'bg-white text-black' : 'text-white bg-black ';
const className = `${mainClassName} ${colorsClassName}`;
</script>