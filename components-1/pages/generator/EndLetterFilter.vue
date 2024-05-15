<template>
  <Dropdown
    v-if="!isMobile"
    class="w-full"
    :is-open="isDropdownOpen"
    placement="bottom-right"
    dropdown-wrapper-class-name="top-[calc(100%+2.1875rem)]"
    @toggle-dropdown="handleToggleDropdown"
  >
    <FilterSeclectPlaceholder class="w-full" :label="value || 'End letter'" />
    <template #dropdown>
      <div class="w-[43.125] bg-dark-600 rounded-lg pt-[1.75rem] pr-[1.8125rem] pb-[2.5625rem] pl-[1.875rem] flex flex-col items-start justify-start">
        <h3 class="text-[0.9375rem] text-white mb-[2.4375rem]">Contain letters</h3>
        <LetterPicker class="mb-[2.4375rem]" multiple :value="selectedLetters" @change="handleChange" />
        <BaseButton class="py-[0.625rem] px-[1.375rem]" variant="primary" @click="handleSave">
          Save
        </BaseButton>
      </div>
    </template>
  </Dropdown>
  <div v-else class="w-full">
    <FilterSeclectPlaceholder class="w-full" :label="value || 'End letter'" @click="handleOpenSwipeBar" />
    <SwipeBar
      label="End letter"
      :is-open="isSwipeBarOpen"
      @close="handleCloseSwipeBar"
    >
      <div class="bg-dark-600 rounded-lg px-3 flex flex-col items-start justify-start">
        <LetterPicker class="mb-[2.4375rem]" :value="selectedLetters" @change="handleChange" />
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
import LetterPicker from '~/components-2-1/shared/LetterPicker.vue';

// Constants
import { mobileMediaQuery } from '~/constants/global';


const isMobile = useMedia(mobileMediaQuery);

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits(['save']);

const selectedLetters = ref<string>(props.value || '');
const isDropdownOpen = ref(false);
const isSwipeBarOpen = ref(false);

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleChange = (letter: string) => {
  selectedLetters.value = letter;
};

const handleSave = () => {
  emit('save', selectedLetters.value);
  isDropdownOpen.value = false;

  if (isMobile?.value && isSwipeBarOpen.value) {
    isSwipeBarOpen.value = false;
  }
};

const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>
