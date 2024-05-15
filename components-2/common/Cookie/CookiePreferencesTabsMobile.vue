<template>
  <Accordion
    v-for="(tab, index) in cookiePreferencesTabs"
    :key="tab.name"
    :id="tab.name"
    :open="index === activeTab"
    :class="{ '!border-t-0': index === 0 }"
    :button-class="`bg-[#F4F4F4] border-b-[#d7d7d7] border-b-[0.063rem] p-[0.75rem] border-l-[0.625rem] border-l-transparent w-full items-center ${index === activeTab ? 'bg-white border-l-black border-b-transparent' : ''}`"
    class="w-full border-t-[#ECECEC] border-t-[0.063rem]"
    icon-class="hidden"
    @toggle="handleSelect(index)"
  >
    <span class="text-[0.766rem] text-left font-semibold font-suisse leading-[1.072rem]">
      {{ tab.name }}
    </span>

    <template #content>
      <div class="w-full pb-[0.938rem]">
        <component
          :is="tab.component"
          :value="value"
          @change="handleChangeOption"
        ></component>
      </div>
    </template>
  </Accordion>
</template>

<script setup lang="ts">
// Constants
import { cookiePreferencesTabs } from '~/constants/cookiePreferencesTabs';

// Types
import { ICookieSettings } from '~/types';

const props = defineProps<{
  value: ICookieSettings;
}>();

const emit = defineEmits(['change']);

const activeTab = ref<number>(0);

function handleSelect(index: number) {
  activeTab.value = index;
}

function handleChangeOption(value: { name: keyof ICookieSettings, value: boolean }) {
  emit('change', value);
}
</script>
