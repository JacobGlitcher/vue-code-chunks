<template>
  <Modal
    :is-open="!!authState"
    content-class-name="bg-[#202020] px-[1.625rem] rounded-md"
    @close="handleCloseAuthModal"
  >
    <template #header>
      <div class="pt-[1.625rem] flex items-center justify-start">
        <div class="mr-[0.875rem]">
          <img src="/images/logo-secondary.svg" alt="Findr">
        </div>
        <h1 class="text-white-700 text-lg font-medium">Findr</h1>
      </div>
    </template>
    <LoginModal v-if="authState === 'login'" />
    <SignInModal v-if="authState === 'signin'" />
    <SignUpModal v-if="authState === 'signup'" />
    <ForgotPassword v-if="authState === 'forgotpassword'" />
  </Modal>
</template>

<script setup lang="ts">
// Components
import Modal from '~/components-2-1/shared/Modal.vue';
import LoginModal from './LoginModal.vue';
import SignInModal from './SignInModal.vue';
import SignUpModal from './SignUpModal.vue';
import ForgotPassword from './ForgotPassword.vue';


defineProps<{
  authState?: string;
  isOpen?: boolean;
}>();

const emit = defineEmits(['close']);

const handleCloseAuthModal = () => {
  emit('close');
};
</script>
