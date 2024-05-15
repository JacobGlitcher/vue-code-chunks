<template>
  <Dropdown
    v-if="!isMobile"
    class="w-full"
    :is-open="isDropdownOpen"
    placement="bottom-center"
    dropdown-wrapper-class-name="top-[calc(100%+2.1875rem)]"
    @toggle-dropdown="handleToggleDropdown"
  >
    <FilterSeclectPlaceholder class="w-full" :label="isValueTouched ? `${rangeValue.min}-${rangeValue.max}` : 'Length'" />
    <template #dropdown>
      <div class="w-[28.3125rem] bg-dark-600 rounded-lg pt-[1.6875rem] pr-[1.875rem] pb-[2.0625rem] pl-7 flex flex-col items-start justify-start">
        <h3 class="text-[0.9375rem] text-white mb-[2.125rem]">Domain length</h3>
        <span class="text-[#787878] mb-[2.6875rem]">
          Characters <span class="text-white">{{ rangeValue.min }}-{{ rangeValue.max }}</span>
        </span>
        <DoubleRangeSlider
          class="w-full mb-[3.375rem]"
          :min="rangeValue.min"
          :max="rangeValue.max"
          :min-threshold="1"
          :max-threshold="11"
          :step="1"
          @update:min="value => rangeValue.min = value"
          @update:max="value => rangeValue.max = value"
        />
        <BaseButton class="py-[0.625rem] px-[1.375rem] self-end" variant="primary" @click="handleSave">
          Save
        </BaseButton>
      </div>
    </template>
  </Dropdown>
  <div v-else class="w-full">
    <FilterSeclectPlaceholder class="w-full" :label="isValueTouched ? `${rangeValue.min}-${rangeValue.max}` : 'Length'" @click="handleOpenSwipeBar" />
    <SwipeBar
      label="Domain length"
      :is-open="isSwipeBarOpen"
      @close="handleCloseSwipeBar"
    >
      <div class="w-full bg-dark-600 rounded-lg px-3 flex flex-col items-start justify-start">
        <span class="text-[#787878] mb-[2.6875rem]">
          Characters <span class="text-white">{{ rangeValue.min }}-{{ rangeValue.max }}</span>
        </span>
        <DoubleRangeSlider
          class="w-full mb-[3.375rem]"
          :min="rangeValue.min"
          :max="rangeValue.max"
          :min-threshold="1"
          :max-threshold="11"
          :step="1"
          @update:min="value => handleChange('min', value)"
          @update:max="value => handleChange('max', value)"
        />
        <BaseButton class="py-[0.625rem] px-[1.375rem] w-full" variant="primary" @click="handleSave">
          Save
        </BaseButton>
      </div>
    </SwipeBar>
  </div>
</template>

<script setup lang="ts">
// Components
import FilterSeclectPlaceholder from './FilterSeclectPlaceholder.vue';

// Constnats
import { mobileMediaQuery } from '~/constants';

// Types
import { RangeSideType } from '~/types';


const isMobile = useMedia(mobileMediaQuery);

const props = defineProps<{
  value: {
    min: number;
    max: number;
  };
}>();

const emit = defineEmits(['save']);

const rangeValue = reactive(props.value || {
  min: 3,
  max: 5,
});
const isValueTouched = ref(false);

const isDropdownOpen = ref(false);
const isSwipeBarOpen = ref(false);

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};

const handleChange = (side: RangeSideType, value: number) => {
  rangeValue[side] = value;
};

const handleSave = () => {
  emit('save', rangeValue);
  isValueTouched.value = true;
  isDropdownOpen.value = false;

  if (isMobile?.value && isSwipeBarOpen.value) {
    isSwipeBarOpen.value = false;
  }
};
</script>