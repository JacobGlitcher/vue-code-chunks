<template>
  <form class="pt-13 -sm:pt-0 -sm:px-[0.875rem] pb-[2.1875rem] flex flex-col items-start justify-start" @submit.prevent="handleSubmit">
    <h3 class="text-[#D5D5D5] text-lg font-medium mb-3">Sign in</h3>
    <span class="text-[#787878] font-medium mb-16">
      Enter email address to sign in
    </span>
    <input
      v-if="!isEmailSubmitted"
      class="w-full bg-transparent outline-none text-lg mb-[5.0625rem]"
      placeholder="_@_"
      name="email"
      type="email"
      v-model="signInData.email"
      @blur="v$.email.$touch"
    >
    <input
      v-else
      class="w-full bg-transparent outline-none text-lg mb-[5.0625rem]"
      placeholder="Enter password"
      name="password"
      type="password"
      v-model="signInData.password"
      @blur="v$.password.$touch"
    >
    <BaseButton class="p-[0.625rem] w-full font-medium mb-8" variant="primary" type="submit">
      Sign in
    </BaseButton>
    <span v-if="!isEmailSubmitted" class="hover:cursor-pointer font-medium" @click="handleCreateAccount">
      Create account
    </span>
    <span v-else class="hover:cursor-pointer font-medium" @click="handleForgotPassword">
      Forgot password?
    </span>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';


// Constants
import {
  emailRequiredMessage,
  passwordRequiredMessage,
  minValidationLength,
  minLengthMessage,
} from '~/constants';


const userStore = useUserStore();
const { signIn } = userStore;

const isEmailSubmitted = ref(false);
const signInData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(emailRequiredMessage, required),
      email: true,
    },
    password: {
      required: isEmailSubmitted.value && helpers.withMessage(passwordRequiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
    },
  };
});

const v$ = useVuelidate(rules, signInData);

const handleSubmit = () => {
  if (v$.value.$invalid) {
    if (v$.value.$errors[0]?.$message) {
      alert(v$.value.$errors[0]?.$message);
    }
    return;
  }

  if (!isEmailSubmitted.value) {
    return isEmailSubmitted.value = true;
  }

  signIn(signInData);
};

const handleCreateAccount = () => {
  navigateTo({
    query: {
      auth: 'signup',
    },
  });
};
const handleForgotPassword = () => {
  navigateTo({
    query: {
      auth: 'forgotpassword',
    },
  });
};
</script>