<template>
  <Accordion class="w-full py-[1.75rem] px-[1.25rem] sm:px-0 border-t-[#ECECEC] border-t-[0.063rem]"
    icon-class="stroke-black w-[0.938rem] h-[0.938rem]" :id="filter.key" :open="open" @toggle="handleToggle">
    <h3 class="text-xl font-medium text-black">
      {{ filter.label }}
    </h3>

    <template #content>
      <VariantsFilter v-if="filter.type === 'variants'" :filter="filter" :state="state" @change="handleChange">
      </VariantsFilter>

      <div v-else-if="filter.type === 'range'" class="relative w-full h-full px-[3rem] py-[3rem]">
        <Slider :min="filter.min" :max="filter.max" :format="filter.format" :step="filter.step"
          :default-value="defaultValue" @change="handleChange" />
      </div>
    </template>
  </Accordion>
</template>

<script setup lang="ts">
// Components
import VariantsFilter from './VariantsFilter.vue';
import Slider from '~/components-2/shared/Slider.vue';

// Types
import { FilterType } from '~/types';

const emit = defineEmits(['toggle', 'change']);

const props = defineProps<{
  filter: FilterType;
  state: Record<string, any>;
  defaultValue?: any;
  open: boolean;
}>();

function handleToggle(id: string) {
  emit('toggle', id);
}

function handleChange(value: { key: string, fieldKey: string, value: any }) {
  emit('change', value);
}
</script>
