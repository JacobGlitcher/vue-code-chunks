<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-col items-center justify-center w-full mb-13">
      <h4 class="text-lg mb-16 -sm:max-w-[14.25rem] -sm:text-center">Do you really want to delete this list of domains?</h4>
      <span class="p-[1.875rem] border-dark-800 border-[0.0625rem] border-dashed w-full rounded-xl text-center mb-16 text-[0.9375rem]">
        {{ deletingItem?.name }}
      </span>
      <p class="max-w-[18.75rem] text-center text-white-700 font-medium">
        Keep in mind that the removal is irrevocable. You cannot restore this list of domains
      </p>
    </div>
    <div class="flex flex-col items-center justify-center w-full">
      <BaseButton class="w-full p-[0.625rem] mb-[0.875rem] font-medium" variant="secondary" @click="handleCancel">
        Cancel
      </BaseButton>
      <BaseButton class="w-full p-[0.625rem] font-medium" variant="danger" @click="handleDelete">
        Delete
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import { ISavedItem } from '~/types';


const props = defineProps<{
  deletingItem: ISavedItem;
}>();

const emit = defineEmits(['delete', 'cancel']);

const handleDelete = () => {
  emit('delete');
};

const handleCancel = () => {
  emit('cancel');
};
</script>