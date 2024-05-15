<template>
  <div>
    <table class="w-full border-collapse">
      <thead class="text-white-700">
        <tr class="border-b-[0.0625rem] border-b-dark-600">
          <th class="text-start pl-6 pb-[1.125rem] w-3/5">Domain</th>
          <th class="text-start pb-[1.125rem]">Status</th>
          <th class="text-start pb-[1.125rem]">Price</th>
          <th class="text-end pb-[1.125rem] pr-6">Tools</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <tr v-for="item of data" :key="item.domain_name" class="hover:bg-dark-600 border-b-[0.0625rem] border-b-dark-600 transition-shadow">
          <td class="py-[1.125rem] pl-6">
            <div class="inline-flex items-center justify-start">
              <button class="table-action-btn mr-[1.125rem] group transition-colors">
                <Icon class="group-hover:text-white-900 text-white-700" name="save" />
              </button>
              <span class="text-white-900">
                {{ item.domain_name.slice(0, item.domain_name.indexOf('.')) }}<span class="text-white-700">{{ item.domain_name.substring(item.domain_name.indexOf('.')) }}</span>
              </span>
            </div>
          </td>
          <td class="py-[1.125rem]">
            <div>
              <span class="text-white-900">{{ item.available ? 'Available' : 'Taken' }}</span>
            </div>
          </td>
          <td>
            <div>
              <span :class="item.price ? 'text-white-700' : 'text-white-900'">{{ item.price ? item.price : 'N/A' }}</span>
            </div>
          </td>
          <td class="text-end pr-6">
            <div class="flex items-center justify-end">
              <button class="table-action-btn group mr-[0.5rem] transition-colors" @click="handleToolClick(item.domain_name, '/trademark')">
                <Icon class="group-hover:text-white-900 text-white-700" name="trademark" />
              </button>
              <button class="table-action-btn group transition-colors" @click="handleToolClick(item.domain_name, 'competitors')">
                <Icon class="group-hover:text-white-900 text-white-700" name="earth" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading" class="w-full mt-[1.625rem] px-6">
      <img class="w-full max-h-[50rem]" src="/images/thumbnail.png" alt="advert">
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import { ISearchItem } from '~/types';

const props = defineProps<{
  data: ISearchItem[] | null;
  isLoading?: boolean;
}>();

console.log(props.data);


const { handleToolClick } = useMainTable();
</script>