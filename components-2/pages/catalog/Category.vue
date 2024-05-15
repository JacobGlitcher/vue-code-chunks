<template>
  <Transition name="category">
    <div
      v-if="catalogName || hasSearchedCategory"
      :class="{
        '!top-[-16rem]': !isHeaderOpen,
        'top-[3.5rem] sm:top-[5.5rem]': !isBannerOpen,
        'top-[6.25rem] sm:top-[8.25rem]': isBannerOpen,
      }"
      class="fixed z-popup left-0 w-full h-category-mobile sm:h-category bg-white flex items-center justify-center flex-col px-[1.25rem] sm:px-[1.75rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] border-t-[#EBEBEB] border-t-[0.063rem] transition-top duration-300 ease-in-out"
    >
      <h3
        v-if="catalogName"
        class="full-hd:text-[1.5rem] full-hd:leading-[2rem] w-full text-xl text-black leading-[1.5rem] font-medium text-center uppercase"
      >
        {{ catalogName }}
      </h3>

      <div
        v-if="hasSearchedCategory"
        :class="{ 'mt-[1rem]': catalogName }"
        class="w-full flex items-center justify-center flex-col"
      >
        <h4
          class="text-xl font-medium text-black uppercase leading-[1.5rem] full-hd:text-[1.5rem] full-hd:leading-[2rem]"
        >
          “{{ query }}”
        </h4>

        <div class="flex items-center justify-center mt-[1rem]">
          <span
            class="full-hd:text-[1rem] full-hd:leading-[1.5rem] text-black-lighter text-lg font-light leading-[1.25rem]"
          >
            {{ products?.length ?? 0 }} results
          </span>

          <div class="w-[0.063rem] h-[1.5rem] bg-[#C7C7C7] mx-[1.875rem]" />

          <button
            class="full-hd:text-[1rem] full-hd:leading-[1.5rem] text-black-lighter text-md font-normal underline leading-[1.25rem] hover:text-black-light-hover transition-colors duration-[160] ease-in-out"
            @click="handleReset"
          >
            Search again
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useCategoryStore } from "~/store/category";
import { useShopStore } from "~/store/shop";
import { useUiStore } from "~/store/ui";

const route = useRoute();

const categoryStore = useCategoryStore();
const shopStore = useShopStore();
const uiStore = useUiStore();

const { isHeaderOpen } = storeToRefs(uiStore);
const { query, selectedCategories, products } = storeToRefs(shopStore);
const { map: categoriesMap } = storeToRefs(categoryStore);

const isBannerOpen = useCheckBannerOpen();

const catalogName = computed(() => {
  const catalogName = selectedCategories.value
    ?.map(({ name }) => name)
    ?.join(" & ");

  if (catalogName.length) {
    return catalogName;
  } else if (selectedCategories.value.length > 0) {
    return selectedCategories.value
      .map((a) => categoriesMap.value.get(a.id))
      ?.join(" & ");
  }
});

const hasSearchedCategory = computed(() => {
  return Boolean(query.value.length);
});

function handleReset() {
  shopStore.setQuery("");

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      search: "",
    },
  });
}
</script>

<style>
.category-enter-active,
.category-leave-active {
  height: 11.25rem;
  opacity: 1;
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.category-enter-from,
.category-leave-to {
  opacity: 0;
  height: 0;
}
</style>
