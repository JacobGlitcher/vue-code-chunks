<template>
  <footer
    class="relative z-advanced-component max-w-xl mx-auto w-full border-t-[#EBEBEB] border-t-[0.063rem] bg-white flex flex-col"
  >
    <div
      class="pt-[2rem] pb-[2rem] lg:pb-[4rem] px-[1rem] sm:px-[0.875rem] xga:px-[1.5rem] flex lg:flex-row flex-col items-start justify-center"
    >
      <div
        class="w-full lg:w-[25%] flex flex-col items-start sm:px-[0.875rem] xga:px-[1.125rem] full-hd:!px-[1.25rem] lg:pb-0 pb-[2rem]"
      >
        <!-- <span class="text-black text-sm tracking-[0.1px] font-medium leading-[1rem] py-[0.75rem] mb-[0.25rem]">
          Sign up
        </span>

        <p class="w-full mb-[1rem] text-sm font-light leading-[1.1rem] text-[#3C3C3C]">
          Sign up below for updated about the world of
          SHOPLINKS, including collection laynches and early
          access to limited-edition products and
          collaborations.
        </p>

        <FooterEmail /> -->
      </div>

      <ul
        class="sm:px-[0.875rem] xga:px-[1.125rem] full-hd:!px-[1.25rem] w-[100%] lg:w-[25%] flex flex-col"
      >
        <li class="flex py-[0.75rem] mb-[0.25rem]">
          <span class="text-sm text-black leading-[1rem]"> Legal </span>
        </li>

        <li class="flex py-[0.75rem]">
          <NuxtLink
            :to="{ path: '/cookie-policy', query: route.query }"
            class="text-sm text-black font-light leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            Cookie
          </NuxtLink>
        </li>

        <li class="flex py-[0.75rem]">
          <NuxtLink
            :to="{ path: '/privacy-policy', query: route.query }"
            class="text-sm text-black font-light leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            Privacy Policy
          </NuxtLink>
        </li>
      </ul>

      <ul
        class="sm:px-[0.875rem] xga:px-[1.125rem] full-hd:!px-[1.25rem] w-[100%] lg:w-[25%] flex flex-col"
      >
        <li class="flex py-[0.75rem] mb-[0.25rem]">
          <span class="text-sm text-black leading-[1rem]"> Company </span>
        </li>

        <li class="flex py-[0.75rem] mb-[0.25rem]">
          <NuxtLink
            :to="{ path: '/about-us', query: route.query }"
            class="text-sm text-black font-light leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            About us
          </NuxtLink>
        </li>

        <li class="flex py-[0.75rem] mb-[0.25rem]">
          <NuxtLink
            :to="{ path: '/privacy-policy', query: route.query }"
            class="text-sm text-black font-light leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            Imprint
          </NuxtLink>
        </li>

        <li class="flex py-[0.75rem]">
          <a
            href="mailto:support@shoplinks.com"
            class="text-sm text-black underline leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
          >
            support@shoplinks.com
          </a>
        </li>
      </ul>

      <div
        class="sm:px-[0.875rem] xga:px-[1.125rem] full-hd:!px-[1.25rem] w-[100%] lg:w-fit flex flex-col gap-y-[1.75rem]"
      >
        <div class="gap-y-[0.75rem] py-[0.75rem] flex flex-col">
          <button
            class="flex text-sm text-black leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
            @click="handleLanguageClick"
          >
            Language
          </button>

          <button
            v-for="language in languagesFooter"
            :key="language.name"
            class="flex text-sm font-light text-[#404040] leading-[1rem] hover:text-[#999] transition-colors duration-[160] ease-in-out"
            @click="handleLanguageClick"
          >
            {{ language.name }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-full flex items-center justify-center px-[1rem] sm:px-[1.75rem] lg:px-[0.875rem] pt-[1rem] pb-[2rem] border-t-[#ccc] border-t-[0.063rem]"
    >
      <p
        class="test-div2 text-[0.625rem] full-hd:text-sm font-light text-gray-800 w-full lg:w-[calc(75%+3.4rem)] xga:w-[calc(75%+2.5rem)] leading-[1rem]"
      >
        If you having problems using this website, please contact us for
        assistance. Automated Links, SP.Z o. o. , Address: ul. Zlota 75A/7,
        00-819 Warszawa, Polen Registred in Poland, Registred Company Number:
        0000201
        {{ new Date().getFullYear() }} handcrafted by Automated Links, SP. Z o.
        o.
      </p>
    </div>

    <LanguageModal />
  </footer>
</template>

<script setup lang="ts">
// Components
import FooterEmail from "~/components-2/common/Footer/FooterEmail.vue";
import LanguageModal from "~/components-2/common/Footer/LanguageModal.vue";

// Constants
import { languagesFooter } from "~/constants";

const route = useRoute();

function handleLanguageClick() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      language: "",
    },
  });
}
</script>
