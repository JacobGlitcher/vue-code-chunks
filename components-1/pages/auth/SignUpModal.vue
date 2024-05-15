<template>
  <form class="pt-13 pb-[2.1875rem] -sm:pt-0 -sm:px-[0.875rem] flex flex-col items-start justify-start" @submit.prevent="handleSubmit">
    <h3 class="text-[#D5D5D5] text-lg font-medium mb-3">Sign up</h3>
    <span class="text-[#787878] font-medium mb-16">
      Enter email address to sign up
    </span>
    <input
      v-if="!signUpState.isEmailSubmitted"
      class="w-full bg-transparent outline-none text-lg mb-[5.0625rem]"
      placeholder="_@_"
      type="email"
      v-model="signUpData.email"
      @blur="v$.email.$touch"
    >
    <input
      v-else-if="!signUpState.isPasswordSubmitted"
      class="w-full bg-transparent outline-none text-lg mb-[5.0625rem]"
      placeholder="Enter password"
      type="password"
      v-model="signUpData.password"
      @blur="v$.password.$touch"
    >
    <div v-else-if="isVerifyTokenRequested" class="flex w-full">
      <input
        class="mb-[5.0625rem] w-full bg-transparent border-b-2 border-b-dark-900 outline-none mx-auto text-center text-3xl focus:border-b-brand transition-colors"
        v-model="verificationCode"
        maxlength="4"
        @blur="v2$.verificationCode.$touch"
      />
    </div>
    <BaseButton class="p-[0.625rem] w-full font-medium mb-8" variant="primary" type="submit">
      Sign Up
    </BaseButton>
    <span class="hover:cursor-pointer font-medium" @click="handleLogin">
      Sign In
    </span>
  </form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, numeric, maxLength } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  emailRequiredMessage,
  passwordRequiredMessage,
  minValidationLength,
  minLengthMessage,
  verificationCodeRequiredMessage,
  numvericVerificationCodeMessage,
} from '~/constants';

// Types
import { IUserSignUpData } from '~/types';


const userStore = useUserStore();
const { isVerifyTokenRequested } = storeToRefs(userStore);
const { register, verify } = userStore;

const signUpData = reactive<IUserSignUpData>({
  email: '',
  password: '',
});
const signUpState = reactive({
  isEmailSubmitted: false,
  isPasswordSubmitted: false,
});
const verificationCode = ref('');

const signUpRules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(emailRequiredMessage, required),
      email: true,
    },
    password: {
      required: signUpState.isEmailSubmitted && helpers.withMessage(passwordRequiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
    },
  };
});

const verificationCodeRules = computed(() => {
  return {
    verificationCode: {
      required: signUpState.isPasswordSubmitted && helpers.withMessage(verificationCodeRequiredMessage, required),
      numeric: helpers.withMessage(numvericVerificationCodeMessage, numeric),
      minLength: helpers.withMessage(minLengthMessage.short, minLength(minValidationLength.short)),
      maxLength: helpers.withMessage(minLengthMessage.short, maxLength(minValidationLength.short)),
      
    },
  };
});

const v$ = useVuelidate(signUpRules, signUpData);
const v2$ = useVuelidate(verificationCodeRules, { verificationCode });

const handleSubmit = async () => {
  if (v$.value.$invalid) {
    if (v$.value.$errors[0]?.$message) {
      alert(v$.value.$errors[0]?.$message);
    }
    
    return;
  }

  if (!signUpState.isEmailSubmitted) {
    return signUpState.isEmailSubmitted = true;
  }

  if (!signUpState.isPasswordSubmitted) {
    await register(signUpData);
    return signUpState.isPasswordSubmitted = true;
  }
  
  if (v2$.value.$invalid) {
    if (v2$.value.$errors[0]?.$message) {
      alert(v2$.value.$errors[0]?.$message);
    }
    return;
  }
  
  verify();
};

const handleLogin = () => {
  navigateTo({
    query: {
      auth: 'signin',
    },
  });
};
</script>