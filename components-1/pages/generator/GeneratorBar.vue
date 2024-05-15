<template>
  <div
    v-if="!isMobile"
    :class="{'flex-row px-6 py-7': additionalOptions, 'flex-col items-center justify-start': !additionalOptions}"
    class="flex w-full"
  >
    <div class="flex w-full items-center justify-center -sm:flex-col " :class="{'flex-1': additionalOptions}">
      <GeneratorFilter
        class="mr-4 -sm:max-w-none -sm:mr-0 -sm:mb-[0.125rem]"
        :class="{'w-full max-w-[11.25rem]': !additionalOptions, 'w-1/5': additionalOptions }"
        v-for="generatorFilter in generatorFilters"
        :label="generatorFilter.label"
        :size="additionalOptions ? 'small' : 'large'"
      >
        <component
          :is="generatorFilter.component"
          :value="filtersState[generatorFilter.key]"
          @save="(val: string | string[]) => filtersState[generatorFilter.key] = val"
        ></component>
      </GeneratorFilter>
    </div>
    <div v-if="additionalOptions">
      <BaseButton class="h-full px-[1.1875rem] mr-[0.625rem] font-medium" variant="secondary">
        Save
      </BaseButton>
      <BaseButton class="h-full px-[1.3125rem] font-medium" variant="secondary" @click="$emit('generate-submit', filtersState)">
        Generate
      </BaseButton>
    </div>
    <BaseButton v-else variant="primary" class="mt-[4.1875rem] py-[1.0625rem] max-w-[24.5625rem] w-full font-semibold" @click="$emit('generate-submit', filtersState)">
      Generate
    </BaseButton>
  </div>
  <div
    v-else
    :class="{'flex-row px-6 py-7': additionalOptions, 'flex-col items-center justify-start': !additionalOptions}"
    class="flex w-full"
    v-show="!isLoading"
  >
    <div v-if="!additionalOptions" class="flex w-full items-center justify-center -sm:flex-col " :class="{'flex-1': additionalOptions}">
      <GeneratorFilter
        class="mr-4 -sm:max-w-none -sm:mr-0 -sm:mb-[0.125rem]"
        :class="{'w-full max-w-[11.25rem]': !additionalOptions, 'w-1/5': additionalOptions }"
        v-for="generatorFilter in generatorFilters"
        :label="generatorFilter.label"
        :size="additionalOptions ? 'small' : 'large'"
      >
        <component :is="generatorFilter.component" :value="filtersState[generatorFilter.key]" @save="(val: string | string[]) => filtersState[generatorFilter.key] = val"></component>
      </GeneratorFilter>
    </div>
    <BaseButton v-else class="flex items-center justify-center flex-1 mr-2" variant="secondary" @click="handleOpenSwipeBar">
      <Icon class="mr-2" name="filter" />
      <span>Filters (6)</span>
    </BaseButton>
    <div :class="{'w-full mt-7': !additionalOptions}">
      <BaseButton
        class="p-3 font-semibold w-full"
        :variant="additionalOptions ? 'secondary' : 'primary'"
        key="mobile-btn"
        @click="$emit('generate-submit', filtersState)"
      >
        {{ !additionalOptions ? 'Generate' : 'Save' }}
      </BaseButton>
    </div>
    <SwipeBar
      :is-open="isSwipeBarOpen"
      label="Filters"
      @close="handleCloseSwipeBar"
    >
      <div class="flex w-full items-center justify-center -sm:flex-col " :class="{'flex-1': additionalOptions}">
        <GeneratorFilter
          class="mr-4 -sm:max-w-none -sm:mr-0 -sm:mb-[0.125rem] w-full"
          :class="{'w-full max-w-[11.25rem]': !additionalOptions, 'w-1/5': additionalOptions }"
          v-for="generatorFilter in generatorFilters"
          :label="generatorFilter.label"
          :size="additionalOptions ? 'small' : 'large'"
        >
          <component
            :is="generatorFilter.component"
            :value="filtersState[generatorFilter.key]"
            @save="(val: string | string[]) => filtersState[generatorFilter.key] = val"
          ></component>
        </GeneratorFilter>
      </div>
    </SwipeBar>
  </div>
</template>

<script setup lang="ts">
// Components
import GeneratorFilter from './GeneratorFilter.vue';

// Constants
import { generatorFilters, mobileMediaQuery } from '~/constants';

// Types
import { IFiltersState } from '~/types';


const isMobile = useMedia(mobileMediaQuery);

defineProps({
  additionalOptions: {
    type: Boolean,
    default: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['generate-submit']);

const filtersState = reactive<IFiltersState>({
  containWords: [],
  containLetters: [],
  domainLength: {
    min: 3,
    max: 5,
  },
  startLetter: 'startLetter ',
  endLetter: 'endLetter ',
  TLD: {},
});
const isSwipeBarOpen = ref(false);

const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>