<template>
  <NuxtLink
    :to="{
      path: `/category/${catalogType.id}`,
      query: { ...route.query },
    }"
    @click="handleClick(catalogType)"
    class="w-full flex items-center py-[0.7rem]"
  >
    <span
      :class="{
        underline: selectedCategories.some(({ id }) => catalogType.id === id),
      }"
      class="text-black font-light text-lg leading-[1.25rem]"
    >
      {{ catalogType.name }}
    </span>

    <div
      v-if="catalogType.new"
      :style="{ borderColor: catalogType.newColor || '#BCE7FF' }"
      class="ml-auto mr-[0.25rem] flex items-center justify-center w-fit height-[1rem] px-[0.375rem] border-[0.063rem]"
    >
      <span class="text-black text-sm font-normal leading-[1rem]"> New </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
// Types
import { storeToRefs } from "pinia";
import { useShopStore } from "~/store/shop";
import { ICatalog, ICatalogType } from "~/types";

const route = useRoute();
const shopStore = useShopStore();

const { selectedCategories } = storeToRefs(shopStore);

defineProps<{
  catalog: ICatalog;
  catalogType: ICatalogType;
}>();

function handleClick(catalog: ICatalogType) {
  const i = selectedCategories.value.findIndex(({ id }) => catalog.id === id);

  if (i > -1) {
    selectedCategories.value.splice(i, 1);
    shopStore.setCategories(selectedCategories.value);

    navigateTo({
      path: "/",
      query: {
        ...route.query,
      },
    });
  } else {
    shopStore.setCategories([...selectedCategories.value, catalog]);
  }
}
</script>
