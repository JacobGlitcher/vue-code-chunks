<template>
  <div class="w-full flex items-start flex-col">
    <h2 class="w-full text-center text-lg leading-[1.25rem] font-medium mb-[1.5rem] full-hd:text-[1rem] full-hd:leading-[1.5rem]">
      SIGN IN
    </h2>

    <p class="mb-[0.5rem] w-full text-center text-black-lighter text-lg leading-[1.25rem] font-light full-hd:text-[1rem] full-hd:leading-[1.5rem]">
      Sign in to access your account
    </p>

    <form class="w-full" @submit.prevent="handleSubmit">
      <div class="mb-[2.75rem] flex w-full flex-col gap-y-[1.875rem]">
        <BaseInput
          id="email"
          name="email"
          type="email"
          placeholder="Your email*"
          left="left-[-0.35rem]"
          left-focus="group-focus-within/input:left-[-0.35rem]"
          :error="v$.$dirty ? v$.email.$errors[0]?.$message : null"
          v-model="signInData.email"
          @blur="v$.email.$touch()"
        />

        <BaseInput
          id="password"
          name="password"
          type="password"
          placeholder="Password*"
          left="left-[-0.35rem]"
          left-focus="group-focus-within/input:left-[-0.35rem]"
          :error="v$.$dirty ? v$.password.$errors[0]?.$message : null"
          v-model="signInData.password"
          @blur="v$.password.$touch()"
        />
      </div>

      <button
        type="submit"
        class="mb-[1.5rem] w-full bg-black text-white text-sm font-medium h-[2.75rem] full-hd:h-[3rem] hover:bg-gray-800 transition-colors ease-in-out duration-[160]"
      >
        SIGN IN
      </button>

      <button
        type="button"
        class="underline text-lg text-black font-normal hover:text-gray-800 transition-colors ease-in-out duration-[160] full-hd:text-xl full-hd:leading-[1.5rem]"
        @click="handleForgot"
      >
        Forgotten your password?
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';

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

const emit = defineEmits(['close', 'forgotPassword']);

const route = useRoute();

const userStore = useUserStore();

const signInData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
    password: {
      required: helpers.withMessage(requiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
      password: helpers.withMessage(passwordMessage, (value: string) => value.length === 0 ? true : passwordRegexp.test(value)),
    },
  };
});

const v$ = useVuelidate(rules, signInData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  // TODO: await for request
  userStore.signIn(signInData);

  handleClose();
}

function handleForgot() {
  emit('forgotPassword');
}

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
    },
  });
}
</script>
