<template>
  <Teleport to="body">
    <Transition name="fade-translate-down-content">
      <BaseModal v-if="isOpen" max-width="max-w-[45.625rem]" padding="p-0" backdrop="!bg-modal-backdrop-dark"
        :content-class="`sm:inline-block hidden py-[4rem] px-[1.5rem] lg:px-[4rem] m-[1.5rem] max-w-[calc(100%-10.375rem)]`"
        @close="handleClose">
        <button class="absolute top-[1rem] right-[1rem]" aria-label="Close" @click="handleClose">
          <Icon name="close" class="stroke-black w-[1rem] h-[1rem]" />
        </button>

        <AuthModalMain v-if="authPage === 'main'" @forgot-password="handleForgotPassword" @sign-up="handleSignUp" />
        <AuthModalForgotPassword v-else-if="authPage === 'forgotPassword'" />
        <AuthModalSignUp v-else-if="authPage === 'signUp'" />
        <AuthModalResetPassword v-else-if="authPage === 'resetPassword'" />
      </BaseModal>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router';

// Components
import AuthModalMain from '~/components-2/common/Auth/AuthModal/AuthModalMain.vue';
import AuthModalForgotPassword from '~/components-2/common/Auth/AuthModal/AuthModalForgotPassword.vue';
import AuthModalResetPassword from '~/components-2/common/Auth/AuthModal/AuthModalResetPassword.vue';
import AuthModalSignUp from '~/components-2/common/Auth/AuthModal/AuthModalSignUp.vue';

const route = useRoute();

const authPage = ref<string>('main');

const isOpen = computed<boolean>(() => {
  return typeof route.query.auth === 'string';
});

onMounted(() => {
  checkAuthPage(route);
});

watch(route, checkAuthPage);

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
    },
  });

  setTimeout(() => {
    authPage.value = 'main';
  }, 0);
}

function handleForgotPassword() {
  authPage.value = 'forgotPassword';
}

function handleSignUp() {
  authPage.value = 'signUp';
}

function checkAuthPage(value: RouteLocationNormalized) {
  const auth = value.query.auth;

  if (typeof auth === 'string') {
    if (auth === 'signIn') {
      authPage.value = 'main';
    } else if (auth === 'signUp') {
      authPage.value = 'signUp';
    } else if (auth === 'forgotPassword') {
      authPage.value = 'forgotPassword';
    } else if (auth === 'resetPassword') {
      authPage.value = 'resetPassword';
    }
  }
}
</script>
