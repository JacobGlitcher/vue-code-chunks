<template>
  <div class="w-full flex flex-col">
    <Accordion
      v-for="catalog in category.catalogs"
      :key="catalog.id"
      :id="catalog.id"
      :open="openedCatalog === catalog.id"
      button-class="h-[2.7rem]"
      icon-class="stroke-black w-[0.938rem] h-[0.938rem]"
      @toggle="handleToggle"
    >
      <h4 class="text-lg leading-[1.25rem] font-light tracking-[0.8px]">
        {{ catalog.name }} ({{ catalog.count }})
      </h4>

      <template #content>
        <div class="w-full pl-[0.7rem] flex flex-col">
          <ShopCatalogItem
            v-for="catalogType in catalog.types"
            :key="catalogType.id"
            :catalog="catalog"
            :catalog-type="catalogType"
          />
        </div>
      </template>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
// Components
import ShopCatalogItem from '~/components-2/pages/catalog/ShopCatalogMobile/ShopCatalogItem.vue';

// Types
import { ICategory } from '~/types';

const props = defineProps<{
  category: ICategory;
}>();

const openedCatalog = ref<string | null>(null);

function handleToggle(value: string | null) {
  openedCatalog.value = value === openedCatalog.value ? null : value;
}
</script>
