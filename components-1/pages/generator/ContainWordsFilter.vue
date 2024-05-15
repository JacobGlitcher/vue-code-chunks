<template>
  <Dropdown
    v-if="!isMobile"
    class="w-full"
    :is-open="isDropdownOpen"
    placement="bottom-left"
    dropdown-wrapper-class-name="top-[calc(100%+2.1875rem)]"
    @toggle-dropdown="handleToggleDropdown"
  >
    <FilterSeclectPlaceholder class="w-full" :label="value?.[0] || 'Words'" />
    <template #dropdown>
      <div class="w-[28.3125rem] bg-dark-600 rounded-lg pt-[1.6875rem] pr-[1.875rem] pb-[2.0625rem] pl-7 flex flex-col items-start justify-start">
        <h3 class="text-[0.9375rem] text-white mb-[2.6875rem]">Contain words</h3>
        <TagInput class="w-full mb-[1.0625rem]" :value="words" @change="handleChange" />
        <span class="text-[#787878] mb-[2.6875rem]">Enter words separated by spaces</span>
        <BaseButton class="py-[0.625rem] px-[1.375rem] self-end" variant="primary" @click="handleSave">
          Save
        </BaseButton>
      </div>
    </template>
  </Dropdown>
  <div v-else class="w-full">
    <FilterSeclectPlaceholder class="w-full" :label="value?.[0] || 'Words'" @click="handleOpenSwipeBar" />
    <SwipeBar
      label="Contain words"
      :is-open="isSwipeBarOpen"
      @close="handleCloseSwipeBar"
    >
      <div class="bg-dark-600 rounded-lg px-3 flex flex-col items-start justify-start">
        <TagInput class="w-full mb-[1.0625rem]" :value="words" @change="handleChange" />
        <span class="text-[#787878] mb-[2.6875rem]">Enter words separated by spaces</span>
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
import TagInput from '~/components-2-1/shared/TagInput.vue';

// Contants
import { mobileMediaQuery } from '~/constants/global';


const isMobile = useMedia(mobileMediaQuery);

const props = defineProps<{
  value: string[];
}>();

const emit = defineEmits(['save']);

const words = ref<string[]>(props.value || []);
const isDropdownOpen = ref(false);
const isSwipeBarOpen = ref(false);

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleChange = (value: string[]) => {
  words.value = value;
};

const handleSave = () => {
  emit('save', words.value);
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
