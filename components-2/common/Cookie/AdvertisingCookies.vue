<template>
  <div class="w-full pt-[0.313rem] md:pt-[0.625rem]">
    <div class="md:float-auto float-right md:w-full h-[2.625rem] md:h-[2rem] flex items-center pb-[0.5rem] md:pr-[0.625rem] md:pt-0 md:pl-0 pt-[0.625rem] pl-[0.625rem] pr-[2rem]">
      <h4 class="text-[0.766rem] leading-[0.995rem] font-bold px-[0.625rem] md:inline-block hidden">
        Advertising Cookies
      </h4>

      <Switch
        v-model="advertisingCookies"
        class="mx-[0.438rem] md:ml-auto md:mr-[0.438rem]"
      />
    </div>

    <p class="tracking-[0.3px] px-[1.375rem] md:px-[0.625rem] text-[0.711rem] text-black font-normal leading-[1.067rem]">
      These cookies are used to deliver advertising messages more relevant to you, including on third party platforms such as Google, Facebook and Instagram. They perform functions like: preventing the same advertisement from continuously reappearing; identifying whether you purchase products on our Site after viewing our advertisements; and displaying advertisements that are based on your interests. We may also use data derived and collected from tools on our Site in order to support and enhance how we personalise our services for you.
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

const advertisingCookies = ref<boolean>(props.value.advertising);

watch(advertisingCookies, (value) => {
  emit('change', {
    name: 'advertising',
    value,
  });
});
</script>
