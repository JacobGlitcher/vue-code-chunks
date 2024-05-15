<template>
  <form class="pt-13 pb-[2.1875rem] -sm:pt-0 -sm:px-[0.875rem] flex flex-col items-start justify-start" @submit.prevent="handleSubmit">
    <h3 class="text-[#D5D5D5] text-lg font-medium mb-3">
      {{ !userIsResetTokenRequested ? 'Forgot password?' : 'Done' }}
    </h3>
    <p class="text-[#787878] font-medium mb-16">
      {{ !userIsResetTokenRequested ? 'Enter the email address you used when you joined and we’ll send you instructions to reset your password. For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.' : 
        'Email link to restore access to your account has been successfully sent. Please check your mailbox.'
      }}
    </p>
    <input
      v-if="!userIsResetTokenRequested"
      class="w-full bg-transparent outline-none text-lg mb-[5.0625rem]"
      placeholder="Enter email address"
      type="email"
      v-model="email"
    >
    <BaseButton v-if="!userIsResetTokenRequested" class="p-[0.625rem] w-full font-medium mb-8" variant="primary" type="submit">
      Send
    </BaseButton>
    <BaseButton v-else class="p-[0.625rem] w-full font-medium mb-8" variant="primary" type="button" @click="handleClose">
      Close
    </BaseButton>
    <span v-if="!userIsResetTokenRequested" class="hover:cursor-pointer font-medium" @click="handleRememberPassword">
      I remember my password
    </span>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Store
import { useUserStore } from '~/store/user';


const userStore = useUserStore();
const { forgotPassword } = userStore;
const { userIsResetTokenRequested } = storeToRefs(userStore);


const email = ref('');

const handleSubmit = async () => {
  await forgotPassword(email.value);
  
};

const handleRememberPassword = () => {
  navigateTo({
    query: {
      auth: 'signin',
    },
  });
};

const handleClose = () => {
  navigateTo({
    query: undefined,
  }); 
};
</script>