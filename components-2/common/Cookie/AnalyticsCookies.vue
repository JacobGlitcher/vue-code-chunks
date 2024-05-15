<template>
  <div class="w-full pt-[0.313rem] md:pt-[0.625rem]">
    <div class="md:float-auto float-right md:w-full h-[2.625rem] md:h-[2rem] flex items-center pb-[0.5rem] md:pr-[0.625rem] md:pt-0 md:pl-0 pt-[0.625rem] pl-[0.625rem] pr-[2rem]">
      <h4 class="text-[0.766rem] leading-[0.995rem] font-bold px-[0.625rem] md:inline-block hidden">
        Analytics Cookies
      </h4>

      <Switch
        v-model="analyticsCookies"
        class="mx-[0.438rem] md:ml-auto md:mr-[0.438rem]"
      />
    </div>

    <p class="tracking-[0.3px] px-[1.375rem] md:px-[0.625rem] text-[0.711rem] text-black font-normal leading-[1.067rem]">
      These cookies help us understand how our Site and tools on the Site are being used. They help us: understand how effective advertising and marketing campaigns are; and customise and improve our services and user experience on the Site.
    </p>
  </div>
</template>

<script setup lang="ts">
// Types
import { ICookieSettings } from '~/types';

const props = defineProps<{
  value: ICookieSettings;
}>();

const emit = defineEmits(['change']);

const analyticsCookies = ref<boolean>(props.value.analytics);

watch(analyticsCookies, (value) => {
  emit('change', {
    name: 'analytics',
    value,
  });
});
</script>
