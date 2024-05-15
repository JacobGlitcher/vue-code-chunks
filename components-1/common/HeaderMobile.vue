<template>
  <header class="fixed top-0 left-0 w-full -sm:block hidden bg-dark-500">
    <div class="container-fluid">
      <nav class="h-12 flex items-center justify-between">
        <div class="px-[0.3125rem] mr-[1.875rem]">
          <NuxtLink href="/">
            <img src="/images/logo.svg" alt="Findr">
          </NuxtLink>
        </div>
        <ul>
          <li class="nav-action-btn text-[#787878]">
            <NuxtLink to="/saves">
              <Icon name="save" />
            </NuxtLink>
          </li>
          <li class="nav-action-btn text-[#787878]">
            <Icon name="switch-square" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <footer class="fixed w-full bottom-0 left-0 -sm:block hidden bg-dark-500 z-[99]">
    <ul class="px-2 text-[#787878] flex items-center justify-between">
      <li v-for="navLink of navLinks" :key="navLink.href" class="w-1/5">
        <NuxtLink class="footer-nav-item" :to="navLink.href">
          <Icon :name="navLink.icon" />
        </NuxtLink>
      </li>
      <li class="w-1/5">
        <button v-if="!userAcessToken" class="footer-nav-item" @click="handleLogin">
          <Icon name="user" />
        </button>
        <button v-else class="footer-nav-item" @click="handleOpenProfileSwipeBar">
          <div class="w-7 h-7 bg-red-400 rounded-full hover:cursor-pointer"></div>
        </button>
      </li>
    </ul>
  </footer>
  <AuthSwipeBars
    v-if="isMobile"
    :auth-state="authState"
    @close="handleCloseAuthModal"
  />
  <ProfileSwipeBars
    v-if="isMobile"
    :profile-state="profileState"
    @close="handleCloseProfileModal"
    @change-password-click="handleChangePasswordClick"
  />
  <SwipeBar
    v-if="isMobile"
    label="Profile"
    :is-open="isSwipeBarOpen"
    @close="handleCloseProfileSwipeBar"
  >
    <div class="px-[0.875rem] py-5 rounded-md flex flex-col items-start justify-start w-full">
      <div class="flex flex-col items-center justify-start w-full">
        <div class="w-7 h-7 bg-red-400 mb-6 rounded-full hover:cursor-pointer"></div>
        <span class="text-white-700 text-[0.9375rem] font-medium mb-[1.875rem]">
          customer@gmail.com
        </span>
      </div>

      <ul class="w-full">
        <li class="hover:bg-dark-800 hover:cursor-pointer py-[0.625rem] px-3 rounded-md mb-1 w-full" @click="handleSettingsClick">
          Settings
        </li>
        <li class="hover:bg-dark-800 hover:cursor-pointer py-[0.625rem] px-3 rounded-md w-full">
          Logout
        </li>
      </ul>
    </div>
  </SwipeBar>
</template>

<script setup lang="ts">
// Components
import AuthSwipeBars from '../pages/auth/mobile/AuthSwipeBars.vue';
import ProfileSwipeBars from '../pages/auth/mobile/ProfileSwipeBars.vue';

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

// const isLoggedIn = ref(true);
const isSwipeBarOpen = ref(false);

const handleOpenProfileSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseProfileSwipeBar = () => {
  isSwipeBarOpen.value = false;
};
</script>