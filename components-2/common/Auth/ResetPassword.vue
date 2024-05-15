<template>
  <div class="absolute right-0 md:py-[0.438rem] md:px-[0.375rem] w-full md:w-[42.5rem] h-full">
    <div class="content rounded-[0.125rem] w-full h-full overflow-y-auto bg-white scroll">
      <div class="p-[1.25rem] py-[0.938rem] md:py-[2.5rem] md:p-[2.5rem] w-full flex flex-col items-start">
        <NuxtLink :to="{ path: route.fullPath, query: { ...route.query, auth: 'forgotPassword' } }"
          aria-label="Go back to forgot password" class="md:hidden flex items-center justify-center mb-[2rem]">
          <Icon name="arrow-left-line" class="w-[1.25rem] h-[1.25rem] stroke-black" />
        </NuxtLink>

        <h2 class="text-[1.5rem] font-light text-black mb-[2rem] md:mb-[2.938rem]">
          Create and confirm<br>
          new password.
        </h2>

        <div class="w-full flex flex-col items-start mb-[2rem] md:mb-[2.938rem]">
          <span class="text-gray-300 font-light text-lg mb-[0.375rem]">
            Remembered password?
          </span>

          <NuxtLink :to="{ path: route.fullPath, query: { ...route.query, auth: 'signIn' } }"
            class="text-lg text-black font-medium underline  hover:text-black-light-hover transition-colors duration-[160] ease-in-out">
            Sign In
          </NuxtLink>
        </div>

        <form class="w-full flex items-start flex-col" @submit.prevent="handleSubmit">
          <div class="mb-[3.5rem] md:mb-[2.75rem] flex w-full flex-col gap-y-[1.875rem]">
            <BaseInput id="token" name="token" type="text" placeholder="Token" left="left-[-0.425rem]"
              left-focus="group-focus-within/input:left-[-0.425rem]"
              :error="v$.$dirty ? v$.token.$errors[0]?.$message : null" v-model="resetPasswordData.token"
              @focus="v$.token.$touch()" />

            <BaseInput id="password" name="password" type="password" placeholder="New password" left="left-[-0.425rem]"
              left-focus="group-focus-within/input:left-[-0.425rem]"
              :error="v$.$dirty ? v$.password.$errors[0]?.$message : null" v-model="resetPasswordData.password"
              @focus="v$.password.$touch()" />

            <!-- <BaseInput name="confirm-password" type="password" placeholder="Confirm password" left="left-[-0.57rem]"
              left-focus="group-focus-within/input:left-[-0.57rem]"
              :error="v$.$dirty ? v$.confirmPassword.$errors[0]?.$message : null"
              v-model="resetPasswordData.confirmPassword" @focus="v$.confirmPassword.$touch()" /> -->
          </div>

          <button type="submit"
            class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out">
            Continue
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required, email } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  emailMessage,
  minLengthMessage,
  minValidationLength,
  passwordMessage,
  passwordRegexp,
  requiredMessage,
} from '~/constants';

const route = useRoute();

const userStore = useUserStore();

const resetPasswordData = reactive({
  token: '',
  password: '',
  email: <string>route.query.email,
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
    token: {
      required: helpers.withMessage(requiredMessage, required),
    },
    password: {
      required: helpers.withMessage(requiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
      password: helpers.withMessage(passwordMessage, (value: string) => value.length === 0 ? true : passwordRegexp.test(value)),
    },
  };
});

const v$ = useVuelidate(rules, resetPasswordData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  userStore.resetPassword({
    email: resetPasswordData.email,
    password: resetPasswordData.password,
    token: resetPasswordData.token,
  });

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
      email: undefined,
    },
  });
}
</script>
