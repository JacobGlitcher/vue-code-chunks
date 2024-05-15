<template>
  <div v-if="product" v-for="option in filteredOptions" :key="option.id"
    class="flex flex-col py-[1.5rem] border-t-[#ccc] border-t-[0.063rem] w-full gap-2">
    <div class="flex items-center w-full">
      <span
        class="text-lg text-black font-medium leading-[1.25rem] full-hd:text-[1rem] full-hd:leading-[1.5rem] mr-[1rem]">
        {{ option.title.toUpperCase() }}:
      </span>

      <ul class="flex-1 flex items-center gap-x-[0.5rem] overflow-x-auto scroll">
        <li v-for="value in option.values" :key="value.id" class="flex">
          <button v-if="value.value !== selectedOptions[option.id]"
            @click="handleUpdateOption(value.option_id, value.value)"
            class="whitespace-nowrap inline-block py-[0.75rem] px-[0.625rem] text-lg font-light text-black-lighter leading-[1.25rem] full-hd:!p-[0.625rem] full-hd:text-xl full-hd:leading-[1.5rem] border-[0.063rem] border-transparent hover:border-black transition-colors duration-[160] ease-in-out">
            {{ value.value }}
          </button>

          <span v-else
            class="whitespace-nowrap inline-block py-[0.75rem] px-[0.625rem] text-lg font-light text-black-lighter leading-[1.25rem] full-hd:!p-[0.625rem] full-hd:text-xl full-hd:leading-[1.5rem] border-[0.063rem] border-black ml-[0.063rem]">
            {{ value.value }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useProductStore } from '~/store/product';

const productStore = useProductStore();

const { product, selectedOptions } = storeToRefs(productStore);

const filteredOptions = computed(() => {
  return product?.value?.options?.map((option) => {
    option.values = option.values.reduce((acc, curr) => {
      if (!acc.find(val => val.value === curr.value)) {
        return [...acc, { ...curr }]
      }

      return acc;
    }, []);

    return option;
  });
});

function handleUpdateOption(optionId: string, value: string) {
  productStore.updateOption(optionId, value);
}
</script>
