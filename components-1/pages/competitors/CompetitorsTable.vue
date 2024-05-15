<template>
  <div>
    <table class="w-full border-collapse">
      <thead class="text-white-700">        
        <tr class="border-b-[0.0625rem] border-b-dark-600">
          <th class="text-start pl-6 pb-[1.125rem] w-3/5">Domain name</th>
          <th class="text-start pb-[1.125rem]">Status</th>
          <th class="text-end pb-[1.125rem] pr-6">Website</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in fakdeData" :key="index" class="hover:bg-dark-600 border-b-[0.0625rem] border-b-dark-600 transition-colors">
          <td v-for="value, key, index in item" class="py-[1.125rem]" :class="{'text-start pl-6 w-3/5': index === 0, 'text-end pr-6': index === 2}">
            <a v-if="key === 'website'" class="text-white-700 underline" :href="value" target="_blank">Open website</a>
            <span v-else>{{ value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
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