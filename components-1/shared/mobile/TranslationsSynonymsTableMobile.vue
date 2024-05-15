<template>
  <div class="px-[0.125rem] ">
    <h4 v-if="path.startsWith('/translator')" class="text-white-700 font-medium px-[0.875rem] py-[1.125rem]">
      Translate
    </h4>
    <ul>
      <TranslationsSynonymsTableItemMobile v-for="item, index of data" :data="item" :index="index" :key="item" />
    </ul>
  </div>

</template>

<script setup lang="ts">
// Components
import TranslationsSynonymsTableItemMobile from './TranslationsSynonymsTableItemMobile.vue';


const route = useRoute();
const { path } = route

defineProps<{
  data: string[];
}>();
</script>