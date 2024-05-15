<template>
  <div class="w-full flex lg:flex-row flex-col">
    <AuthModalSignIn
      @forgot-password="handleForgotPassword"
    />

    <div role="separator" class="lg:block hidden bg-[#ccc] w-[0.063rem] mx-[4.25rem] full-hd:!mx-[8.5rem]" />

    <AuthModalSignUpLink
      @sign-up="handleSignUp"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import AuthModalSignIn from '~/components-2/common/Auth/AuthModal/AuthModalSignIn.vue';
import AuthModalSignUpLink from '~/components-2/common/Auth/AuthModal/AuthModalSignUpLink.vue';

const emit = defineEmits(['forgotPassword', 'signUp']);

function handleForgotPassword() {
  emit('forgotPassword');
}

function handleSignUp() {
  emit('signUp');
}
</script>
