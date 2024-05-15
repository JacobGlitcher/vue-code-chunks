<template>
  <Drawer :transition="isMobile ? 'fade-translate-down-content' : 'fade-translate-right-content'" :is-open="!!authPage"
    hide-scroll @close="handleCloseAuth">
    <SignIn v-if="authPage === 'signIn'" @close="handleCloseAuth" />
    <SignUp v-else-if="authPage === 'signUp'" />
    <!-- <VerifyEmail v-else-if="authPage === 'verifyEmail'" /> -->
    <ForgotPassword v-else-if="authPage === 'forgotPassword'" />
    <!-- <VerifyForgotPassword v-else-if="authPage === 'verifyForgotPassword'" /> -->
    <ResetPassword v-else-if="authPage === 'resetPassword'" />
  </Drawer>
</template>

<script setup lang="ts">
// Components
import SignIn from '~/components-2/common/Auth/SignIn.vue';
import SignUp from '~/components-2/common/Auth/SignUp.vue';
import VerifyEmail from '~/components-2/common/Auth/VerifyEmail.vue';
import ForgotPassword from '~/components-2/common/Auth/ForgotPassword.vue';
import VerifyForgotPassword from '~/components-2/common/Auth/VerifyForgotPassword.vue';
import ResetPassword from '~/components-2/common/Auth/ResetPassword.vue';

// Constants
import { mobileMediaQuery } from '~/constants';

// Types
import { AuthPageType } from '~/types';

const route = useRoute();

const isMobile = useMedia(mobileMediaQuery);

const authPage = computed<AuthPageType | null>(() => {
  return <AuthPageType>route.query.auth || null;
});

function handleCloseAuth() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
      email: undefined,
      token: undefined,
    },
  });
}
</script>
