<template>
  <Dropdown
    v-if="!isMobile"
    class="w-full"
    :is-open="isDropdownOpen"
    placement="center-right"
    dropdown-wrapper-class-name="right-[calc(100%+1.96875rem)]"
    @toggle-dropdown="handleToggleDropdown"
  >
    <FilterSeclectPlaceholder class="w-full" :label="allSelectedTLDsLength ? `${allSelectedTLDsLength} TLD` : 'Selected TLD'" />
    <template #dropdown>
      <div class="w-[30.25rem] bg-dark-600 rounded-lg pt-7 pr-[0.625rem] pb-6 pl-[0.6875rem] flex flex-col items-start justify-start">
        <div class="text-[0.9375rem] pl-4 text-white-900 mb-8">
          <h3 v-if="!selectedCategory">TLD Category</h3>
          <BaseButton v-else class="inline-flex items-center justify-start" @click="handleGoBack">
            <span class="px-[0.1875rem] py-1 mr-5">
              <Icon name="arrow-right" class="rotate-180" />
            </span>
            <span>
              All categories
            </span>
          </BaseButton>
        </div>
        <div v-if="!selectedCategory" class="w-full flex flex-col items-start justify-start">
          <SelectList class="w-full mb-[0.3125rem]" :value="selectedCategory" :list="categories" @change="handleChange" />
          <BaseButton class="py-[0.625rem] px-[1.375rem] self-end" variant="primary" @click="handleSave">
            Save
          </BaseButton>
        </div>
        <div v-else class="w-full">
          <CheckGroup class="w-full" :value="allSelectedTLDs[selectedCategory]" :list="categoryItems[selectedCategory]" @save="handleSaveCheckGroup" />
        </div>
      </div>
    </template>
  </Dropdown>
  <div v-else class="w-full">
    <FilterSeclectPlaceholder class="w-full" :label="allSelectedTLDsLength ? `${allSelectedTLDsLength} TLD` : 'Selected TLD'" @click="handleOpenSwipeBar" />
    <SwipeBar
      label="TLD Category"
      :is-open="isSwipeBarOpen"
      @close="handleCloseSwipeBar"
    >
      <div class="bg-dark-600 rounded-lg px-3 flex flex-col items-start justify-start">
        <div class="text-[0.9375rem] pl-4 text-white-900 mb-8">
          <BaseButton v-if="selectedCategory" class="inline-flex items-center justify-start" @click="handleGoBack">
            <span class="px-[0.1875rem] py-1 mr-5">
              <Icon name="arrow-right" class="rotate-180" />
            </span>
            <span>
              All categories
            </span>
          </BaseButton>
        </div>
        <div v-if="!selectedCategory" class="w-full flex flex-col items-start justify-start">
          <SelectList class="w-full mb-[0.3125rem]" :value="selectedCategory" :list="categories" @change="handleChange" />
          <BaseButton class="py-[0.625rem] px-[1.375rem] w-full" variant="primary" @click="handleSave">
            Save
          </BaseButton>
        </div>
        <div v-else class="w-full">
          <CheckGroup class="w-full" :value="allSelectedTLDs[selectedCategory]" :list="categoryItems[selectedCategory]" @save="handleSaveCheckGroup" />
        </div>
      </div>
    </SwipeBar>
  </div>
</template>

<script setup lang="ts">
// Components
import FilterSeclectPlaceholder from './FilterSeclectPlaceholder.vue';
import SelectList from '~/components-2-1/shared/SelectList.vue';
import CheckGroup from '~/components-2-1/shared/CheckGroup.vue';

// Constants
import { mobileMediaQuery } from '~/constants/global';


const isMobile = useMedia(mobileMediaQuery);

const props = defineProps<{
  value: {[key: string]: string[]};
}>();

const emit = defineEmits(['save']);

const selectedCategory = ref<string | null>(null);
const selectedTLDs = ref<string[]>();
const isDropdownOpen = ref(false);
const isSwipeBarOpen = ref(false);

// const allSelectedTLDs = reactive<{[key: string]: string[]}>({
//   all: [],
// });
const allSelectedTLDs = reactive<{[key: string]: string[]}>(props.value || {});

const allSelectedTLDsLength = computed(() => {
  return Object.values(allSelectedTLDs).reduce((acc, allSelectedTLDsList) => {
    return acc + allSelectedTLDsList.length;
  }, 0);
});


const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleChange = (category: string) => {
  selectedCategory.value = category;
};

const handleSaveCheckGroup = (value: string[]) => {
  if (!selectedCategory.value) {
    return;
  }

  allSelectedTLDs[selectedCategory.value] = value;
  isDropdownOpen.value = false;
  selectedTLDs.value = [];
  console.log(allSelectedTLDs);

  if (isMobile?.value && isSwipeBarOpen.value) {
    isSwipeBarOpen.value = false;
  }
};

const handleSave = () => {
  console.log(allSelectedTLDs);

  emit('save', allSelectedTLDs);
  isDropdownOpen.value = false;

  if (isMobile?.value && isSwipeBarOpen.value) {
    isSwipeBarOpen.value = false;
  }
};

const handleGoBack = () => {
  selectedCategory.value = null;
};

// Fakde data
const categories = [
  {
    key: 'all',
    value: 'All',
  },
  {
    key: 'goverment',
    value: 'Goverment',
  },
];

const categoryItems: any = {
  all: ['.com', '.am', '.co.uk', '.ta'],
  goverment: ['.gov', '.mit'],
};

const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>
