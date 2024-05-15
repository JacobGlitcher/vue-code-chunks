<template>
  <div v-if="addonButton" class="flex -sm:items-center">
    <input
      class="bg-dark-600 text-white-700 rounded-lg rounded-br-none rounded-tr-none outline-none py-[1.188rem] px-[1.438rem] -sm:py-[0.875rem] -sm:px-4 -sm:w-[14.4375rem] flex-1"
      :value="modelValue"
      @input="updateValue"
    />
    <BaseButton
      variant="secondary"
      :type="addonButton.type"
      :class="addonButton.className || 'px-[1.313rem] rounded-tl-none rounded-bl-none text-white-900 -sm:p-4'"
    >
      <Timer v-if="isLoading" />
      <div v-else>
        <span class="-sm:hidden">{{ addonButton.label }}</span>
        <Icon v-if="addonButton.icon" class="hidden -sm:block" :name="addonButton.icon" />
      </div>
    </BaseButton>
  </div>
  <input
    v-else
    class="bg-dark-600 text-white-700 rounded-lg outline-none py-[1.188rem] px-[1.438rem]"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
// Components
import Timer from '~/components-2-1/shared/Timer.vue';

// Types
import { IAddonButton } from '~/types';

const props = defineProps<{
  modelValue: string;
  addonButton?: IAddonButton;
  isLoading?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

</script>
