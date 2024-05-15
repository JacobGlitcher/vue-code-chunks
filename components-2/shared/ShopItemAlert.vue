<template>
  <Alert :open="!!item" @close="handleClose">
    <div class="w-full flex items-center">
      <div class="w-[2.5rem] h-[2.5rem] flex items-center justify-center">
        <img :src="item!.image" :alt="item!.name" class="w-full h-full" />
      </div>

      <div class="flex-1 ml-[1.25rem] flex items-start flex-col">
        <span class="text-sm text-[#343434] font-light sm:whitespace-nowrap">
          The item {{ item!.name }} has been added to your wishlist
        </span>
      </div>
    </div>
  </Alert>
</template>

<script setup lang="ts">
// Types
import { IShopItemAlertData } from '~/types';

const emit = defineEmits(['close']);

const props = defineProps<{
  item: IShopItemAlertData | null;
}>();

const route = useRoute();

function handleClose() {
  emit('close');
}
</script>
