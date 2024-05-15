<template>
  <div class="absolute right-0 md:py-[0.438rem] md:px-[0.375rem] w-full md:w-[42.5rem] h-full">
    <div class="content rounded-[0.125rem] w-full h-full overflow-y-auto bg-white scroll">
      <div class="p-[1.25rem] py-[0.938rem] md:py-[2.5rem] md:p-[2.5rem] w-full flex flex-col items-start">
        <NuxtLink :to="{ path: route.fullPath, query: { ...route.query, auth: 'signIn' } }" aria-label="Go back to login"
          class="md:hidden flex items-center justify-center mb-[2rem]">
          <Icon name="arrow-left-line" class="w-[1.25rem] h-[1.25rem] stroke-black" />
        </NuxtLink>

        <h2 class="text-[1.5rem] font-light text-black mb-[2rem] md:mb-[2.938rem]">
          Verify your email<br>
          and enter a new password.
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
          <div class="mb-[3.5rem] md:mb-[2.75rem] flex w-full flex-col">
            <BaseInput id="email" name="email" type="email" placeholder="Email" class="w-full"
              v-model="forgotPasswordData.email" :error="v$.$dirty ? v$.email.$errors[0]?.$message : null"
              @blur="v$.email.$touch()" />
          </div>

          <button type="submit"
            class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out">
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  requiredMessage,
  emailMessage,
} from '~/constants';

const route = useRoute();

const userStore = useUserStore();

const forgotPasswordData = reactive({
  email: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
  };
});

const v$ = useVuelidate(rules, forgotPasswordData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  userStore.forgotPassword(forgotPasswordData);

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: 'resetPassword',
      email: forgotPasswordData.email,
    },
  });
}
</script>
