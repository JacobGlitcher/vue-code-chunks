<template>
  <Drawer
    :is-open="isOpen"
    transition="fade-translate-down-content"
    close-on-overlay-hover
    :overlay-class="`${isBannerOpen ? 'mt-[8.25rem]' : 'mt-[5.5rem]'}`"
    :content-class="`content bg-white w-full h-[37.5rem] px-[1.875rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] py-[3.125rem] ${isBannerOpen ? 'max-h-[calc(100vh-8.25rem)]' : 'max-h-[calc(100vh-5.5rem)]'}`"
    @close="handleClose"
  >
    <div
      v-if="category"
      class="w-full h-full flex flex-wrap xga:flex-nowrap gap-[1.75rem] overflow-y-auto scroll"
    >
      <div
        v-for="(catalogColumn, index) in sortedCatalogs"
        :key="index"
        class="flex flex-col items-start gap-y-[1.75rem] w-[16.7%]"
      >
        <MenuCatalog
          v-for="catalog in catalogColumn"
          :key="catalog.id"
          :catalog="catalog"
        ></MenuCatalog>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Components
import MenuCatalog from '~/components-2/common/MenuCatalog.vue';

// Store
import { useCategoryStore } from '~/store/category';

// Utilities
import { sortCatalogs } from '~/utilities/sortCatalogs';

// Types
import { ICategory } from '~/types';

const route = useRoute();

const categoryStore = useCategoryStore();

const { list: categoriesList } = storeToRefs(categoryStore);

const isBannerOpen = useCheckBannerOpen();

const isOpen = computed<boolean>(() => {
  const category = route.query.category;

  return Boolean(category && typeof category === 'string');
});

const category = computed<ICategory | null>(() => {
  if (!isOpen) {
    return null;
  }

  return categoriesList.value.find((category) => {
    return category.id === route.query.category;
  }) || null;
});

const sortedCatalogs = computed(() => {
  if (!category.value) {
    return [];
  }

  return sortCatalogs(category.value.catalogs);
});

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      category: undefined,
    },
  });
}
</script>
