<template>
  <div class="w-full h-full flex flex-col items-start">
    <div class="relative w-full p-[0.625rem] min-h-[3.25rem] flex items-center border-b-[#d8d8d8] border-b-[0.063rem]">
      <h2 class="w-fit md:w-[11.25rem] h-[2.5rem] flex items-center text-lg font-medium text-black">
        SHOPLINKS
      </h2>

      <h3 class="max-w-[60%] tracking-[0.7px] text-black text-[1.199rem] leading-[1.438rem] font-normal ml-[0.625rem] text-ellipsis whitespace-nowrap overflow-hidden">
        YOUR COOKIE PREFERENCES
      </h3>

      <button
        aria-label="Close"
        class="absolute right-[1rem]"
        @click="handleClosePreferences"
      >
        <Icon
          name="close"
          class="w-[1.25rem] h-[1.25rem] stroke-black"
        />
      </button>
    </div>

    <div v-if="!isSmallTablet" class="w-full flex flex-row">
      <CookiePreferencesTabs
        :activeTab="activeTab"
        @change="handleChangeTab($event)"
      />

      <div class="w-full md:w-[65.3333333333%] pt-[1.25rem] ml-[1.368rem] flex items-start min-h-[60vh]">
        <Transition name="fade-translate-down" mode="out-in">
          <YourPrivacy v-if="activeTab === 0" />
          <EssentialCookies v-else-if="activeTab === 1" />
          <FunctionalCookies v-else-if="activeTab === 2" :value="cookieOptions" @change="handleChangeOption" />
          <AnalyticsCookies v-else-if="activeTab === 3" :value="cookieOptions" @change="handleChangeOption" />
          <AdvertisingCookies v-else-if="activeTab === 4" :value="cookieOptions" @change="handleChangeOption" />
        </Transition>
      </div>
    </div>
    <div v-else class="w-full flex flex-col max-h-[calc(100vh-15.125rem)] overflow-y-auto scroll">
      <CookiePreferencesTabsMobile
        :value="cookieOptions"
        @change="handleChangeOption"
      />
    </div>

    <div class="md:mt-0 mt-auto w-full p-[0.938rem] md:py-[1.25rem] md:px-[1rem] border-t-[#d8d8d8] border-t-[0.063rem] flex items-center md:flex-row flex-col">
      <button
        class="md:w-fit w-full bg-black border-[0.063rem] border-black h-[2.5rem] px-[1.5rem] tracking-[0.6px] leading-[1.05rem] text-sm font-suisse font-semibold text-white opacity-100 hover:opacity-70 transition-opacity duration-[160] ease-in-out text-center"
        @click="handleSavePreferences"
      >
        SAVE PREFERENCES
      </button>

      <div class="md:w-fit w-full ml-auto md:flex-row flex flex-col">
        <button
          class="md:my-0 my-[0.938rem] md:w-fit w-full md:mr-[1rem] bg-black border-[0.063rem] border-black h-[2.5rem] px-[1.5rem] tracking-[0.6px] leading-[1.05rem] text-sm font-suisse font-semibold text-white opacity-100 hover:opacity-70 transition-opacity duration-[160] ease-in-out text-center"
          @click="handleRejectAll"
        >
          REJECT ALL
        </button>

        <button
          class="md:w-fit w-full bg-black border-[0.063rem] border-black h-[2.5rem] px-[1.5rem] tracking-[0.6px] leading-[1.05rem] text-sm font-suisse font-semibold text-white opacity-100 hover:opacity-70 transition-opacity duration-[160] ease-in-out text-center"
          @click="handleAcceptAll"
        >
          ACCEPT ALL
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import CookiePreferencesTabs from '~/components-2/common/Cookie/CookiePreferencesTabs.vue';
import CookiePreferencesTabsMobile from '~/components-2/common/Cookie/CookiePreferencesTabsMobile.vue';
import YourPrivacy from '~/components-2/common/Cookie/YourPrivacy.vue';
import EssentialCookies from '~/components-2/common/Cookie/EssentialCookies.vue';
import FunctionalCookies from '~/components-2/common/Cookie/FunctionalCookies.vue';
import AnalyticsCookies from '~/components-2/common/Cookie/AnalyticsCookies.vue';
import AdvertisingCookies from '~/components-2/common/Cookie/AdvertisingCookies.vue';

// Constants
import { cookieSettingsKey, smallTabletMediaQuery } from '~/constants';

// Types
import { ICookieSettings } from '~/types';

const emit = defineEmits(['close', 'closePreferences']);

const isSmallTablet = useMedia(smallTabletMediaQuery);

const activeTab = ref<number>(0);

const cookieOptions = reactive<ICookieSettings>({
  functional: false,
  analytics: false,
  advertising: false,
});

function handleChangeTab(index: number) {
  activeTab.value = index;
}

function handleSavePreferences() {
  localStorage.setItem(cookieSettingsKey, JSON.stringify(cookieOptions));

  handleClose();
}

function handleRejectAll() {
  localStorage.setItem(cookieSettingsKey, JSON.stringify({
    functional: false,
    analytics: false,
    advertising: false,
  } as ICookieSettings));

  handleClose();
}

function handleAcceptAll() {
  localStorage.setItem(cookieSettingsKey, JSON.stringify({
    functional: true,
    analytics: true,
    advertising: true,
  } as ICookieSettings));

  handleClose();
}

function handleChangeOption(options: { name: keyof ICookieSettings, value: boolean }) {
  cookieOptions[options.name] = options.value;
}

function handleClose() {
  emit('close');
}

function handleClosePreferences() {
  emit('closePreferences');
}
</script>
