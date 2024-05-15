<template>
  <div v-if="!isMobile" class="flex flex-col">
    <div
      v-for="(letters, index) in keyboardLetters"
      :key="index"
      class="flex mb-2"
    >
      <span
        v-for="letter, index in letters"
        :key="letter"
        class="inline-flex items-center justify-center rounded-lg bg-[#303030] w-[3.125rem] h-[2.1875rem] hover:cursor-pointer shadow-letter"
        :class="{'mr-2': index !== letters.length - 1, 'bg-dark-400': isValueActive(letter)}"
        @click="$emit('change', letter)"
      >
        {{ letter }}
      </span>
    </div>
  </div>
  <div v-else class="grid grid-cols-7 gap-2">
    <span
      v-for="letter, index in keyboardLetters.flat(3)"
      :key="letter"
      class="inline-flex items-center justify-center rounded-lg bg-[#303030] w-[3.125rem] h-[2.1875rem] hover:cursor-pointer shadow-letter mr-2"
      :class="{'bg-dark-400': isValueActive(letter)}"
      @click="$emit('change', letter)"
    >
      {{ letter }}
    </span>
  </div>
</template>

<script setup lang="ts">
// Constants
import { keyboardLetters } from "~/constants";

// Contants
import { mobileMediaQuery } from '~/constants/global';


const isMobile = useMedia(mobileMediaQuery);

const props = defineProps<{
  multiple?: boolean;
  value: string | string[];
}>();

// const selectedLetters = ref<string | string[]>(props.value || (props.multiple ? [] : ''));

const isValueActive = (letter: string) => {
  if (props.multiple && Array.isArray(props.value)) {
    return props.value.indexOf(letter) !== -1;
  }

  return props.value === letter;
};

defineEmits(['change']);
</script>
