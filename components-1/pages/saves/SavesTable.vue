<template>
  <div>
    <table class="w-full border-collapse">
      <thead class="text-white-700">        
        <tr class="border-b-[0.0625rem] border-b-dark-600">
          <th class="text-start pl-6 pb-[1.125rem] pt-7">#</th>
          <th class="text-start pb-[1.125rem] pt-7 w-3/5">Name</th>
          <th class="text-start pb-[1.125rem] pt-7">Type</th>
          <th class="text-end pb-[1.125rem] pr-6 pt-7">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in fakeData" :key="index" class="hover:bg-dark-600 border-b-[0.0625rem] border-b-dark-600 text-[#707070]">
          <td class="py-[1.125rem] text-start pl-6 ">
            {{ index + 1 }}
          </td>
          <td class="text-white">
            <div>
              <span>
                {{ item.name }}
              </span>
            </div>
          </td>
          <td>
            <div class="inline-flex items-center justify-start">
              <Icon class="mr-2" :name="item.type.icon" />
              <span>
                {{ item.type.value }}
              </span>
            </div>
          </td>
          <td class="text-end pr-6">
            <div class="flex items-center justify-end">
              <BaseButton class="table-action-btn mr-2" @click="handleDelete(item)">
                <Icon name="close" />
              </BaseButton>
              <BaseButton class="table-action-btn">
                <Icon name="arrow-down-circle" />
              </BaseButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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