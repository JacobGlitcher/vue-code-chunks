<template>
  <ul>
    <li v-for="item in fakdeData" :key="item.name" class="px-4 py-[1.625rem] border-t-[#313131] border-t-[0.0625rem]">
      <h4 class="text-[0.9375rem] mb-[0.9375rem] font-medium">{{ item.name }}</h4>
      <div class="text-white-700">
        <div class="py-2 flex items-center justify-start">
          <span class="w-[5.625rem] mr-5">Status</span>
          <span>{{ item.status }}</span>
        </div>
        <div class="py-2 flex items-center justify-start">
          <span class="w-[5.625rem] mr-5">Category</span>
          <span class="text-white-900">{{ item.category }}</span>
        </div>
        <div class="py-2 flex items-center justify-start">
          <span class="w-[5.625rem] mr-5">Office</span>
          <span class="text-white-900">{{ item.office }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
// Types
import { ITrademarkItem } from '~/types';


const route = useRoute();

const { search } = route.query;

const fakdeData: ITrademarkItem[] = [
  {
    name: (search as string).toUpperCase(),
    category: 'Category',
    office: 'Unitated States',
    status: 'Emdbed',
  },
  {
    name: (search as string).toUpperCase(),
    category: 'Category',
    office: 'Armenia',
    status: 'Registered',
  },
];
</script>