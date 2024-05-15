<template>
  <div>
    <ul>
      <li v-for="item in fakdeData" :key="item.domainName" class="px-4 py-[1.625rem] border-t-[#313131] border-t-[0.0625rem]">
        <h4 class="text-[0.9375rem] mb-[0.9375rem] font-medium">{{ item.domainName }}</h4>
        <div class="text-white-700 mb-4">
          <div class="py-2 flex items-center justify-start">
            <span class="w-[5.625rem] mr-5">Status</span>
            <span>{{ item.status }}</span>
          </div>
        </div>
        <a class="text-white-700 underline" :href="item.website" target="_blank">
          <button class="p-[0.625rem] w-full bg-dark-700 rounded-lg" variant="secondary">
            Open website
          </button>
        </a>
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
// Types
import { ICompetitorItem } from '~/types';


const route = useRoute();

const { search } = route.query;

const fakdeData: ICompetitorItem[] = [
  {
    domainName: (search as string).toUpperCase(),
    status: 'Active',
    website: 'https://albertarakelyan.com',
  },
  {
    domainName: (search as string).toUpperCase(),
    status: 'Active',
    website: 'https://albertarakelyan.com',
  },
];
</script>