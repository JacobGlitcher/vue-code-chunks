<template>
  <header class="border-b-dark-600 border-b-2 fixed w-full">
    <div class="container-fluid">
      <nav class="h-[4.125rem] flex items-center justify-start">
        <div class="px-[0.3125rem] mr-[1.875rem]">
          <NuxtLink href="/">
            <img src="/images/logo.svg" alt="Findr">
          </NuxtLink>
        </div>
        <ul class="flex items-center justify-end h-full">
          <li
            v-for="navLink in navLinks"
            class="text-white-700 hover:text-brand mx-[1.125rem] h-full inline-flex items-center"
            :key="navLink.value"
          >
            <NuxtLink
              class="h-full relative px-[0.75rem] flex items-center after:w-full after:absolute after:left-0 after:bottom-0 after:opacity-0 hover:after:opacity-100 after:h-[0.125rem] hover:after:bg-brand transition-colors after:transition-opacity"
              active-class="text-brand after:bg-brand after:opacity-100"
              :href="navLink.href"
            >
              <Icon class="mr-4" :name="navLink.icon" />
              <span>
                {{ navLink.value }}
              </span>
            </NuxtLink>
          </li>
        </ul>
        <ul class="ml-auto flex items-center justify-end">
          <li>
            <NuxtLink class="p-[0.875rem] hover:cursor-pointer text-[#787878] inline-block" to="/saves">
              <Icon name="save" />
            </NuxtLink>
          </li>
          <li class="mx-4">
            <BaseButton v-if="!userAcessToken" class="py-[0.625rem] px-[1.375rem]" variant="primary" @click="handleLogin">Login</BaseButton>
            <Dropdown
              v-else
              class="w-full"
              placement="bottom-right"
              :is-open="isDropdownOpen"
              @toggle-dropdown="isDropdownOpen = !isDropdownOpen"
            >
              <div class="w-7 h-7 bg-red-400 rounded-full hover:cursor-pointer"></div>
              <template #dropdown>
                <div class="w-[20rem] px-2 py-5 bg-[#202020] rounded-md flex flex-col items-start justify-start">
                  <span class="pl-4 text-white-700 text-[0.9375rem] font-medium mb-[1.875rem]">
                    customer@gmail.com
                  </span>
                  <ul class="w-full">
                    <li class="hover:bg-dark-700 hover:cursor-pointer py-3 px-5 rounded-md mb-1" @click="handleSettingsClick">
                      Settings
                    </li>
                    <li class="hover:bg-dark-700 hover:cursor-pointer py-3 px-5 rounded-md">
                      Logout
                    </li>
                  </ul>
                </div>
              </template>
            </Dropdown>
          </li>
          <li class="p-[0.875rem] hover:cursor-pointer text-[#787878]">
            <Icon name="switch-square" />
          </li>
        </ul>
      </nav>
    </div>
    <AuthModals
      v-if="!isMobile"
      :auth-state="authState"
      @close="handleCloseAuthModal"
    />
    <ProfileModals
      v-if="!isMobile"
      :profile-state="profileState"
      @close="handleCloseProfileModal"
      @change-password-click="handleChangePasswordClick"
    />
  </header>
  
</template>

<script setup lang="ts">
// Components
import AuthModals from '../pages/auth/AuthModals.vue';
import ProfileModals from '../pages/auth/ProfileModals.vue';

// Constants
import { navLinks, mobileMediaQuery } from '~/constants';


const isMobile = useMedia(mobileMediaQuery);

const {
  authState,
  profileState,
  userAcessToken,
  handleChangePasswordClick,
  handleCloseAuthModal,
  handleCloseProfileModal,
  handleLogin,
  handleSettingsClick,
} = useAuth();

const isDropdownOpen = ref(false);
</script>
