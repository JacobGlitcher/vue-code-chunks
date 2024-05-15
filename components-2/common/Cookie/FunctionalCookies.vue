<template>
  <div class="w-full pt-[0.313rem] md:pt-[0.625rem]">
    <div class="md:float-auto float-right md:w-full h-[2.625rem] md:h-[2rem] flex items-center pb-[0.5rem] md:pr-[0.625rem] md:pt-0 md:pl-0 pt-[0.625rem] pl-[0.625rem] pr-[2rem]">
      <h4 class="text-[0.766rem] leading-[0.995rem] font-bold px-[0.625rem] md:inline-block hidden">
        Functional Cookies
      </h4>

      <Switch
        v-model="functionalCookies"
        class="mx-[0.438rem] md:ml-auto md:mr-[0.438rem]"
      />
    </div>

    <p class="tracking-[0.3px] px-[1.375rem] md:px-[0.625rem] text-[0.711rem] text-black font-normal leading-[1.067rem]">
      These cookies enable us to provide enhanced functionality and personalisation for you. They may be set by us or by third party providers whose services we have added to our Site. They perform functions like: recommending similar products for you based on the products added to your online shopping bag; recommending sizing of products for you based on measurements you have provided; and allowing you to begin a live chat session with one of our customer services representatives and/or in-store sales associates.
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

const functionalCookies = ref<boolean>(props.value.functional);

watch(functionalCookies, (value) => {
  emit('change', {
    name: 'functional',
    value,
  });
});
</script>
