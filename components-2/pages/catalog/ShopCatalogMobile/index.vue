<template>
  <Drawer
    :is-open="isOpen"
    hide-scroll
    transition="fade-translate-down-content"
    content-class="content bg-white w-full h-full px-[1rem] pb-[1rem]"
    @close="handleClose"
  >
    <div class="flex w-full items-center h-[3.75rem]">
      <h2 class="text-lg leading-[1.25rem] font-medium tracking-[0.8px]">
        CATEGORIES
      </h2>

      <button
        aria-label="Close"
        class="ml-auto"
        @click="handleClose"
      >
        <Icon
          name="close"
          class="stroke-black w-[1rem] h-[1rem]"
        />
      </button>
    </div>

    <div class="bg-[#E8E8E8] w-[calc(100%+2rem)] h-[0.063rem] mb-[1rem] mx-[-1rem]" role="separator" />

    <div class="w-full h-[calc(100vh-4.75rem)] flex flex-col overflow-y-auto overflow-x-hidden scroll">
      <Accordion
        v-for="category in categoriesList"
        :key="category.id"
        :id="category.id"
        :open="openedCatalog === category.id"
        button-class="h-[2.7rem]"
        icon-class="stroke-black w-[0.938rem] h-[0.938rem]"
        @toggle="handleCatalogToggle"
      >
        <h3 class="text-lg font-medium leading-[1.25rem] uppercase">
          {{ category.name }}
        </h3>

        <template #content>
          <ShopCatalogList
            :category="category"
          />
        </template>
      </Accordion>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Components
import ShopCatalogList from '~/components-2/pages/catalog/ShopCatalogMobile/ShopCatalogList.vue';

// Store
import { useCategoryStore } from '~/store/category';

const categoryStore = useCategoryStore();

const route = useRoute();

const isBannerOpen = useCheckBannerOpen();

const { list: categoriesList } = storeToRefs(categoryStore);

const openedCatalog = ref<string | null>(null);

const isOpen = computed(() => {
  return typeof route.query.category === 'string';
});

function handleCatalogToggle(id: string) {
  if (id === openedCatalog.value) {
    openedCatalog.value = null;
    return;
  }

  openedCatalog.value = id;
}

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      category: undefined,
    },
  });

  openedCatalog.value = null;
}
</script>
