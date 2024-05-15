<template>
  <ul class="px-[0.125rem]">
    <MainTableItemMobile v-for="item in data" :data="item" :key="item.domain_name" />
  </ul>
</template>

<script setup lang="ts">
// Components
import MainTableItemMobile from './MainTableItemMobile.vue';

// Types
import { ISearchItem } from '~/types';


defineProps<{
  data: ISearchItem[] | null;
}>();
</script>