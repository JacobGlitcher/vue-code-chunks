<template>
  <Teleport to="body">
    <Transition name="fade-translate-down-content">
      <BaseModal
        v-if="!cookiesAccepted"
        :max-width="isPreferences ? 'max-w-[45.625rem]' : 'max-w-[40.625rem]'"
        padding="p-0"
        backdrop="!bg-modal-backdrop-dark"
        :content-class="`${isPreferences ? 'md:my-[2rem] md:mx-[0.563rem] h-screen md:h-fit' : 'my-[2rem] mx-[0.563rem]'}`"
      >
        <div v-if="!isPreferences" class="flex flex-col px-[1.375rem] sm:px-[1.875rem] pt-[2.5rem] pb-[1.563rem]">
          <p class="tracking-[0.5px] mb-[0.625rem] text-lg font-light text-black-lighter">
            We use cookies and similar technologies to improve and personalise your user experience, deliver adverts relevant to your interests on third party platforms and analyse our web traffic.
          </p>

          <p class="tracking-[0.5px] mb-[0.625rem] text-lg font-light text-black-lighter">
            By clicking on ‘accept all’, you consent to us using cookies and similar technologies for these reasons and to the sharing of your data with our partners. Alternatively, you can choose which types of cookies you would like to accept or disable by clicking ‘let me choose’ below (you can change your mind at any time).
          </p>

          <p class="tracking-[0.5px] mb-[1.563rem] text-lg font-light text-black-lighter">
            For more information on how we use cookies, please see our <a href="/privacy-policy" target="_blank" class="underline font-bold">Privacy Policy</a> and <a href="/cookie-policy" target="_blank" class="underline font-bold">Cookie Policy</a>.
          </p>

          <div class="w-full flex items-center justify-center sm:flex-row flex-col-reverse gap-y-[0.625rem] gap-x-[0.75rem]">
            <button
              class="sm:w-fit w-full border-[0.063rem] border-black min-w-[8.438rem] px-[1.5rem] py-[0.75rem] tracking-[0.6px] leading-[1.05rem] text-sm font-suisse font-semibold text-black opacity-100 hover:opacity-70 transition-opacity duration-[160] ease-in-out"
              @click="handleChoose"
            >
              LET ME CHOOSE
            </button>

            <button
              class="sm:w-fit w-full bg-black border-[0.063rem] border-black min-w-[8.438rem] px-[1.5rem] py-[0.75rem] tracking-[0.6px] leading-[1.05rem] text-sm font-suisse font-semibold text-white opacity-100 hover:opacity-70 transition-opacity duration-[160] ease-in-out"
              @click="handleAccept"
            >
              ACCEPT ALL COOKIES
            </button>
          </div>
        </div>
        <CookiePreferences
          v-else
          @close="handleClose"
          @close-preferences="handleClosePreferences"
        />
      </BaseModal>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// Components
import CookiePreferences from '~/components-2/common/Cookie/CookiePreferences.vue';

// Constants
import { cookiesAcceptedKey, cookieSettingsKey } from '~/constants';

// Types
import { ICookieSettings } from '~/types';

const route = useRoute();

const cookiesAccepted = ref<boolean>(true);
const isPreferences = ref<boolean>(false);

onMounted(() => {
  setTimeout(() => {
    const cookiesAcceptedLocal = localStorage.getItem(cookiesAcceptedKey);

    cookiesAccepted.value = cookiesAcceptedLocal === 'true';
  }, 3000);
});

function handleChoose() {
  isPreferences.value = true;
}

function handleAccept() {
  localStorage.setItem(cookieSettingsKey, JSON.stringify({
    functional: true,
    analytics: true,
    advertising: true,
  } as ICookieSettings));

  handleClose();
}

function handleClose() {
  localStorage.setItem(cookiesAcceptedKey, 'true');

  cookiesAccepted.value = true;
}

function handleClosePreferences() {
  isPreferences.value = false;
}
</script>
