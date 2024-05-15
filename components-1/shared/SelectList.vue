<template>
  <div class="bg-dark-600">
    <span v-if="label">{{ label }}</span>
    <ul class="flex flex-col items-start justify-start w-full">
      <li
        v-for="item in list"
        :key="item.key"
        class="px-4 pt-[0.875rem] pb-4 hover:bg-dark-650 hover:cursor-pointer hover:text-white-900 text-white-700 rounded-md w-full flex items-center justify-between"
        @click="handleSelect(item.key)"
      >
        <span>{{ item.value }}</span>
        <Icon name="arrow-right" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Types
import { ISelectListList } from '~/types';

defineProps<{
  label?: string;
  list: ISelectListList[];
  value: string | null;
}>();

const emit = defineEmits(['change']);

const handleSelect = (value: string) => {
  emit('change', value);
};
</script>