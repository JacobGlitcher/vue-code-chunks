<template>
  <ul>
    <li v-for="item in fakeData" :key="item.name" class="px-4 py-[1.625rem] border-t-[#313131] border-t-[0.0625rem] flex items-center justify-between">
      <div class="flex flex-col items-start justify-start">
        <h4 class="text-[0.9375rem] font-medium">{{ item.name }}</h4>
        <div class="py-2 flex items-center justify-start text-white-700">
          <Icon class="mr-2" :name="item.type.icon" />
          <span class="font-medium">{{ item.type.value }}</span>
        </div>
      </div>
      <div class="flex items-center justify-end text-white-700">
        <BaseButton class="table-action-btn mr-2" @click="handleDelete(item)">
          <Icon name="close" />
        </BaseButton>
        <BaseButton class="table-action-btn">
          <Icon name="arrow-down-circle" />
        </BaseButton>
      </div>

    </li>
  </ul>
</template>

<script setup lang="ts">
// Types
import { ISavedItem } from '~/types';


const emit = defineEmits(['delete']);

const handleDelete = (value: ISavedItem) => {
  emit('delete', value);
};

const fakeData: ISavedItem[] = [
  {
    name: 'Investment domains',
    type: {
      value: 'Name generator',
      icon: 'generator',
    },
  },
  {
    name: 'Individual saved domains',
    type: {
      value: 'Direct Search',
      icon: 'search',
    },
  },
];
</script>