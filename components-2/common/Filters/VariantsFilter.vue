<template>
  <div class="mt-[1.375rem] w-full flex flex-col items-start gap-y-[0.75rem]">
    <BaseInput
      v-if="filter.search"
      v-model="search"
      :id="`${filter.key}-search`"
      placeholder="Search"
      input-class="!font-light"
      placeholder-class="!font-light"
      class="mb-[0.875rem] w-full"
    />

    <div
      v-for="variant in variants"
      :key="variant.key"
      class="w-full flex items-center"
    >
      <Checkbox
        :model-value="state[variant.key]"
        @update:model-value="handleChange($event, variant.key)"
        :class="{ '!border-[#ccc]': !state[variant.key] }"
      >
        <span class="select-none ml-[0.5rem] font-light text-black text-[0.938rem] max-w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
          {{ variant.label }}
        </span>
      </Checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import { IVariantsFilter } from '~/types';

const props = defineProps<{
  filter: IVariantsFilter;
  state: Record<string, any>;
}>();

const emit = defineEmits(['change']);

const search = ref('');

const variants = computed(() => {
  return props.filter.variants.filter((variant) => variant.label.toLowerCase().includes(search.value.toLowerCase()));
});

function handleChange(value: boolean, key: string) {
  emit('change', {
    key: props.filter.key,
    fieldKey: key,
    value,
  });
}
</script>
