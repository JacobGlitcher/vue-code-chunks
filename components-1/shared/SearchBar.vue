<template>
  <form class="py-[1.75rem] px-6 -sm:px-4 flex" @submit.prevent="$emit('search-submit', value)">
    <BaseInput
      class="flex-1"
      :class="{'mr-[0.625rem]': additionalOptions}"
      v-model="value"
      :addon-button="addonButton"
      :is-loading="isLoading"
    />
    <div v-if="additionalOptions" class="mr-[0.625rem]">
      <Dropdown v-if="!isMobile" class="h-full" placement="bottom-right" @toggle-dropdown="handleToggleDropdown" :is-open="isDropdownOpen">
        <BaseButton class="px-[1.25rem] -sm:px-[0.875rem] text-white-900 inline-flex items-center justify-center h-full" type="button" variant="secondary">
          <div class="py-[0.3125rem] px-[0.1875rem]">
            <Icon :name="additionalOption.icon || 'filter'" />
          </div>
        </BaseButton>
        <template #dropdown>
          <div class="bg-dark-600 px-[0.375rem] pt-7 pb-6 rounded-lg mt-2">
            <h4 class="pl-[1.125rem] mb-[1.9375rem] text-[0.9375rem] font-medium">{{ additionalOption.label }}</h4>
            <CheckGroup
              class="w-[450px]"
              :list="additionalOption.list"
              :value="checkedItems"
              with-cancel-button
              @save="handleSave"
              @cancel="handleCancel"
            />
          </div>
        </template>
      </Dropdown>
      <BaseButton
        v-else
        class="px-[1.25rem] -sm:px-[0.875rem] text-white-900 inline-flex items-center justify-center h-full"
        type="button"
        variant="secondary"
        @click="handleOpenSwipeBar"
      >
        <div class="py-[0.3125rem] px-[0.1875rem]">
          <Icon :name="additionalOption.icon || 'filter'" />
        </div>
      </BaseButton>
    </div>
    <BaseButton v-if="additionalOptions" class="px-[1.25rem] -sm:p-[0.813rem]" type="button" variant="secondary">
      Save
    </BaseButton>
    <SwipeBar
      :is-open="isSwipeBarOpen"
      :label="additionalOption.label"
      @close="handleCloseSwipeBar"
    >
      <CheckGroup
        :list="additionalOption.list"
        :value="checkedItems"
        with-cancel-button
        @save="handleSave"
        @cancel="handleCancel"
      />
    </SwipeBar>
  </form>
</template>

<script setup lang="ts">
// Components
import CheckGroup from '~/components-2-1/shared/CheckGroup.vue';

// Constants
import { mobileMediaQuery } from '~/constants';

// Types
import { IAdditionalOption } from '~/types';


const isMobile = useMedia(mobileMediaQuery);

defineProps<{
  additionalOptions: boolean;
  additionalOption: IAdditionalOption;
  isLoading?: boolean;
}>();

defineEmits(['search-submit']);

const value = ref('');
const checkedItems = ref<string[]>([]);
const isDropdownOpen = ref(false);
const isSwipeBarOpen = ref(false);

const handleToggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleCancel = () => {
  isDropdownOpen.value = false;

  if (isMobile?.value && isSwipeBarOpen.value) {
    isSwipeBarOpen.value = false;
  }
};

const handleSave = (value: string[]) => {
  checkedItems.value = value;
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

const addonButton = {
  label: 'Search',
  type: 'submit',
  icon: 'search2',
};
</script>
