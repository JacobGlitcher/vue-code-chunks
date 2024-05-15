<template>
  <div class="sm:w-[30.6666666667%]">
    <ul class="w-full flex flex-col">
      <li
        v-for="(tab, index) in cookiePreferencesTabs"
        :key="tab.name"
        class="flex w-full"
      >
        <button
          :class="{ 'bg-white border-l-black': activeTab === index }"
          class="text-[0.766rem] bg-[#F4F4F4] border-b-[#d7d7d7] border-b-[0.063rem] leading-[1.072rem] font-semibold font-suisse p-[0.75rem] border-l-[0.625rem] border-l-transparent w-full items-center text-left"
          @click="handleSelect(index)"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Constants
import { cookiePreferencesTabs } from '~/constants/cookiePreferencesTabs';

const props = defineProps<{
  activeTab: number;
}>();

const emit = defineEmits(['change'])

function handleSelect(index: number) {
  emit('change', index);
}
</script>
