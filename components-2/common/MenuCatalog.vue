<template>
  <div class="w-full">
    <h3
      class="text-md full-hd:text-lg full-hd:leading-[1.25rem] font-medium text-black leading-[1rem]"
    >
      {{ catalog.name }}
    </h3>

    <ul class="flex flex-col gap-y-[0.5rem] mt-[0.5rem]">
      <li
        v-for="catalogType in catalog.types"
        :key="catalogType.id"
        class="flex items-center"
      >
        <NuxtLink
          :to="{
            path: `/category/${catalogType.id}`,
            query: { ...route.query },
          }"
          @click="handleClick(catalogType)"
          class="flex items-center flex-wrap"
        >
          <span
            :class="{
              underline: selectedCategories.some(
                ({ id }) => catalogType.id === id
              ),
            }"
            class="text-md full-hd:text-lg full-hd:leading-[1.25rem] text-[#333] font-light leading-[1rem] mr-[0.8rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            {{ catalogType.name }}
          </span>

          <div
            v-if="catalogType.new"
            :style="{ borderColor: catalogType.newColor || '#BCE7FF' }"
            class="flex items-center justify-center w-fit height-[1rem] px-[0.375rem] border-[0.063rem]"
          >
            <span
              class="text-black text-sm full-hd:text-lg full-hd:leading-[1.25rem] font-normal"
            >
              New
            </span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Types
import { ICatalog, ICatalogType } from "~/types";

import { useShopStore } from "~/store/shop";
import { storeToRefs } from "pinia";

const route = useRoute();
const shopStore = useShopStore();

const { selectedCategories } = storeToRefs(shopStore);

defineProps<{ catalog: ICatalog }>();

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
